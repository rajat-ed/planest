import React, { useState } from 'react';
import { GRADE_8_CURRICULUM_UNITS } from '../data/curriculumData';
import { CurriculumUnit, CambridgeLessonPlan } from '../types';
import { Sparkles, ChevronDown, ChevronUp, Sliders, Layers, Target, RefreshCw } from 'lucide-react';

interface InputSidebarProps {
  currentPlan: CambridgeLessonPlan;
  onPlanGenerated: (plan: CambridgeLessonPlan) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  onOpenCurriculumGuide: () => void;
  onOpenAssistant: () => void;
}

export const InputSidebar: React.FC<InputSidebarProps> = ({
  currentPlan,
  onPlanGenerated,
  isGenerating,
  setIsGenerating,
  onOpenCurriculumGuide,
  onOpenAssistant,
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(currentPlan.unitNumber || 3);
  const [selectedTopic, setSelectedTopic] = useState<string>(currentPlan.topic || '');
  const [durationMinutes, setDurationMinutes] = useState<number>(currentPlan.durationMinutes || 45);
  const [classGrade, setClassGrade] = useState<string>(currentPlan.classGrade || 'Grade 8 (Section A)');
  const [date, setDate] = useState<string>(currentPlan.date || new Date().toISOString().split('T')[0]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [lowResourceFocus, setLowResourceFocus] = useState<boolean>(true);
  const [specificFocus, setSpecificFocus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentUnit: CurriculumUnit =
    GRADE_8_CURRICULUM_UNITS.find((u) => u.unitNumber === selectedUnitNum) ||
    GRADE_8_CURRICULUM_UNITS[0];

  // Keep topic synced when unit changes
  const handleUnitChange = (unitNum: number) => {
    setSelectedUnitNum(unitNum);
    const unit = GRADE_8_CURRICULUM_UNITS.find((u) => u.unitNumber === unitNum);
    if (unit && unit.topics.length > 0) {
      setSelectedTopic(unit.topics[0]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: selectedUnitNum,
          topic: selectedTopic || currentUnit.topics[0],
          classGrade,
          date,
          durationMinutes,
          specificFocus,
          lowResourceFocus,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate lesson plan');
      }

      const data = await response.json();
      if (data.lessonPlan) {
        onPlanGenerated(data.lessonPlan);
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <aside className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 space-y-5 flex flex-col">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-700" />
            <span>Lesson Configuration</span>
          </span>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            CDC Nepal Grade 8
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Select textbook chapter and topic to generate a complete Cambridge lesson plan.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 text-xs bg-rose-50 text-rose-800 rounded-lg border border-rose-200">
          {errorMessage}
        </div>
      )}

      {/* Primary Input 1: Chapter / Unit */}
      <div>
        <label
          htmlFor="select-unit"
          className="block text-xs font-semibold text-slate-800 mb-1.5"
        >
          1. Textbook Chapter
        </label>
        <select
          id="select-unit"
          value={selectedUnitNum}
          onChange={(e) => handleUnitChange(Number(e.target.value))}
          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-300 rounded-xl text-slate-900 font-medium transition-colors focus:ring-2 focus:ring-slate-800 focus:bg-white focus:outline-hidden"
        >
          {GRADE_8_CURRICULUM_UNITS.map((u) => (
            <option key={u.unitNumber} value={u.unitNumber}>
              Unit {u.unitNumber}: {u.title} ({u.pageRange})
            </option>
          ))}
        </select>
      </div>

      {/* Primary Input 2: Topic */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="select-topic"
            className="block text-xs font-semibold text-slate-800"
          >
            2. Lesson Topic Focus
          </label>
          <span className="text-[11px] text-slate-500">
            Theme: {currentUnit.theme}
          </span>
        </div>
        <select
          id="select-topic"
          value={selectedTopic || currentUnit.topics[0]}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-300 rounded-xl text-slate-900 font-medium transition-colors focus:ring-2 focus:ring-slate-800 focus:bg-white focus:outline-hidden"
        >
          {currentUnit.topics.map((t, idx) => (
            <option key={idx} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Primary Input 3: Duration */}
      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-1.5">
          3. Lesson Duration
        </label>
        <div className="grid grid-cols-4 gap-1.5 text-xs">
          {[35, 45, 60, 90].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDurationMinutes(mins)}
              className={`py-2 px-1 text-center rounded-lg font-medium border transition-all ${
                durationMinutes === mins
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mins}m {mins === 45 ? '★' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Action Button (Zero-Friction Execution) */}
      <div>
        <button
          id="btn-sidebar-generate"
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-300" />
              <span>Generating Cambridge Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Generate Lesson Plan</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-slate-500 mt-1.5">
          Instant curriculum mapping with hands-on low-cost experiments
        </p>
      </div>

      {/* Progressive Disclosure: Advanced Settings Toggle */}
      <div className="pt-2 border-t border-slate-200/80">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full py-1.5 flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Advanced Customization</span>
          </span>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-3.5 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Class / Section:
                </label>
                <input
                  type="text"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Plan Date:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-800"
                />
              </div>
            </div>

            {/* Low Resource Prioritization */}
            <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowResourceFocus}
                  onChange={(e) => setLowResourceFocus(e.target.checked)}
                  className="w-3.5 h-3.5 text-emerald-600 rounded mt-0.5"
                />
                <div className="text-[11px]">
                  <span className="font-bold text-emerald-900 block">
                    Zero-Budget / Low-Cost Materials
                  </span>
                  <span className="text-emerald-700 block mt-0.5">
                    Prioritize household, natural, or scrap items over lab glassware.
                  </span>
                </div>
              </label>
            </div>

            {/* Specific Focus Instruction */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Custom Focus / Differentiation (Optional):
              </label>
              <textarea
                rows={2}
                value={specificFocus}
                onChange={(e) => setSpecificFocus(e.target.value)}
                placeholder="e.g. Include peer-teaching pairs, add 5 min review of metric units..."
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-800"
              />
            </div>

            {/* Official LOs for this Unit */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1 text-[11px]">
                <Target className="w-3.5 h-3.5 text-slate-600" />
                <span>Curriculum Learning Outcomes:</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-600 list-disc pl-4">
                {currentUnit.learningOutcomes.slice(0, 3).map((lo) => (
                  <li key={lo.id}>
                    <span className="font-mono text-[10px] font-bold text-slate-700">LO {lo.id}:</span>{' '}
                    {lo.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Secondary Tools */}
      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onOpenCurriculumGuide}
          className="text-slate-600 hover:text-slate-900 font-medium hover:underline text-[11px]"
        >
          View all 11 Units & LOs &rarr;
        </button>

        <button
          type="button"
          onClick={onOpenAssistant}
          className="text-emerald-700 hover:text-emerald-800 font-semibold text-[11px] bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 hover:bg-emerald-100 transition-colors"
        >
          AI Lesson Copilot &rarr;
        </button>
      </div>
    </aside>
  );
};
