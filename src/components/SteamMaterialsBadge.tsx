import React from 'react';
import { CambridgeLessonPlan } from '../types';
import { FlaskConical, Cpu, Wrench, Palette, Calculator, CheckCircle, ExternalLink, Package } from 'lucide-react';

interface SteamMaterialsBadgeProps {
  plan: CambridgeLessonPlan;
}

export const SteamMaterialsBadge: React.FC<SteamMaterialsBadgeProps> = ({ plan }) => {
  const steam = plan.steamConnections;
  const textbook = plan.textbookReference;

  return (
    <div className="space-y-4 no-print">
      {/* STEAM Connections Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            S
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Integrated STEAM Framework Connections
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3.5">
          Curriculum mapping across Science, Technology, Engineering, Arts, and Mathematics:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
          <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
              <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
              <span>Science</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {steam?.science || 'Natural phenomena observation & fundamental theory'}
            </p>
          </div>

          <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Technology</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {steam?.technology || 'Tools, measuring devices, and scientific instruments'}
            </p>
          </div>

          <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <Wrench className="w-3.5 h-3.5 text-amber-600" />
              <span>Engineering</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {steam?.engineering || 'Design of apparatus, mounting, and structural testing'}
            </p>
          </div>

          <div className="bg-purple-50/60 p-2.5 rounded-lg border border-purple-100">
            <div className="flex items-center gap-1.5 font-bold text-purple-900 mb-1">
              <Palette className="w-3.5 h-3.5 text-purple-600" />
              <span>Arts</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {steam?.arts || 'Observational drawing, diagramming, model aesthetics'}
            </p>
          </div>

          <div className="bg-rose-50/60 p-2.5 rounded-lg border border-rose-100">
            <div className="flex items-center gap-1.5 font-bold text-rose-900 mb-1">
              <Calculator className="w-3.5 h-3.5 text-rose-600" />
              <span>Math</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {steam?.math || 'Measurements, scales, data tables, ratios, calculations'}
            </p>
          </div>
        </div>
      </div>

      {/* Low-Resource Materials & Textbook Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low-Resource Materials */}
        <div className="bg-emerald-50/30 rounded-xl shadow-xs border border-emerald-200 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Low-Cost & Locally Available Materials
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Zero-Budget STEAM
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-2.5">
            Classroom-tested accessible alternatives requiring minimal or no commercial equipment:
          </p>

          <ul className="space-y-1.5 text-xs text-slate-800">
            {(textbook?.localLowCostMaterials || [
              'Locally available household produce or garden plants',
              'Clean scrap cardboard and toothpicks',
              'Repurposed transparent plastic cups and bottles',
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Textbook Activities & Curriculum Links */}
        <div className="bg-blue-50/30 rounded-xl shadow-xs border border-blue-200 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Textbook Grounding & Page References
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
              Nepal CDC 2023
            </span>
          </div>

          <div className="text-xs text-slate-700 space-y-2">
            <div>
              <span className="font-semibold text-slate-900">Covered in Textbook: </span>
              <span>{textbook?.pageRange || 'Grade 8 Science and Technology'}</span>
            </div>

            <div>
              <span className="font-semibold text-slate-900 block mb-1">
                Official Textbook Activities:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-800">
                {(textbook?.activities || ['Activity related to unit topic']).map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
