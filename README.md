# STEAM Lesson Plan Generator
### Curriculum-Aligned Pedagogical Architecture for Grade 8 Science & Technology (Nepal CDC) with Cambridge Lower Secondary Template Adherence

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg?logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38b2ac.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-Flash-8E75B2.svg?logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Abstract

In developing educational ecosystems across South Asia, teachers frequently navigate dual systemic pressures: adopting modern, inquiry-based STEAM (Science, Technology, Engineering, Arts, and Mathematics) pedagogies while operating under strict national curriculum constraints, high pupil-to-teacher ratios, and minimal laboratory infrastructure. 

The **STEAM Lesson Plan Generator** is a full-stack educational engineering platform designed to bridge this gap for **Grade 8 Science & Technology** within the National Curriculum Development Centre (CDC) of Nepal. The system synthesizes official national Learning Outcomes (LO 1.1 through LO 24.3) and textbook grounding with the international **Cambridge Lower Secondary Lesson Plan Framework**. Driven by server-side Gemini generative AI with strict JSON schema guarantees, the application generates concrete, actionable, zero-to-low-cost classroom lesson plans complete with 3-phase timed instructional procedures, embedded formative diagnostic checkpoints, self-evaluative post-lesson reflection rubrics, and multi-format export capabilities (Markdown, JSON, Microsoft Word `.doc`, and print-ready PDF).

---

## Table of Contents

1. [Problem Statement & Background](#1-problem-statement--background)
2. [Pedagogical Framework](#2-pedagogical-framework)
   - [Cambridge Lower Secondary Structure](#cambridge-lower-secondary-structure)
   - [Nepal CDC Curriculum & Textbook Grounding](#nepal-cdc-curriculum--textbook-grounding)
   - [Zero-Budget STEAM & Local Material Substitutions](#zero-budget-steam--local-material-substitutions)
3. [System Architecture & Engineering](#3-system-architecture--engineering)
   - [Tech Stack](#tech-stack)
   - [Data Flow & Pipeline](#data-flow--pipeline)
   - [Gemini Structured Output Schema](#gemini-structured-output-schema)
4. [Curriculum Matrix (Grade 8 Units 1–11)](#4-curriculum-matrix-grade-8-units-111)
5. [Core Features & UI/UX Design](#5-core-features--uiux-design)
   - [Low-Cognitive-Load Interface](#low-cognitive-load-interface)
   - [In-Place Editable Document Canvas](#in-place-editable-document-canvas)
   - [Zero-Friction Multi-Format Export](#zero-friction-multi-format-export)
   - [Context-Aware AI Curriculum Copilot](#context-aware-ai-curriculum-copilot)
6. [Installation & Setup](#6-installation--setup)
7. [API Reference](#7-api-reference)
8. [Classroom Feasibility & Ethical Safeguards](#8-classroom-feasibility--ethical-safeguards)
9. [Citation & License](#9-citation--license)

---

## 1. Problem Statement & Background

Secondary school science educators in resource-constrained classrooms face three fundamental friction points:

1. **Cognitive Load & Administrative Burden**: Crafting rigorous lesson plans that conform to international pedagogical standards (such as Cambridge International Assessment) takes 45–90 minutes per class period, leading to administrative burnout or reliance on generic rote lecture notes.
2. **Abstract vs. Feasible Activities**: Generic educational AI prompts frequently suggest specialized laboratory equipment (Bunsen burners, digital light gates, micropipettes, proprietary sensor kits) that are absent in community schools.
3. **Curriculum Misalignment**: Standard conversational LLMs hallucinate topics outside the national syllabus or omit mandatory state curriculum learning outcomes and grading rubrics.

The **STEAM Lesson Plan Generator** solves this by establishing a deterministic curriculum database of the complete **Nepal CDC Grade 8 Science & Technology** syllabus, pairing it with few-shot schema-enforced prompt engineering to produce structured, reproducible, and contextually grounded teaching plans.

---

## 2. Pedagogical Framework

```
  ┌─────────────────────────────────────────────────────────────┐
  │                 National Curriculum (CDC Nepal)             │
  │     11 Units • 40+ Official LOs • Approved Textbook Pages   │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │            Cambridge Lower Secondary Lesson Plan            │
  │  Objectives ➔ Diagnostics ➔ 3-Phase Plan ➔ Reflections      │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │              Integrated Low-Cost STEAM Layer                │
  │  Science • Tech • Engineering • Arts • Math Local Materials  │
  └─────────────────────────────────────────────────────────────┘
```

### Cambridge Lower Secondary Structure

Every generated plan strictly abides by the official Cambridge Lower Secondary Lesson Plan schema:

| Section | Required Field | Description / Pedagogical Intent |
| :--- | :--- | :--- |
| **Header** | Class, Date, Duration | Contextual baseline (e.g., Grade 8 Section A, 45 minutes). |
| **Objectives** | Learning Objectives | Direct linkage to official curriculum codes (e.g., `[LO 4.1]`). |
| **Focus** | Lesson Focus | Realistic, measurable scope achievable in the allotted time. |
| **Previous Learning** | Prior Knowledge & Diagnostic Check | Concrete entry check (e.g., cold-call prompt, think-pair-share). |
| **Plan Phase 1** | Beginning (5–10 min) | Hook, context setting, objective sharing, and expectation setting. |
| **Plan Phase 2** | Main Activities (25–30 min) | Conceptual development, hands-on tasks, and formative assessment. |
| **Plan Phase 3** | End / Summary (5–10 min) | Consolidation, self-evaluation, exit tickets, and next-day preview. |
| **Self-Reflection** | 5 Core Cambridge Reflection Prompts | Post-lesson evaluation of timing, atmosphere, changes, and learning. |
| **Summary Rubric**| Went Well (2) & Improve (2) | Two balanced empirical wins and two actionable refinements. |
| **Next Steps** | Inform Next Lesson | Diagnostic-driven progression based on student misunderstandings. |

### Nepal CDC Curriculum & Textbook Grounding

The engine maps directly to the official textbook published by the Government of Nepal, Ministry of Education, Science and Technology, Curriculum Development Centre (Sanothimi, Bhaktapur):
- Units 1 to 11 across all four scientific domains: **Physics**, **Chemistry**, **Biology**, and **Earth & Space Science**, alongside **Information & Communication Technology (ICT)**.
- Specific textbook page references and designated classroom activities.
- Glossary definitions and indigenous Nepali terminology contextualization.

### Zero-Budget STEAM & Local Material Substitutions

To overcome laboratory supply shortages, every activity prioritizes locally obtainable alternatives:

| Standard Laboratory Apparatus | Low-Cost / Zero-Budget Community Alternative |
| :--- | :--- |
| Glass Beakers & Stirring Rods | Upcycled transparent PET water bottles (cut tops) & clean bamboo sticks |
| Chemical Reagents (Acid/Base) | Lemon juice / vinegar (acidic) & wood ash solution / baking soda (basic) |
| Gas Generation Test Tubes | Glass cough syrup bottles, plastic syringes, party balloons |
| Optical Lenses & Prisms | Clear water filled in round bulbs, transparent glass tumblers |
| Force & Friction Meters | Rubber bands with calibrated paper scales, ruler balances |
| Plant / Animal Cell Models | Clay, wheat dough (*aata*), onion skin membranes with iodine tincture |

---

## 3. System Architecture & Engineering

### Tech Stack

- **Runtime & Language**: Node.js (ES Modules), TypeScript 5.8
- **Frontend Framework**: React 19, Tailwind CSS 4.1, Lucide React
- **Animations & Interaction**: Motion (`motion/react`)
- **Backend Service**: Express 4.21, `tsx` runtime execution
- **Compiler / Bundler**: Vite 6.2, `esbuild` for production CommonJS bundling
- **AI Core**: `@google/genai` (Gemini 2.5 / 3.8 Flash) with structured JSON Schema decoding

### Data Flow & Pipeline

```
 [Teacher Input] ──> [InputSidebar / ChapterDrawer]
                            │
                            ▼
               POST /api/generate-lesson-plan
                            │
                            ▼
     [Express Server: server.ts + curriculumData.ts]
      - Retrieves official Unit LOs & textbook activities
      - Injects Cambridge system prompt & constraints
      - Formulates JSON Schema constraints (Type.OBJECT)
                            │
                            ▼
          [Google Gemini Flash Foundation Model]
                            │
                            ▼
     [Strict JSON Validation & Tuple Normalization]
      - Ensures wentWell.length >= 2, improveNextTime.length >= 2
      - Injects unique plan ID & metadata
                            │
                            ▼
   [Interactive Canvas: CambridgeTemplateView.tsx]
      - In-place editing (ContentEditable & state binding)
      - Dynamic STEAM integration viewer
      - Export engine (Markdown / JSON / Word .doc / PDF)
```

### Gemini Structured Output Schema

The backend uses `@google/genai` with `responseMimeType: "application/json"` and an explicit `responseSchema` definition. This ensures that the model cannot output markdown fences, conversational filler, or missing fields:

```typescript
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: prompt,
  config: {
    systemInstruction: CAMBRIDGE_LESSON_PLAN_PROMPT_TEMPLATE,
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
        learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
        lessonFocus: { type: Type.STRING },
        previousLearning: {
          type: Type.OBJECT,
          properties: {
            priorKnowledge: { type: Type.STRING },
            diagnosticCheck: { type: Type.STRING },
          },
          required: ['priorKnowledge', 'diagnosticCheck'],
        },
        plan: {
          type: Type.OBJECT,
          properties: {
            beginning: { ... },
            mainActivities: { ... },
            end: { ... },
          },
          required: ['beginning', 'mainActivities', 'end'],
        },
        reflection: { ... },
        summaryEvaluation: { ... },
        nextSteps: { type: Type.STRING },
        steamConnections: { ... },
        textbookReference: { ... },
      },
      required: [
        'classGrade', 'date', 'unitNumber', 'unitTitle', 'topic',
        'durationMinutes', 'learningObjectives', 'lessonFocus',
        'previousLearning', 'plan', 'reflection', 'summaryEvaluation', 'nextSteps'
      ],
    },
  },
});
```

---

## 4. Curriculum Matrix (Grade 8 Units 1–11)

The platform embeds complete coverage of all 11 units in the official Nepal CDC curriculum:

| Unit # | Unit Title | Page Range | Theme | Key Official Learning Outcomes Covered |
| :---: | :--- | :---: | :--- | :--- |
| **1** | Scientific Learning & ICT | 1–32 | Scientific Learning & ICT | `LO 1.1–1.2` (Inquiry, Lab Safety), `LO 2.1–2.4` (ICT tools, Cybersecurity), `LO 3.1–3.2` (Robotics, AI, Cloud) |
| **2** | Information & Communication Tech | 33–58 | Information Technology | `LO 2.1–2.4` (Search Engines, Social Media ethics, Cybersecurity laws) |
| **3** | Cell & Microorganisms | 59–92 | Living Organisms | `LO 4.1–4.3` (Plant/Animal Cell organelles, tissues), `LO 5.1–5.3` (Bacteria, Fungi, Food Spoilage) |
| **4** | Biodiversity & Environment | 93–128 | Ecology & Conservation | `LO 6.1` (2 & 5 Kingdom classification), `LO 7.1–7.4` (Medicinal plants), `LO 7.5–7.6` (SDGs & Nepal efforts) |
| **5** | Life Processes | 129–162 | Physiology & Reproduction | `LO 8.1–8.3` (Vegetative propagation, grafting), `LO 9.1–9.3` (Seed structure, monocot/dicot germination) |
| **6** | Force and Motion | 163–204 | Mechanics & Physics | `LO 10.1–10.2` (Velocity, Acceleration), `LO 11.1–11.3` (Levers, MA, VR), `LO 12.1–12.7` (Fluid & Atmospheric pressure) |
| **7** | Energy in Daily Life | 205–244 | Thermodynamics & Optics | `LO 13.1–13.6` (Conduction, Convection, Radiation), `LO 14.1–14.4` (Reflection, Refraction, Critical Angle) |
| **8** | Electricity and Magnetism | 245–282 | Electromagnetism | `LO 15.1–15.4` (Current, Voltage, Ohm's Law, Resistors), `LO 16.1–16.3` (Magnetic lines, Electromagnets) |
| **9** | Matter | 283–322 | Physical & Chemical Matter | `LO 17.1–17.3` (Atomic structure, Valency), `LO 18.1–18.4` (Periodic Table), `LO 19.1–19.4` (Mixtures & Separation) |
| **10** | Materials Used in Daily Life | 323–356 | Applied Chemistry | `LO 20.1–20.4` (Acids, Bases, Salts, pH indicators), `LO 21.1–21.3` (Metals, Alloys, Plastics, Ceramics) |
| **11** | Earth and Space | 357–398 | Geology & Astronomy | `LO 22.1–22.3` (Minerals of Nepal), `LO 23.1–23.3` (Earth Origin, Geological Time), `LO 24.1–24.3` (Solar System, Big Bang) |

---

## 5. Core Features & UI/UX Design

### Low-Cognitive-Load Interface
- **Warm Neutral Aesthetic**: Built with a calm `#fafaf9` stone background, soft slate borders, and muted emerald accents, eliminating visual fatigue during long preparation periods.
- **Progressive Disclosure**: Primary configuration requires only 3 rapid choices (Chapter, Topic, and Duration) before triggering one-click generation. Advanced configurations (Class section, Date, Low-resource toggle, and Special instructions) are cleanly tucked into collapsible disclosures.

### In-Place Editable Document Canvas
- The rendered lesson plan is a direct simulation of the official Cambridge A4 sheet.
- Teachers can click directly into any objective, timed activity, note, or reflection field to edit phrasing before exporting.

### Zero-Friction Multi-Format Export
Direct one-click actions situated in the persistent header:
- **Copy Markdown**: Clean, formatted text ready for email, Google Docs, or Notion.
- **Download JSON**: Fully structured schema payload for institutional archives or developer tooling.
- **Word (.doc)**: Formatted HTML with Cambridge table styles for offline Microsoft Word editing.
- **Print / PDF**: Optimized CSS print stylesheet with `@media print` rules, suppressing sidebar, buttons, and navigation for a crisp physical handout.

### Context-Aware AI Curriculum Copilot
- Slide-over conversational assistant anchored to the currently displayed lesson plan.
- Capabilities:
  - *"Suggest a 5-minute warm-up hook using only chalk and water."*
  - *"Differentiate the main activity for struggling readers."*
  - *"Shorten the duration to 35 minutes for Friday's compressed schedule."*

---

## 6. Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: `npm` or `pnpm`
- **Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/)

### Clone & Install

```bash
git clone https://github.com/rajat-ed/planest.git
cd steam-lesson-plan-generator

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

*(Refer to `.env.example` for variable declarations).*

### Running Locally

```bash
# Start development server (Express + Vite on Port 3000)
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Production Build

```bash
# Compile frontend static assets and bundle backend server
npm run build

# Start production server
npm start
```

---

## 7. API Reference

### 1. `POST /api/generate-lesson-plan`
Generates a complete, structured Cambridge Lower Secondary Lesson Plan.

**Request Body (`application/json`):**
```json
{
  "unitNumber": 6,
  "topic": "6.1.1 Levers: Classes, Mechanical Advantage & Velocity Ratio",
  "classGrade": "Grade 8 (Section B)",
  "date": "2026-09-17",
  "durationMinutes": 45,
  "lowResourceFocus": true,
  "specificFocus": "Include hands-on ruler lever experiment"
}
```

**Response (`200 OK`):**
```json
{
  "lessonPlan": {
    "id": "plan-1726543000000",
    "classGrade": "Grade 8 (Section B)",
    "date": "2026-09-17",
    "unitNumber": 6,
    "unitTitle": "Force and Motion",
    "topic": "6.1.1 Levers...",
    "durationMinutes": 45,
    "learningObjectives": [
      "[LO 11.1] To introduce and describe types of levers",
      "[LO 11.2] To state the principle of operation of a lever and prove practically"
    ],
    "lessonFocus": "Investigating how changing fulcrum position alters effort needed using a ruler and pencil.",
    "previousLearning": {
      "priorKnowledge": "Students understand force as a push or pull and can identify simple tools used in daily life.",
      "diagnosticCheck": "Ask students how a see-saw works or how a crowbar lifts heavy rocks."
    },
    "plan": {
      "beginning": { "timing": "7 minutes", "plannedActivities": [...], "notes": "..." },
      "mainActivities": { "timing": "28 minutes", "plannedActivities": [...], "formativeAssessment": "...", "notes": "..." },
      "end": { "timing": "10 minutes", "plannedActivities": [...], "notes": "..." }
    },
    "reflection": { ... },
    "summaryEvaluation": {
      "wentWell": ["High student engagement during ruler balancing", "Clear articulation of load and effort"],
      "improveNextTime": ["Pre-mark centimetre ruler increments", "Provide tighter time limit for group recording"],
      "informNextLesson": "Three pairs struggled with calculating VR; will begin next class with quick math scaffold."
    },
    "nextSteps": "Introduce second-class levers (wheelbarrow and nutcracker) with mechanical advantage formula.",
    "steamConnections": {
      "science": "Principle of moments and equilibrium",
      "technology": "Mechanical lever design across simple tools",
      "engineering": "Optimizing pivot placement for load lifting",
      "arts": "Sketching force diagrams and labeled schematics",
      "math": "Ratio calculations (Load/Effort and Distance/Distance)"
    }
  }
}
```

### 2. `POST /api/chat`
Contextual AI Copilot for lesson plan adjustments.

**Request Body (`application/json`):**
```json
{
  "messages": [
    { "role": "user", "content": "How can I adapt this lever experiment if I don't have enough rulers?" }
  ],
  "currentLessonPlan": { ... }
}
```

**Response (`200 OK`):**
```json
{
  "text": "You can replace wooden rulers with stiff tree twigs or discarded cardboard strips cut to uniform lengths..."
}
```

### 3. `GET /api/curriculum`
Returns the full offline curriculum syllabus, units, and learning outcomes.

---

## 8. Classroom Feasibility & Ethical Safeguards

1. **Safety First**: Every generated experiment includes specific safety precautions (e.g., handling hot liquids, checking glass edges, avoiding corrosive contact).
2. **Laboratory Independence**: Prompts are strictly instructed to avoid requiring expensive commercial kits, ensuring no student is excluded due to school funding disparities.
3. **No Hallucinated Curriculum**: Model generation is strictly constrained by curriculum prompts derived from the official Curriculum Development Centre (CDC) of Nepal.

---

