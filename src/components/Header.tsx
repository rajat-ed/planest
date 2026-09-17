import React from 'react';
import { Printer, Download, Copy, Sparkles, BookOpen, Check } from 'lucide-react';
import { CambridgeLessonPlan } from '../types';

interface HeaderProps {
  lessonPlan: CambridgeLessonPlan | null;
  onNewPlanClick: () => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lessonPlan,
  onNewPlanClick,
  isGenerating,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    if (!lessonPlan) return;

    const md = `# CAMBRIDGE LOWER SECONDARY LESSON PLAN
**CLASS:** ${lessonPlan.classGrade}
**DATE:** ${lessonPlan.date}
**DURATION:** ${lessonPlan.durationMinutes} minutes
**UNIT:** ${lessonPlan.unitTitle}
**TOPIC:** ${lessonPlan.topic}

## Learning Objectives
${lessonPlan.learningObjectives.map((lo) => `* ${lo}`).join('\n')}

## Lesson Focus
${lessonPlan.lessonFocus}

## Previous Learning
* **Prior Knowledge:** ${lessonPlan.previousLearning.priorKnowledge}
* **Diagnostic Check:** ${lessonPlan.previousLearning.diagnosticCheck}

## Plan Table
| Timing | Planned Activities | Notes |
| :--- | :--- | :--- |
| **Beginning** (${lessonPlan.plan.beginning.timing}) | ${lessonPlan.plan.beginning.plannedActivities.join('; ')} | ${lessonPlan.plan.beginning.notes} |
| **Main Activities** (${lessonPlan.plan.mainActivities.timing}) | ${lessonPlan.plan.mainActivities.plannedActivities.join('; ')}\n\n*Formative Assessment:* ${lessonPlan.plan.mainActivities.formativeAssessment} | ${lessonPlan.plan.mainActivities.notes} |
| **End / Reflection / Summary** (${lessonPlan.plan.end.timing}) | ${lessonPlan.plan.end.plannedActivities.join('; ')} | ${lessonPlan.plan.end.notes} |

## Reflection
* **Were the learning objectives/lesson focus realistic? What did the learners learn today?**
  ${lessonPlan.reflection.learningOutcomesRealistic} - ${lessonPlan.reflection.whatLearnersLearned}
* **What was the learning atmosphere like?**
  ${lessonPlan.reflection.learningAtmosphere}
* **Did I stick to timings?**
  ${lessonPlan.reflection.timingAdherence}
* **What changes did I make from my plan and why?**
  ${lessonPlan.reflection.changesMadeAndWhy}

## Summary Evaluation
* **What two things really went well (consider both teaching and learning)?**
  1: ${lessonPlan.summaryEvaluation.wentWell[0]}
  2: ${lessonPlan.summaryEvaluation.wentWell[1]}
* **What two things would have improved the lesson (consider both teaching and learning)?**
  1: ${lessonPlan.summaryEvaluation.improveNextTime[0]}
  2: ${lessonPlan.summaryEvaluation.improveNextTime[1]}
* **What have I learned from this lesson about the class or individuals that will inform my next lesson?**
  ${lessonPlan.summaryEvaluation.informNextLesson}

## Next Steps
${lessonPlan.nextSteps}

---
*STEAM Integration: Science (${lessonPlan.steamConnections?.science || 'N/A'}), Tech (${lessonPlan.steamConnections?.technology || 'N/A'}), Eng (${lessonPlan.steamConnections?.engineering || 'N/A'}), Arts (${lessonPlan.steamConnections?.arts || 'N/A'}), Math (${lessonPlan.steamConnections?.math || 'N/A'})*
*Textbook Reference: ${lessonPlan.textbookReference?.pageRange || 'Grade 8 Science & Technology'}*
`;

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleExportWord = () => {
    if (!lessonPlan) return;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${lessonPlan.topic} - Lesson Plan</title>
      <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.4; color: #111; }
        h1 { color: #0f4c81; font-size: 18pt; margin-bottom: 4px; }
        .meta-box { border: 1px solid #999; padding: 10px; margin-bottom: 15px; background: #fdfdfd; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
        th, td { border: 1px solid #555; padding: 8px 10px; text-align: left; vertical-align: top; }
        th { background: #e8f0fe; font-weight: bold; }
        .section-title { font-size: 13pt; font-weight: bold; color: #1e3a8a; margin-top: 15px; }
      </style>
    </head>
    <body>
      <h1>CAMBRIDGE LOWER SECONDARY LESSON PLAN</h1>
      <p><em>Curriculum: Nepal CDC Grade 8 Science & Technology</em></p>
      
      <div class="meta-box">
        <p><strong>CLASS:</strong> ${lessonPlan.classGrade} &nbsp;&nbsp;&nbsp;&nbsp; <strong>DATE:</strong> ${lessonPlan.date}</p>
        <p><strong>Learning objectives:</strong></p>
        <ul>
          ${lessonPlan.learningObjectives.map((lo) => `<li>${lo}</li>`).join('')}
        </ul>
        <p><strong>Lesson focus:</strong> ${lessonPlan.lessonFocus}</p>
        <p><strong>Previous learning:</strong> ${lessonPlan.previousLearning.priorKnowledge}</p>
        <p><strong>Diagnostic check:</strong> ${lessonPlan.previousLearning.diagnosticCheck}</p>
      </div>

      <div class="section-title">Plan Table</div>
      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Timing</th>
            <th style="width: 52%;">Planned activities</th>
            <th style="width: 30%;">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Beginning</strong><br>${lessonPlan.plan.beginning.timing}</td>
            <td>
              <ul>
                ${lessonPlan.plan.beginning.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
              </ul>
            </td>
            <td>${lessonPlan.plan.beginning.notes}</td>
          </tr>
          <tr>
            <td><strong>Main activities</strong><br>${lessonPlan.plan.mainActivities.timing}</td>
            <td>
              <ul>
                ${lessonPlan.plan.mainActivities.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
              </ul>
              <p><strong>Formative assessment guidance:</strong><br>${lessonPlan.plan.mainActivities.formativeAssessment}</p>
            </td>
            <td>${lessonPlan.plan.mainActivities.notes}</td>
          </tr>
          <tr>
            <td><strong>End</strong><br>Reflection / Summary<br>${lessonPlan.plan.end.timing}</td>
            <td>
              <ul>
                ${lessonPlan.plan.end.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
              </ul>
            </td>
            <td>${lessonPlan.plan.end.notes}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">Reflection</div>
      <p><strong>Were the learning objectives/lesson focus realistic? What did learners learn?</strong><br>${lessonPlan.reflection.learningOutcomesRealistic} ${lessonPlan.reflection.whatLearnersLearned}</p>
      <p><strong>What was the learning atmosphere like?</strong><br>${lessonPlan.reflection.learningAtmosphere}</p>
      <p><strong>Did I stick to timings?</strong><br>${lessonPlan.reflection.timingAdherence}</p>
      <p><strong>What changes did I make from my plan and why?</strong><br>${lessonPlan.reflection.changesMadeAndWhy}</p>

      <div class="section-title">Summary Evaluation</div>
      <p><strong>What two things really went well:</strong></p>
      <ol>
        <li>${lessonPlan.summaryEvaluation.wentWell[0]}</li>
        <li>${lessonPlan.summaryEvaluation.wentWell[1]}</li>
      </ol>
      <p><strong>What two things would have improved the lesson:</strong></p>
      <ol>
        <li>${lessonPlan.summaryEvaluation.improveNextTime[0]}</li>
        <li>${lessonPlan.summaryEvaluation.improveNextTime[1]}</li>
      </ol>
      <p><strong>What have I learned from this lesson that will inform my next lesson?</strong><br>${lessonPlan.summaryEvaluation.informNextLesson}</p>

      <div class="section-title">Next Steps</div>
      <p>${lessonPlan.nextSteps}</p>
    </body>
    </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lesson_Plan_Unit${lessonPlan.unitNumber}_${lessonPlan.topic.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm font-bold text-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                STEAM Lesson Plan Generator
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                Grade 8 • Nepal CDC
              </span>
              <span className="hidden md:inline-flex px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Cambridge Template
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict template adherence • Textbook-grounded • Low-resource hands-on experiments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            id="btn-quick-new-plan"
            type="button"
            onClick={onNewPlanClick}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Chapter</span>
          </button>

          <button
            id="btn-copy-markdown"
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            title="Copy as Markdown to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Markdown'}</span>
          </button>

          <button
            id="btn-export-json"
            type="button"
            onClick={() => {
              if (!lessonPlan) return;
              const blob = new Blob([JSON.stringify(lessonPlan, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Lesson_Plan_Unit${lessonPlan.unitNumber}_${lessonPlan.topic.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            title="Download lesson plan data as JSON"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Download JSON</span>
          </button>

          <button
            id="btn-export-doc"
            type="button"
            onClick={handleExportWord}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            title="Download Word Document (.doc)"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Word (.doc)</span>
          </button>

          <button
            id="btn-print-lesson-plan"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
