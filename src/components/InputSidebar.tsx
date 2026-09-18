import React, { useState } from 'react';
import { GRADE_8_CURRICULUM_UNITS } from '../data/curriculumData';
import { CurriculumUnit, CambridgeLessonPlan } from '../types';
import { Sparkles, ChevronDown, Sliders, Layers, Target, RefreshCw } from 'lucide-react';
import { cleanGrade } from '../utils/exportTemplate';

interface InputSidebarProps {
  currentPlan: CambridgeLessonPlan;
  onPlanGenerated: (plan: CambridgeLessonPlan) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  onOpenCurriculumGuide: () => void;
  onStartGenerating?: (context: { unitNumber: number; topic: string }) => void;
}

export const InputSidebar: React.FC<InputSidebarProps> = ({
  currentPlan,
  onPlanGenerated,
  isGenerating,
  setIsGenerating,
  onOpenCurriculumGuide,
  onStartGenerating,
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(currentPlan.unitNumber || 3);
  const [selectedTopic, setSelectedTopic] = useState<string>(currentPlan.topic || '');
  const [durationMinutes, setDurationMinutes] = useState<number>(currentPlan.durationMinutes || 45);
  const [classGrade, setClassGrade] = useState<string>(cleanGrade(currentPlan.classGrade) || 'Grade 8');
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
    onStartGenerating?.({
      unitNumber: selectedUnitNum,
      topic: selectedTopic || currentUnit.topics[0],
    });
    setIsGenerating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: selectedUnitNum,
          topic: selectedTopic || currentUnit.topics[0],
          classGrade: cleanGrade(classGrade),
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
    <aside className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-5 space-y-4 flex flex-col">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Lesson Setup</span>
          </span>
          <span className="text-[11px] font-medium text-[#34c759] bg-[#34c759]/10 px-2 py-0.5 rounded-full">
            CDC Nepal
          </span>
        </div>
        <p className="text-[13px] text-[#6e6e73] mt-1 leading-snug">
          Configure curriculum parameters to generate your Cambridge lesson plan.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 text-[12px] bg-[#ff3b30]/10 text-[#ff3b30] rounded-xl border border-[#ff3b30]/20 font-medium">
          {errorMessage}
        </div>
      )}

      {/* Input 1: Textbook Chapter */}
      <div>
        <label
          htmlFor="select-unit"
          className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5"
        >
          Textbook Chapter
        </label>
        <div className="relative">
          <select
            id="select-unit"
            value={selectedUnitNum}
            onChange={(e) => handleUnitChange(Number(e.target.value))}
            className="w-full appearance-none px-3.5 py-2.5 text-[13px] bg-[#f5f5f7] hover:bg-[#ebebed] focus:bg-white border border-transparent focus:border-[#0071e3] rounded-xl text-[#1d1d1f] font-medium transition-all outline-none pr-8 cursor-pointer"
          >
            {GRADE_8_CURRICULUM_UNITS.map((u) => (
              <option key={u.unitNumber} value={u.unitNumber}>
                Unit {u.unitNumber}: {u.title} ({u.pageRange})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#86868b] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Input 2: Topic */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="select-topic"
            className="block text-[12px] font-medium text-[#1d1d1f]"
          >
            Topic Focus
          </label>
          <span className="text-[11px] text-[#86868b] font-normal truncate max-w-[140px]">
            {currentUnit.theme}
          </span>
        </div>
        <div className="relative">
          <select
            id="select-topic"
            value={selectedTopic || currentUnit.topics[0]}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 text-[13px] bg-[#f5f5f7] hover:bg-[#ebebed] focus:bg-white border border-transparent focus:border-[#0071e3] rounded-xl text-[#1d1d1f] font-medium transition-all outline-none pr-8 cursor-pointer"
          >
            {currentUnit.topics.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#86868b] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Input 3: Duration - Apple Segmented Control */}
      <div>
        <label className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5">
          Duration
        </label>
        <div className="bg-[#f5f5f7] p-1 rounded-xl flex gap-1">
          {[35, 45, 60, 90].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDurationMinutes(mins)}
              className={`flex-1 py-1.5 text-center text-[12px] rounded-lg transition-all ${
                durationMinutes === mins
                  ? 'bg-white text-[#1d1d1f] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f] font-medium'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <button
          id="btn-sidebar-generate"
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`relative w-full py-2.5 px-4 text-white text-[13px] font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer overflow-hidden ${
            isGenerating
              ? 'bg-gradient-to-r from-[#0071e3] via-[#0051a8] to-[#0071e3] shadow-[0_2px_12px_rgba(0,113,227,0.35)] ring-2 ring-[#0071e3]/30'
              : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] shadow-[0_1px_3px_rgba(0,113,227,0.3)]'
          } disabled:cursor-not-allowed`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span className="font-semibold tracking-wide">Synthesizing Lesson Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate Lesson Plan</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-[#86868b] mt-1.5">
          Curriculum-aligned • Low-cost STEAM execution
        </p>
      </div>

      {/* Progressive Disclosure: Advanced Settings */}
      <div className="pt-2 border-t border-black/[0.06]">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full py-1.5 flex items-center justify-between text-[12px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#86868b]" />
            <span>Advanced Customization</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#86868b] transition-transform duration-200 ${
              showAdvanced ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showAdvanced && (
          <div className="mt-2.5 space-y-3 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1">
                Grade
              </label>
              <input
                type="text"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                placeholder="e.g. Grade 8"
                className="w-full px-2.5 py-1.5 text-[12px] bg-[#f5f5f7] focus:bg-white rounded-lg border border-transparent focus:border-[#0071e3] transition-all outline-none"
              />
            </div>

            {/* Apple-style iOS Toggle Switch for Low-Resource */}
            <div className="bg-[#f5f5f7] p-3 rounded-xl flex items-center justify-between gap-3">
              <div>
                <span className="font-medium text-[#1d1d1f] text-[12px] block">
                  Zero-Budget Materials
                </span>
                <span className="text-[#86868b] text-[11px] block mt-0.5 leading-tight">
                  Prioritize household & natural items over lab glassware
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={lowResourceFocus}
                onClick={() => setLowResourceFocus(!lowResourceFocus)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  lowResourceFocus ? 'bg-[#34c759]' : 'bg-[#d2d2d7]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    lowResourceFocus ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Specific Focus Instruction */}
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1">
                Custom Teacher Note (Optional)
              </label>
              <textarea
                rows={2}
                value={specificFocus}
                onChange={(e) => setSpecificFocus(e.target.value)}
                placeholder="e.g. Include peer discussion pairs, add 5 min metric review..."
                className="w-full px-2.5 py-2 text-[12px] bg-[#f5f5f7] focus:bg-white rounded-lg border border-transparent focus:border-[#0071e3] transition-all outline-none resize-none placeholder:text-[#86868b]"
              />
            </div>

            {/* Official LOs for this Unit */}
            <div className="bg-[#f5f5f7] p-3 rounded-xl text-[12px]">
              <div className="flex items-center gap-1.5 font-medium text-[#1d1d1f] mb-1.5 text-[11px]">
                <Target className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Curriculum Learning Outcomes:</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#6e6e73]">
                {currentUnit.learningOutcomes.slice(0, 3).map((lo) => (
                  <li key={lo.id} className="flex items-start gap-1.5">
                    <span className="font-mono text-[10px] font-semibold text-[#1d1d1f] bg-black/[0.04] px-1 py-0.5 rounded shrink-0">
                      LO {lo.id}
                    </span>
                    <span className="leading-snug">{lo.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Secondary Links */}
      <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
        <button
          type="button"
          onClick={onOpenCurriculumGuide}
          className="text-[#0071e3] hover:text-[#0077ed] font-medium transition-colors cursor-pointer"
        >
          All 11 Units & LOs &rarr;
        </button>
        <span className="text-[#86868b] font-medium">Cambridge Lower Secondary</span>
      </div>
    </aside>
  );
};
