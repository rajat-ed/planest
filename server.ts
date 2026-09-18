import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { GRADE_8_CURRICULUM_UNITS, OFFICIAL_GRADE_8_LOS, CAMBRIDGE_LESSON_PLAN_PROMPT_TEMPLATE } from './src/data/curriculumData.ts';
import { CambridgeLessonPlan } from './src/types.ts';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));

// Lazy GoogleGenAI initialization
function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Resilient model cascade:
// Primary: 'gemini-flash-latest' (Highest capacity, prevents 503 high-demand errors)
// Secondary: 'gemini-3.1-flash-lite' (Ultra-fast, high-availability fallback)
// Tertiary: 'gemini-3.8-flash'
const ACTIVE_MODELS = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];

async function generateContentWithFallback(ai: GoogleGenAI, params: { contents: any; config?: any }) {
  let lastError: any = null;
  for (const model of ACTIVE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model,
      });
      return response;
    } catch (err: any) {
      console.warn(`[Gemini Fallback] Model '${model}' encountered error: ${err?.message || err}. Attempting next available model...`);
      lastError = err;
    }
  }
  throw lastError;
}

// Curriculum metadata endpoint
app.get('/api/curriculum', (_req: Request, res: Response) => {
  res.json({
    units: GRADE_8_CURRICULUM_UNITS,
    learningOutcomes: OFFICIAL_GRADE_8_LOS,
  });
});

// Generator endpoint for structured Cambridge Lesson Plans
app.post('/api/generate-lesson-plan', async (req: Request, res: Response) => {
  try {
    const {
      unitNumber,
      topic,
      classGrade = 'Grade 8',
      date = new Date().toISOString().split('T')[0],
      durationMinutes = 45,
      specificFocus = '',
      lowResourceFocus = true,
      customTemplate = '',
    } = req.body;

    const unit = GRADE_8_CURRICULUM_UNITS.find(u => u.unitNumber === Number(unitNumber)) || GRADE_8_CURRICULUM_UNITS[2]; // Default unit 3 if unspecified
    const unitOutcomes = unit.learningOutcomes;
    const activitiesSummary = unit.textbookActivities
      .map(
        a =>
          `* ${a.id} (${a.title}, Page ${a.pageNumber}): Objective: ${a.objective}. Materials: ${a.materialsRequired.join(', ')}. Local low-cost alternatives: ${a.localLowCostAlternatives.join(', ')}. Method: ${a.methodSummary}. Precautions: ${a.safetyPrecautions || 'Standard lab care.'}`
      )
      .join('\n');

    const cleanGradeStr = (classGrade || 'Grade 8').replace(/\s*\(.*?\)/g, '').replace(/[-–—]\s*[A-Za-z0-9]+/g, '').trim() || 'Grade 8';

    const prompt = `
Generate a complete, practical, hands-on STEAM Lesson Plan strictly adhering to the Cambridge Lower Secondary template for Grade 8 Science and Technology.

Textbook Unit: Unit ${unit.unitNumber}: ${unit.title} (${unit.pageRange})
Unit Theme: ${unit.theme}
Specified Topic: ${topic || unit.topics[0]}
Additional Teacher Focus / Constraints: ${specificFocus || 'None specified'}
Low Resource Priority: ${lowResourceFocus ? 'HIGH: Emphasize low-cost, zero-cost, locally available household/natural materials over expensive apparatus' : 'Standard classroom resources'}
Duration: ${durationMinutes} minutes
Target Grade: ${cleanGradeStr}

Official Learning Outcomes for this Unit (Select the most relevant 1-3 outcomes for this specific lesson):
${unitOutcomes.map(lo => `* [LO ${lo.id}]: ${lo.text}`).join('\n')}

Official Textbook Activities & Local Context:
${activitiesSummary}

Key Textbook Glossary Terms:
${unit.keyGlossary.map(g => `* ${g.term}: ${g.definition}`).join('\n')}

Instructions:
1. Strict Template Adherence: Output according to the exact Cambridge Lower Secondary Lesson Plan fields.
2. Low-Resource & Hands-On Focus: Prioritize low-cost, locally available materials (e.g. mud, clay, seeds, onion peel, toothpicks, plastic bottles, wood ash, rulers, string, thread) and practical engagement.
3. Language & Tone: Direct, clear, concrete teacher actions and student tasks. No empty jargon.
4. Directly link learning objectives to the official LO codes (e.g. "[LO 4.1] To describe the functions...").
`;

    const ai = getGenAI();

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction: CAMBRIDGE_LESSON_PLAN_PROMPT_TEMPLATE + (customTemplate ? `\nUser Custom Template Preferences: ${customTemplate}` : ''),
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classGrade: { type: Type.STRING },
            date: { type: Type.STRING },
            unitNumber: { type: Type.INTEGER },
            unitTitle: { type: Type.STRING },
            topic: { type: Type.STRING },
            durationMinutes: { type: Type.INTEGER },
            learningObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Official curriculum learning outcomes with codes like [LO X.X]',
            },
            lessonFocus: {
              type: Type.STRING,
              description: 'Specific, realistic and achievable amount of learning for the lesson',
            },
            previousLearning: {
              type: Type.OBJECT,
              properties: {
                priorKnowledge: { type: Type.STRING, description: 'What learners have already covered or need to know' },
                diagnosticCheck: { type: Type.STRING, description: 'How will you check their previous learning?' },
              },
              required: ['priorKnowledge', 'diagnosticCheck'],
            },
            plan: {
              type: Type.OBJECT,
              properties: {
                beginning: {
                  type: Type.OBJECT,
                  properties: {
                    timing: { type: Type.STRING, description: 'e.g. 5–10 minutes' },
                    plannedActivities: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'grab attention, establish context, share objectives, set expectations',
                    },
                    notes: { type: Type.STRING, description: 'Books, physical resources, web links etc.' },
                  },
                  required: ['timing', 'plannedActivities', 'notes'],
                },
                mainActivities: {
                  type: Type.OBJECT,
                  properties: {
                    timing: { type: Type.STRING, description: 'e.g. 25–30 minutes' },
                    plannedActivities: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'develop skills and knowledge, practise techniques, apply existing knowledge, explore concepts, hands-on task',
                    },
                    formativeAssessment: { type: Type.STRING, description: 'Formative assessment guidance and observation points' },
                    notes: { type: Type.STRING, description: 'Local materials, textbook activity references' },
                  },
                  required: ['timing', 'plannedActivities', 'formativeAssessment', 'notes'],
                },
                end: {
                  type: Type.OBJECT,
                  properties: {
                    timing: { type: Type.STRING, description: 'e.g. 5–10 minutes' },
                    plannedActivities: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'reflect on learning, set targets for next lesson, evaluate work',
                    },
                    notes: { type: Type.STRING },
                  },
                  required: ['timing', 'plannedActivities', 'notes'],
                },
              },
              required: ['beginning', 'mainActivities', 'end'],
            },
            reflection: {
              type: Type.OBJECT,
              properties: {
                learningOutcomesRealistic: { type: Type.STRING, description: 'Were the learning objectives/lesson focus realistic? What did learners learn today?' },
                whatLearnersLearned: { type: Type.STRING },
                learningAtmosphere: { type: Type.STRING, description: 'What was the learning atmosphere like?' },
                timingAdherence: { type: Type.STRING, description: 'Did I stick to timings?' },
                changesMadeAndWhy: { type: Type.STRING, description: 'What changes did I make from my plan and why?' },
              },
              required: ['learningOutcomesRealistic', 'whatLearnersLearned', 'learningAtmosphere', 'timingAdherence', 'changesMadeAndWhy'],
            },
            summaryEvaluation: {
              type: Type.OBJECT,
              properties: {
                wentWell: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Two things that really went well (consider both teaching and learning)',
                },
                improveNextTime: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Two things that would have improved the lesson (consider both teaching and learning)',
                },
                informNextLesson: {
                  type: Type.STRING,
                  description: 'What have I learned from this lesson about the class or individuals that will inform my next lesson?',
                },
              },
              required: ['wentWell', 'improveNextTime', 'informNextLesson'],
            },
            nextSteps: {
              type: Type.STRING,
              description: 'What will I teach next based on learners\' understanding of this lesson?',
            },
            steamConnections: {
              type: Type.OBJECT,
              properties: {
                science: { type: Type.STRING },
                technology: { type: Type.STRING },
                engineering: { type: Type.STRING },
                arts: { type: Type.STRING },
                math: { type: Type.STRING },
              },
            },
            textbookReference: {
              type: Type.OBJECT,
              properties: {
                pageRange: { type: Type.STRING },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                localLowCostMaterials: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          required: [
            'classGrade',
            'date',
            'unitNumber',
            'unitTitle',
            'topic',
            'durationMinutes',
            'learningObjectives',
            'lessonFocus',
            'previousLearning',
            'plan',
            'reflection',
            'summaryEvaluation',
            'nextSteps',
          ],
        },
      },
    });

    const parsedPlan: CambridgeLessonPlan = JSON.parse(response.text || '{}');
    parsedPlan.id = `plan-${Date.now()}`;
    parsedPlan.classGrade = (parsedPlan.classGrade || 'Grade 8').replace(/\s*\(.*?\)/g, '').replace(/[-–—]\s*[A-Za-z0-9]+/g, '').trim() || 'Grade 8';
    // ensure wentWell and improveNextTime are tuples of length 2
    if (!Array.isArray(parsedPlan.summaryEvaluation.wentWell) || parsedPlan.summaryEvaluation.wentWell.length < 2) {
      parsedPlan.summaryEvaluation.wentWell = [
        parsedPlan.summaryEvaluation.wentWell?.[0] || 'Active participation during hands-on practical inquiry',
        parsedPlan.summaryEvaluation.wentWell?.[1] || 'Effective student articulation of core textbook concepts',
      ];
    }
    if (!Array.isArray(parsedPlan.summaryEvaluation.improveNextTime) || parsedPlan.summaryEvaluation.improveNextTime.length < 2) {
      parsedPlan.summaryEvaluation.improveNextTime = [
        parsedPlan.summaryEvaluation.improveNextTime?.[0] || 'Provide pre-portioned material kits to save 3 minutes distribution time',
        parsedPlan.summaryEvaluation.improveNextTime?.[1] || 'Scaffold peer questioning for quieter student pairings',
      ];
    }

    res.json({ lessonPlan: parsedPlan });
  } catch (error: any) {
    console.error('Error generating lesson plan:', error);
    res.status(500).json({ error: error.message || 'Failed to generate lesson plan.' });
  }
});

// Interactive teacher chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, currentLessonPlan } = req.body;

    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      parts: [{ text: m.content }],
    }));

    let systemInstruction = CAMBRIDGE_LESSON_PLAN_PROMPT_TEMPLATE;
    if (currentLessonPlan) {
      systemInstruction += `\n\nCurrently Active Lesson Plan in Context:\n${JSON.stringify(currentLessonPlan, null, 2)}\n\nIf the teacher asks to adjust, modify, or extend this lesson plan, explain your adjustments clearly in actionable prose and, if a major redesign is requested, provide the revised lesson plan.`;
    }

    const ai = getGenAI();
    const response = await generateContentWithFallback(ai, {
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in teacher chat:', error);
    res.status(500).json({ error: error.message || 'Error processing chat request.' });
  }
});

// Vite / Static setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`STEAM Lesson Plan Generator server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
