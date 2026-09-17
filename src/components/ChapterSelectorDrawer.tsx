import React, { useState } from 'react';
import { GRADE_8_CURRICULUM_UNITS } from '../data/curriculumData';
import { CurriculumUnit, CambridgeLessonPlan } from '../types';
import { X, Sparkles, BookOpen, Target, Check, AlertCircle, Layers } from 'lucide-react';

interface ChapterSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated: (plan: CambridgeLessonPlan) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}

export const ChapterSelectorDrawer: React.FC<ChapterSelectorDrawerProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
  isGenerating,
  setIsGenerating,
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(3);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>('Grade 8 (Section A)');
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
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
    setIsGenerating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: selectedUnit.unitNumber,
          topic: selectedTopic || selectedUnit.topics[0],
          classGrade,
          date,
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
        onClose();
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Could not connect to generator. Please verify server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Select Textbook Chapter & LOs</h2>
              <p className="text-xs text-slate-500">
                Grade 8 Science & Technology • National Curriculum Framework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Unit Selection Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Choose Chapter / Unit (1 to 11):
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 border border-slate-200 rounded-lg p-1.5 bg-slate-50/50">
              {GRADE_8_CURRICULUM_UNITS.map((unit) => (
                <button
                  key={unit.unitNumber}
                  type="button"
                  onClick={() => setSelectedUnitNum(unit.unitNumber)}
                  className={`text-left p-2.5 rounded-md text-xs transition-all flex items-start justify-between gap-2 border ${
                    selectedUnitNum === unit.unitNumber
                      ? 'bg-blue-50 text-blue-950 border-blue-400 font-semibold shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-900">
                      Unit {unit.unitNumber}: {unit.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{unit.summary}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{unit.pageRange}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Focus Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              2. Specific Topic in Unit {selectedUnit.unitNumber}:
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {selectedUnit.topics.map((top, idx) => (
                <option key={idx} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* Associated Learning Outcomes (LOs) Preview */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Official Department of Science LOs for this Unit:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {selectedUnit.learningOutcomes.map((lo) => (
                <li key={lo.id} className="flex items-start gap-1.5">
                  <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded shrink-0">
                    LO {lo.id}
                  </span>
                  <span className="leading-snug">{lo.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Class & Date & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Target Class:
              </label>
              <input
                type="text"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                placeholder="e.g. Grade 8-A"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Date:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Period Duration:
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value={35}>35 mins</option>
                <option value={40}>40 mins</option>
                <option value={45}>45 mins (Standard)</option>
                <option value={60}>60 mins</option>
                <option value={90}>90 mins (Double Period)</option>
              </select>
            </div>
          </div>

          {/* Low Resource Priority Checkbox */}
          <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={lowResourceFocus}
                onChange={(e) => setLowResourceFocus(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded mt-0.5"
              />
              <div className="text-xs">
                <span className="font-bold text-emerald-900 block">
                  Prioritize Low-Cost, Locally Available Hands-On Materials
                </span>
                <span className="text-emerald-700 text-[11px] block mt-0.5 leading-normal">
                  Strictly favors household items, natural resources (clay, mud, seeds, onion peel, plastic bottles, wood ash) over expensive commercial apparatus.
                </span>
              </div>
            </label>
          </div>

          {/* Optional specific notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Specific Teacher Notes / Focus (Optional):
            </label>
            <input
              type="text"
              value={specificFocus}
              onChange={(e) => setSpecificFocus(e.target.value)}
              placeholder="e.g. emphasize differentiation for slow learners, group inquiry station setup"
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            id="btn-confirm-generate"
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Lesson Plan...' : 'Generate Cambridge Lesson Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
