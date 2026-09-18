import React, { useState } from 'react';
import { GRADE_8_CURRICULUM_UNITS } from '../data/curriculumData';
import { CurriculumUnit, CambridgeLessonPlan } from '../types';
import { X, Sparkles, BookOpen, Target, Check, AlertCircle, Layers } from 'lucide-react';
import { cleanGrade } from '../utils/exportTemplate';

interface ChapterSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (plan: CambridgeLessonPlan) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
  onStartGenerating?: (context: { unitNumber: number; topic: string }) => void;
}

export const ChapterSelectorDrawer: React.FC<ChapterSelectorDrawerProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
  isGenerating,
  setIsGenerating,
  onStartGenerating,
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(3);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>('Grade 8');
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [specificFocus, setSpecificFocus] = useState<string>('');
  const [lowResourceFocus, setLowResourceFocus] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const selectedUnit: CurriculumUnit =
    GRADE_8_CURRICULUM_UNITS.find((u) => u.unitNumber === selectedUnitNum) ||
    GRADE_8_CURRICULUM_UNITS[0];

  // Set default topic if not set
  React.useEffect(() => {
    if (selectedUnit && (!selectedTopic || !selectedUnit.topics.includes(selectedTopic))) {
      setSelectedTopic(selectedUnit.topics[0] || '');
    }
  }, [selectedUnitNum]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    onStartGenerating?.({
      unitNumber: selectedUnit.unitNumber,
      topic: selectedTopic || selectedUnit.topics[0],
    });
    onClose();
    setIsGenerating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: selectedUnit.unitNumber,
          topic: selectedTopic || selectedUnit.topics[0],
          classGrade: cleanGrade(classGrade),
          durationMinutes,
          specificFocus,
          lowResourceFocus,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error generating lesson plan');
      }

      const data = await response.json();
      if (data.lessonPlan) {
        onPlanGenerated(data.lessonPlan);
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Could not connect to generator. Please verify server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/25 backdrop-blur-xs flex justify-end">
      <div className="bg-[#f5f5f7] w-full max-w-xl h-full shadow-[0_16px_48px_rgba(0,0,0,0.18)] flex flex-col border-l border-black/[0.08] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#1d1d1f]">Select Textbook Chapter & LOs</h2>
              <p className="text-[11px] text-[#86868b]">
                Grade 8 Science & Technology • Nepal CDC & Cambridge Template
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] rounded-full bg-black/[0.04] hover:bg-black/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[12px] text-[#ff3b30] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#ff3b30] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Unit Selection Card */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-4.5 space-y-2.5">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
              1. Choose Chapter / Unit (1 to 11)
            </label>
            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {GRADE_8_CURRICULUM_UNITS.map((unit) => (
                <button
                  key={unit.unitNumber}
                  type="button"
                  onClick={() => setSelectedUnitNum(unit.unitNumber)}
                  className={`text-left p-2.5 rounded-xl text-[12px] transition-all flex items-start justify-between gap-2 cursor-pointer ${
                    selectedUnitNum === unit.unitNumber
                      ? 'bg-[#0071e3]/10 text-[#0071e3] font-semibold border border-[#0071e3]/20 shadow-2xs'
                      : 'bg-[#f5f5f7] hover:bg-black/[0.03] text-[#1d1d1f] border border-black/[0.03]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#1d1d1f]">
                      Unit {unit.unitNumber}: {unit.title}
                    </div>
                    <div className="text-[11px] text-[#86868b] line-clamp-1">{unit.summary}</div>
                  </div>
                  <span className="text-[10px] text-[#86868b] shrink-0 font-medium">{unit.pageRange}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Focus Selection Card */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-4.5 space-y-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
              2. Specific Topic in Unit {selectedUnit.unitNumber}
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2.5 text-[13px] bg-[#f5f5f7] border border-black/[0.08] rounded-xl text-[#1d1d1f] font-medium focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] focus:outline-none transition-all cursor-pointer"
            >
              {selectedUnit.topics.map((top, idx) => (
                <option key={idx} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* Associated Learning Outcomes (LOs) Preview Card */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-4.5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Official CDC Learning Outcomes for this Unit:</span>
            </div>
            <ul className="space-y-1.5 text-[12px] text-[#6e6e73]">
              {selectedUnit.learningOutcomes.map((lo) => (
                <li key={lo.id} className="flex items-start gap-2 bg-[#f5f5f7] p-2 rounded-lg border border-black/[0.02]">
                  <span className="font-mono text-[10px] font-semibold bg-[#0071e3]/10 text-[#0071e3] px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                    LO {lo.id}
                  </span>
                  <span className="leading-snug text-[#1d1d1f]">{lo.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Grade & Duration Card */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-4.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#86868b] mb-1 uppercase tracking-wider">
                  Grade:
                </label>
                <input
                  type="text"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  className="w-full p-2 text-[12px] border border-black/[0.08] rounded-xl bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  placeholder="e.g. Grade 8"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#86868b] mb-1 uppercase tracking-wider">
                  Duration:
                </label>
                <select
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full p-2 text-[12px] border border-black/[0.08] rounded-xl bg-[#f5f5f7] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] cursor-pointer"
                >
                  <option value={35}>35 mins</option>
                  <option value={40}>40 mins</option>
                  <option value={45}>45 mins (Standard)</option>
                  <option value={60}>60 mins</option>
                  <option value={90}>90 mins (Double)</option>
                </select>
              </div>
            </div>

            {/* Low Resource Priority Checkbox */}
            <div className="bg-[#34c759]/10 p-3 rounded-xl border border-[#34c759]/20">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowResourceFocus}
                  onChange={(e) => setLowResourceFocus(e.target.checked)}
                  className="w-4 h-4 text-[#34c759] rounded mt-0.5 accent-[#34c759]"
                />
                <div className="text-[12px]">
                  <span className="font-semibold text-[#1d1d1f] block">
                    Prioritize Low-Cost, Locally Available Hands-On Materials
                  </span>
                  <span className="text-[#6e6e73] text-[11px] block mt-0.5 leading-normal">
                    Strictly favors household items, natural resources (clay, mud, seeds, onion peel, plastic bottles, wood ash) over expensive commercial apparatus.
                  </span>
                </div>
              </label>
            </div>

            {/* Optional specific notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#86868b] mb-1 uppercase tracking-wider">
                Specific Teacher Notes / Focus (Optional):
              </label>
              <input
                type="text"
                value={specificFocus}
                onChange={(e) => setSpecificFocus(e.target.value)}
                placeholder="e.g. emphasize differentiation for slow learners, group inquiry station setup"
                className="w-full p-2.5 text-[12px] border border-black/[0.08] rounded-xl bg-[#f5f5f7] text-[#1d1d1f] focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-black/[0.06] bg-white/80 backdrop-blur-md flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] rounded-full transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="btn-confirm-generate"
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-[#0071e3] hover:bg-[#0077ed] rounded-full shadow-2xs transition-all disabled:opacity-50 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Lesson Plan...' : 'Generate Cambridge Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
