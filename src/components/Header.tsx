import React, { useState, useRef, useEffect } from 'react';
import {
  Printer,
  Download,
  Copy,
  Sparkles,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Code2,
} from 'lucide-react';
import { CambridgeLessonPlan } from '../types';
import { exportLessonPlanToWordDoc, cleanGrade } from '../utils/exportTemplate';

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
  const [copied, setCopied] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    setIsExportMenuOpen(false);
    window.print();
  };

  const handleCopyMarkdown = () => {
    if (!lessonPlan) return;

    const md = `# ${lessonPlan.unitTitle || `Unit ${lessonPlan.unitNumber}`}
## Topic: ${lessonPlan.topic}
*Cambridge Lower Secondary Lesson Plan*

## GRADE: ${cleanGrade(lessonPlan.classGrade)}

### Learning objectives
*Learning objective(s) from the curriculum framework*
${lessonPlan.learningObjectives.map((lo) => `* ${lo}`).join('\n')}

### Lesson focus
*Think about a specific, realistic and achievable amount of learning for the lesson.*
${lessonPlan.lessonFocus}

### Previous learning
*What have learners already covered or what do they need to know in order to access this lesson? How will you check their previous learning?*
* Prior Knowledge: ${lessonPlan.previousLearning.priorKnowledge}
* Diagnostic Check: ${lessonPlan.previousLearning.diagnosticCheck}

## Plan

| Timing | Planned activities | Notes |
| :--- | :--- | :--- |
| **Beginning**<br>${lessonPlan.plan.beginning.timing || '5–10 minutes'} | *At the start of the lesson, teachers can:*<br>• *grab learners' attention*<br>• *establish the context of the lesson/learning*<br>• *share objectives*<br>• *set expectations.*<br><br>${lessonPlan.plan.beginning.plannedActivities.join('; ')} | *Books, physical resources, web links etc.*<br><br>${lessonPlan.plan.beginning.notes} |
| **Main activities**<br>${lessonPlan.plan.mainActivities.timing || '25–30 minutes'} | *For the main activities during the lesson, learners can:*<br>• *develop skills and knowledge related to lesson focus*<br>• *practise techniques*<br>• *apply existing knowledge and skills*<br>• *explore concepts*<br>• *solve problems.*<br><br>${lessonPlan.plan.mainActivities.plannedActivities.join('; ')}<br><br>*(Include formative assessment guidance where applicable.)*<br>**Formative Assessment:** ${lessonPlan.plan.mainActivities.formativeAssessment} | ${lessonPlan.plan.mainActivities.notes} |
| **End**<br>**Reflection**<br>**Summary**<br>${lessonPlan.plan.end.timing || '5–10 minutes'} | *At the end of the lesson, learners can:*<br>• *reflect on their learning*<br>• *set targets for next lesson*<br>• *evaluate own and each others' work.*<br><br>${lessonPlan.plan.end.plannedActivities.join('; ')} | ${lessonPlan.plan.end.notes} |

## Reflection
**Use the space below to reflect on your lesson. Answer the most relevant questions from the box on the left about your lesson.**
*Were the learning objectives/lesson focus realistic? What did the learners learn today?*
*What was the learning atmosphere like?*
*Did I stick to timings?*
*What changes did I make from my plan and why?*

${lessonPlan.reflection.learningOutcomesRealistic} ${lessonPlan.reflection.whatLearnersLearned}
*Learning Atmosphere & Timings:* ${lessonPlan.reflection.learningAtmosphere} ${lessonPlan.reflection.timingAdherence}
*Adjustments:* ${lessonPlan.reflection.changesMadeAndWhy}

## Summary evaluation
**What two things really went well (consider both teaching and learning)?**
1: ${lessonPlan.summaryEvaluation.wentWell[0]}
2: ${lessonPlan.summaryEvaluation.wentWell[1]}

**What two things would have improved the lesson (consider both teaching and learning)?**
1: ${lessonPlan.summaryEvaluation.improveNextTime[0]}
2: ${lessonPlan.summaryEvaluation.improveNextTime[1]}

**What have I learned from this lesson about the class or individuals that will inform my next lesson?**
${lessonPlan.summaryEvaluation.informNextLesson}

## Next steps
**What will I teach next based on learners' understanding of this lesson?**
${lessonPlan.nextSteps}

---
*Cambridge Lower Secondary*
`;

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleExportWord = () => {
    setIsExportMenuOpen(false);
    if (!lessonPlan) return;
    exportLessonPlanToWordDoc(lessonPlan);
  };

  const handleExportJSON = () => {
    setIsExportMenuOpen(false);
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
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* App Title & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#0077ed] to-[#0071e3] text-white flex items-center justify-center shadow-[0_1px_4px_rgba(0,113,227,0.3)]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[15px] sm:text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
              STEAM Lesson Planner
            </h1>
            <span className="hidden sm:inline-flex text-[11px] font-medium text-[#6e6e73] bg-black/[0.04] px-2 py-0.5 rounded-md">
              Grade 8 • Nepal CDC
            </span>
          </div>
        </div>

        {/* Action Controls Group */}
        <div className="flex items-center gap-2">
          {/* Quick Copy Markdown Action */}
          <button
            id="btn-copy-markdown"
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1d1d1f] hover:text-[#0071e3] bg-black/[0.04] hover:bg-black/[0.07] active:scale-[0.97] rounded-lg transition-all"
            title="Copy lesson plan to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34c759]" />
                <span className="text-[#34c759] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#6e6e73]" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Consolidated Export Popover Menu */}
          <div className="relative" ref={menuRef}>
            <button
              id="btn-export-dropdown"
              type="button"
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.07] active:scale-[0.97] rounded-lg transition-all"
              title="Export lesson plan"
            >
              <Download className="w-3.5 h-3.5 text-[#6e6e73]" />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown className={`w-3 h-3 text-[#86868b] transition-transform duration-200 ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Apple Popover Menu */}
            {isExportMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-1.5 z-50 text-[13px] animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[11px] font-medium text-[#86868b] uppercase tracking-wider">
                  Export Options
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-colors text-left group"
                >
                  <Printer className="w-4 h-4 text-[#6e6e73] group-hover:text-white" />
                  <div className="flex flex-col">
                    <span className="font-medium">Print or PDF</span>
                    <span className="text-[11px] text-[#86868b] group-hover:text-white/80">Formatted official sheet</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleExportWord}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-colors text-left group"
                >
                  <FileText className="w-4 h-4 text-[#6e6e73] group-hover:text-white" />
                  <div className="flex flex-col">
                    <span className="font-medium">Word Document</span>
                    <span className="text-[11px] text-[#86868b] group-hover:text-white/80">Editable .doc file</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-colors text-left group"
                >
                  <Code2 className="w-4 h-4 text-[#6e6e73] group-hover:text-white" />
                  <div className="flex flex-col">
                    <span className="font-medium">JSON Data</span>
                    <span className="text-[11px] text-[#86868b] group-hover:text-white/80">Raw structured plan</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-quick-new-plan"
            type="button"
            onClick={onNewPlanClick}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium text-white bg-[#0071e3] hover:bg-[#0077ed] rounded-lg shadow-[0_1px_3px_rgba(0,113,227,0.3)] active:scale-[0.97] transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Chapter</span>
          </button>
        </div>
      </div>
    </header>
  );
};
