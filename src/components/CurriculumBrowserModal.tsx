import React, { useState } from 'react';
import { GRADE_8_CURRICULUM_UNITS, OFFICIAL_GRADE_8_LOS } from '../data/curriculumData';
import { CurriculumUnit } from '../types';
import { X, BookOpen, Target, FlaskConical, Search, CheckCircle2 } from 'lucide-react';

interface CurriculumBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnitAndTopic: (unitNumber: number, topic: string) => void;
}

export const CurriculumBrowserModal: React.FC<CurriculumBrowserModalProps> = ({
  isOpen,
  onClose,
  onSelectUnitAndTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUnitTab, setActiveUnitTab] = useState<number>(1);

  if (!isOpen) return null;

  const filteredUnits = GRADE_8_CURRICULUM_UNITS.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.title.toLowerCase().includes(term) ||
      u.topics.some((t) => t.toLowerCase().includes(term)) ||
      u.summary.toLowerCase().includes(term) ||
      u.learningOutcomes.some((lo) => lo.text.toLowerCase().includes(term))
    );
  });

  const currentUnit: CurriculumUnit =
    GRADE_8_CURRICULUM_UNITS.find((u) => u.unitNumber === activeUnitTab) ||
    GRADE_8_CURRICULUM_UNITS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Nepal CDC Grade 8 Science & Technology Curriculum
              </h2>
              <p className="text-xs text-slate-500">
                11 Comprehensive Units • 50+ Official Learning Outcomes (LOs 1.1 to 24.3)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 py-2.5 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search across all 11 units, topics, LOs, or experiments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Unit List Left Side */}
          <div className="w-full md:w-5/12 border-r border-slate-200 overflow-y-auto p-2 bg-slate-50 divide-y divide-slate-200">
            {filteredUnits.map((u) => (
              <button
                key={u.unitNumber}
                type="button"
                onClick={() => setActiveUnitTab(u.unitNumber)}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all my-0.5 ${
                  activeUnitTab === u.unitNumber
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold">Unit {u.unitNumber}: {u.title}</span>
                  <span className={`text-[10px] ${activeUnitTab === u.unitNumber ? 'text-blue-200' : 'text-slate-400'}`}>
                    {u.pageRange}
                  </span>
                </div>
                <div className={`text-[11px] line-clamp-1 ${activeUnitTab === u.unitNumber ? 'text-blue-100' : 'text-slate-500'}`}>
                  {u.summary}
                </div>
              </button>
            ))}
          </div>

          {/* Unit Detail Right Side */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded">
                  Theme: {currentUnit.theme}
                </span>
                <span className="text-xs text-slate-500">{currentUnit.pageRange}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Unit {currentUnit.unitNumber}: {currentUnit.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">{currentUnit.summary}</p>
            </div>

            {/* Official Learning Outcomes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Official Learning Outcomes (LOs):</span>
              </h4>
              <div className="space-y-1.5">
                {currentUnit.learningOutcomes.map((lo) => (
                  <div key={lo.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-xs flex items-start gap-2">
                    <span className="font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                      LO {lo.id}
                    </span>
                    <span className="text-slate-800 leading-snug">{lo.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics & Quick Plan Trigger */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Topics Covered in Textbook:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentUnit.topics.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-2">
                    <span className="text-xs font-medium text-slate-800">{t}</span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectUnitAndTopic(currentUnit.unitNumber, t);
                        onClose();
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 self-start inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Plan this topic &rarr;</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Textbook Hands-On Activities */}
            {currentUnit.textbookActivities.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span>Hands-On Activities in Textbook:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentUnit.textbookActivities.map((act) => (
                    <div key={act.id} className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 text-xs space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-emerald-950">
                          {act.id}: {act.title}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">Page {act.pageNumber}</span>
                      </div>
                      <p className="text-slate-700 font-medium">
                        <strong>Objective:</strong> {act.objective}
                      </p>
                      <p className="text-slate-600">
                        <strong>Low-Cost Alternatives:</strong> {act.localLowCostAlternatives.join(', ')}
                      </p>
                      <p className="text-slate-600">
                        <strong>Method:</strong> {act.methodSummary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
