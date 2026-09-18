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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-[#f5f5f7] w-full max-w-4xl h-[85vh] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.22)] flex flex-col border border-black/[0.08] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] bg-white/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
                Nepal CDC Grade 8 Science & Technology Curriculum
              </h2>
              <p className="text-[11px] text-[#86868b]">
                11 Comprehensive Units • 50+ Official Learning Outcomes (LOs 1.1 to 24.3)
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

        {/* Search bar (Apple Pill search) */}
        <div className="px-4 py-3 border-b border-black/[0.06] bg-white/60 backdrop-blur-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search across all 11 units, topics, LOs, or experiments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-[13px] bg-[#e5e5ea]/50 rounded-full border border-black/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:bg-white text-[#1d1d1f] placeholder:text-[#86868b] transition-all"
            />
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Unit List Left Side (macOS Finder style sidebar) */}
          <div className="w-full md:w-5/12 border-r border-black/[0.06] overflow-y-auto p-2.5 bg-[#f5f5f7] space-y-1">
            {filteredUnits.map((u) => (
              <button
                key={u.unitNumber}
                type="button"
                onClick={() => setActiveUnitTab(u.unitNumber)}
                className={`w-full text-left p-2.5 rounded-xl text-[12px] transition-all cursor-pointer ${
                  activeUnitTab === u.unitNumber
                    ? 'bg-[#0071e3] text-white shadow-2xs font-medium'
                    : 'text-[#1d1d1f] hover:bg-black/[0.04]'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold">Unit {u.unitNumber}: {u.title}</span>
                  <span className={`text-[10px] ${activeUnitTab === u.unitNumber ? 'text-white/80' : 'text-[#86868b]'}`}>
                    {u.pageRange}
                  </span>
                </div>
                <div className={`text-[11px] line-clamp-1 ${activeUnitTab === u.unitNumber ? 'text-white/90' : 'text-[#6e6e73]'}`}>
                  {u.summary}
                </div>
              </button>
            ))}
          </div>

          {/* Unit Detail Right Side */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
            <div className="border-b border-black/[0.06] pb-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-[11px] font-medium bg-[#0071e3]/10 text-[#0071e3] rounded-full">
                  Theme: {currentUnit.theme}
                </span>
                <span className="text-[11px] text-[#86868b]">{currentUnit.pageRange}</span>
              </div>
              <h3 className="text-[17px] font-semibold text-[#1d1d1f]">
                Unit {currentUnit.unitNumber}: {currentUnit.title}
              </h3>
              <p className="text-[13px] text-[#6e6e73] mt-1 leading-relaxed">{currentUnit.summary}</p>
            </div>

            {/* Official Learning Outcomes */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-2.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Official Learning Outcomes (LOs)</span>
              </h4>
              <div className="space-y-2">
                {currentUnit.learningOutcomes.map((lo) => (
                  <div key={lo.id} className="p-2.5 bg-[#f5f5f7] rounded-xl border border-black/[0.03] text-[12px] flex items-start gap-2.5">
                    <span className="font-mono font-semibold bg-[#0071e3]/10 text-[#0071e3] px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5">
                      LO {lo.id}
                    </span>
                    <span className="text-[#1d1d1f] leading-relaxed">{lo.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics & Quick Plan Trigger */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-2.5">
                Topics Covered in Textbook
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentUnit.topics.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-black/[0.05] bg-[#f5f5f7] flex flex-col justify-between gap-2.5">
                    <span className="text-[12px] font-medium text-[#1d1d1f]">{t}</span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectUnitAndTopic(currentUnit.unitNumber, t);
                        onClose();
                      }}
                      className="text-[11px] font-medium text-[#0071e3] hover:text-[#0077ed] bg-white border border-black/[0.06] rounded-full px-3 py-1 shadow-2xs self-start inline-flex items-center gap-1 cursor-pointer transition-all active:scale-95"
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
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-2.5 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-[#34c759]" />
                  <span>Hands-On Activities in Textbook</span>
                </h4>
                <div className="space-y-2.5">
                  {currentUnit.textbookActivities.map((act) => (
                    <div key={act.id} className="p-3.5 rounded-2xl border border-black/[0.05] bg-[#f5f5f7] text-[12px] space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-[#1d1d1f]">
                          {act.id}: {act.title}
                        </span>
                        <span className="text-[10px] text-[#86868b] font-medium">Page {act.pageNumber}</span>
                      </div>
                      <p className="text-[#1d1d1f]">
                        <strong className="font-semibold text-[#1d1d1f]">Objective:</strong> {act.objective}
                      </p>
                      <p className="text-[#6e6e73]">
                        <strong className="font-semibold text-[#1d1d1f]">Low-Cost Alternatives:</strong> {act.localLowCostAlternatives.join(', ')}
                      </p>
                      <p className="text-[#6e6e73]">
                        <strong className="font-semibold text-[#1d1d1f]">Method:</strong> {act.methodSummary}
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
