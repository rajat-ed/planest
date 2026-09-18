import React from 'react';
import { CambridgeLessonPlan } from '../types';
import { FlaskConical, Cpu, Wrench, Palette, Calculator, CheckCircle2, BookOpen, Sparkles, Layers } from 'lucide-react';

interface SteamMaterialsBadgeProps {
  plan: CambridgeLessonPlan;
}

export const SteamMaterialsBadge: React.FC<SteamMaterialsBadgeProps> = ({ plan }) => {
  const steam = plan.steamConnections;
  const textbook = plan.textbookReference;

  return (
    <div className="space-y-4 no-print">
      {/* STEAM Connections Card */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold text-[13px]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Integrated STEAM Dimensions
              </h3>
              <p className="text-[12px] text-[#86868b]">
                Interdisciplinary pedagogy mapped across 5 core pillars
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-[#0071e3] bg-[#0071e3]/10 px-2.5 py-1 rounded-full">
            Unit {plan.unitNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 text-[12px]">
          {/* Science */}
          <div className="bg-[#f5f5f7] p-3.5 rounded-xl border border-black/[0.04] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#1d1d1f] mb-1.5">
                <div className="w-5 h-5 rounded-md bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                  <FlaskConical className="w-3 h-3" />
                </div>
                <span>Science</span>
              </div>
              <p className="text-[#6e6e73] leading-relaxed">
                {steam?.science || 'Natural phenomena observation & fundamental theory'}
              </p>
            </div>
          </div>

          {/* Technology */}
          <div className="bg-[#f5f5f7] p-3.5 rounded-xl border border-black/[0.04] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#1d1d1f] mb-1.5">
                <div className="w-5 h-5 rounded-md bg-[#34c759]/10 text-[#34c759] flex items-center justify-center">
                  <Cpu className="w-3 h-3" />
                </div>
                <span>Technology</span>
              </div>
              <p className="text-[#6e6e73] leading-relaxed">
                {steam?.technology || 'Tools, measuring devices, and scientific instruments'}
              </p>
            </div>
          </div>

          {/* Engineering */}
          <div className="bg-[#f5f5f7] p-3.5 rounded-xl border border-black/[0.04] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#1d1d1f] mb-1.5">
                <div className="w-5 h-5 rounded-md bg-[#ff9500]/10 text-[#ff9500] flex items-center justify-center">
                  <Wrench className="w-3 h-3" />
                </div>
                <span>Engineering</span>
              </div>
              <p className="text-[#6e6e73] leading-relaxed">
                {steam?.engineering || 'Design of apparatus, mounting, and structural testing'}
              </p>
            </div>
          </div>

          {/* Arts */}
          <div className="bg-[#f5f5f7] p-3.5 rounded-xl border border-black/[0.04] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#1d1d1f] mb-1.5">
                <div className="w-5 h-5 rounded-md bg-[#af52de]/10 text-[#af52de] flex items-center justify-center">
                  <Palette className="w-3 h-3" />
                </div>
                <span>Arts</span>
              </div>
              <p className="text-[#6e6e73] leading-relaxed">
                {steam?.arts || 'Observational drawing, diagramming, model aesthetics'}
              </p>
            </div>
          </div>

          {/* Math */}
          <div className="bg-[#f5f5f7] p-3.5 rounded-xl border border-black/[0.04] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[#1d1d1f] mb-1.5">
                <div className="w-5 h-5 rounded-md bg-[#ff2d55]/10 text-[#ff2d55] flex items-center justify-center">
                  <Calculator className="w-3 h-3" />
                </div>
                <span>Math</span>
              </div>
              <p className="text-[#6e6e73] leading-relaxed">
                {steam?.math || 'Measurements, scales, data tables, ratios, calculations'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Low-Resource Materials & Textbook Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low-Resource Materials */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#34c759]/10 text-[#248a3d] flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-[13px] font-semibold text-[#1d1d1f]">
                Low-Cost & Locally Available Materials
              </h4>
            </div>
            <span className="text-[11px] font-medium text-[#248a3d] bg-[#34c759]/10 px-2 py-0.5 rounded-full">
              Zero-Budget
            </span>
          </div>
          <p className="text-[12px] text-[#86868b] mb-3">
            Classroom-tested accessible alternatives requiring no expensive commercial apparatus:
          </p>

          <ul className="space-y-2 text-[12px] text-[#1d1d1f]">
            {(textbook?.localLowCostMaterials || [
              'Locally available household produce or garden plants',
              'Clean scrap cardboard and toothpicks',
              'Repurposed transparent plastic cups and bottles',
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#f5f5f7] p-2.5 rounded-xl border border-black/[0.03]">
                <CheckCircle2 className="w-4 h-4 text-[#34c759] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Textbook Activities & Curriculum Links */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-[13px] font-semibold text-[#1d1d1f]">
                Textbook Grounding & Page References
              </h4>
            </div>
            <span className="text-[11px] font-medium text-[#0071e3] bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
              Nepal CDC 2023
            </span>
          </div>

          <div className="text-[12px] text-[#6e6e73] space-y-3">
            <div className="bg-[#f5f5f7] p-2.5 rounded-xl border border-black/[0.03]">
              <span className="font-semibold text-[#1d1d1f]">Covered in Textbook: </span>
              <span className="text-[#1d1d1f] font-medium">{textbook?.pageRange || 'Grade 8 Science and Technology'}</span>
            </div>

            <div>
              <span className="font-semibold text-[#1d1d1f] block mb-1.5">
                Official Textbook Activities:
              </span>
              <ul className="space-y-1.5 text-[12px] text-[#1d1d1f]">
                {(textbook?.activities || ['Activity related to unit topic']).map((act, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#f5f5f7] p-2.5 rounded-xl border border-black/[0.03]">
                    <span className="text-[#0071e3] font-semibold">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
