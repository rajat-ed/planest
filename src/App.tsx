/**
 * STEAM Lesson Plan Generator
 * Grade 8 Science & Technology (Nepal CDC Curriculum)
 * Cambridge Lower Secondary Template Adherence
 *
 * Designed with Anti-Overwhelm & Robustness Philosophy:
 * - Cognitive Clarity (generous whitespace, soft natural slate/green/warm off-white palette)
 * - Progressive Disclosure (essential inputs upfront, advanced settings collapsed)
 * - Zero-Friction Execution (instant Copy, Download JSON, Word, and Print actions)
 * - Dominant, distraction-free preview canvas
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CambridgeLessonPlan } from './types';
import { DEFAULT_GRADE_8_LESSON_PLAN } from './data/defaultLessonPlan';
import { Header } from './components/Header';
import { InputSidebar } from './components/InputSidebar';
import { CambridgeTemplateView } from './components/CambridgeTemplateView';
import { SteamMaterialsBadge } from './components/SteamMaterialsBadge';
import { ChapterSelectorDrawer } from './components/ChapterSelectorDrawer';
import { CurriculumBrowserModal } from './components/CurriculumBrowserModal';
import { GenerationAnimationOverlay } from './components/GenerationAnimationOverlay';
import {
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  X,
  Layers,
} from 'lucide-react';
import { cleanGrade } from './utils/exportTemplate';

export default function App() {
  const [currentPlan, setCurrentPlan] = useState<CambridgeLessonPlan>(DEFAULT_GRADE_8_LESSON_PLAN);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingTarget, setGeneratingTarget] = useState<{ unitNumber?: number; topic?: string } | null>(null);
  const [justGenerated, setJustGenerated] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isCurriculumBrowserOpen, setIsCurriculumBrowserOpen] = useState(false);
  const [activeCanvasView, setActiveCanvasView] = useState<'plan' | 'steam' | 'curriculum'>('plan');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePlanGenerated = (newPlan: CambridgeLessonPlan) => {
    setCurrentPlan(newPlan);
    setActiveCanvasView('plan');
    setGeneratingTarget(null);
    setJustGenerated(true);
    setTimeout(() => setJustGenerated(false), 5000);
    showToast(`Lesson plan updated for Unit ${newPlan.unitNumber}: ${newPlan.topic}`);
  };

  const handleQuickTopicSelect = async (unitNum: number, topic: string) => {
    setGeneratingTarget({ unitNumber: unitNum, topic });
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: unitNum,
          topic,
          classGrade: cleanGrade(currentPlan.classGrade) || 'Grade 8',
          durationMinutes: currentPlan.durationMinutes || 45,
          lowResourceFocus: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.lessonPlan) {
          handlePlanGenerated(data.lessonPlan);
        }
      }
    } catch (e) {
      console.error(e);
      showToast('Error generating plan for chapter.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Top Application Header */}
      <Header
        lessonPlan={currentPlan}
        onNewPlanClick={() => setIsSelectorOpen(true)}
        isGenerating={isGenerating}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-[#1d1d1f]/90 text-white text-[13px] px-4 py-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex items-center gap-2 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#34c759]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Single-Page Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clean, Low-Cognitive-Load Input Sidebar (col-span-4) */}
        <div className="no-print lg:col-span-4 xl:col-span-4 space-y-4">
          <InputSidebar
            currentPlan={currentPlan}
            onPlanGenerated={handlePlanGenerated}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            onOpenCurriculumGuide={() => setIsCurriculumBrowserOpen(true)}
            onStartGenerating={(ctx) => setGeneratingTarget(ctx)}
          />

          {/* Quick Textbook Context Summary */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#1d1d1f] flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                  <BookOpen className="w-3 h-3" />
                </div>
                <span>Textbook Grounding</span>
              </span>
              <span className="text-[11px] text-[#86868b] font-medium">
                {currentPlan.textbookReference?.pageRange || 'Grade 8 Science'}
              </span>
            </div>
            <p className="text-[12px] text-[#6e6e73] leading-relaxed">
              {currentPlan.textbookReference?.chapterSummary ||
                'Aligned with official Nepal CDC science concepts, terminology, and laboratory experiments.'}
            </p>
          </div>
        </div>

        {/* Right Column: Dominant, Distraction-Free Preview / Canvas Area (col-span-8) */}
        <section aria-label="Lesson Plan Document Workspace" className="lg:col-span-8 xl:col-span-8 space-y-4">
          {/* Canvas View Switcher Toolbar (Apple Segmented Control) */}
          <div className="no-print flex items-center justify-between bg-white border border-black/[0.06] px-3.5 py-2 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)]">
            <div className="bg-[#e5e5ea]/60 p-1 rounded-xl flex items-center gap-1 border border-black/[0.03]">
              <button
                type="button"
                onClick={() => setActiveCanvasView('plan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                  activeCanvasView === 'plan'
                    ? 'bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Cambridge Plan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCanvasView('steam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                  activeCanvasView === 'steam'
                    ? 'bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#34c759]" />
                <span>STEAM Dimensions</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#86868b] font-medium hidden sm:inline">
                Cambridge Lower Secondary
              </span>
              <button
                type="button"
                onClick={() => setIsCurriculumBrowserOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-[#1d1d1f] hover:bg-[#f5f5f7] bg-white border border-black/[0.08] rounded-lg transition-all font-medium cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <Layers className="w-3.5 h-3.5 text-[#6e6e73]" />
                <span>CDC LOs</span>
              </button>
            </div>
          </div>

          {/* Success Banner when plan finishes generating */}
          {justGenerated && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="no-print bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 px-4 py-2.5 rounded-xl flex items-center justify-between text-[12px] font-medium shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Lesson plan generated and structured in official Cambridge format.</span>
              </div>
              <span className="text-[11px] text-emerald-700/80 font-normal">Ready for export or classroom use</span>
            </motion.div>
          )}

          {/* Active Canvas Content with Professional Generation Animation */}
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating-view"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <GenerationAnimationOverlay
                  unitNumber={generatingTarget?.unitNumber || currentPlan.unitNumber}
                  topic={generatingTarget?.topic || currentPlan.topic}
                />
              </motion.div>
            ) : activeCanvasView === 'plan' ? (
              <motion.div
                key={`plan-${currentPlan.id || currentPlan.unitNumber}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <CambridgeTemplateView
                  plan={currentPlan}
                  onUpdatePlan={(updated) => setCurrentPlan(updated)}
                />
                <SteamMaterialsBadge plan={currentPlan} />
              </motion.div>
            ) : (
              <motion.div
                key="steam-view"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <SteamMaterialsBadge plan={currentPlan} />
                <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.05] p-6">
                  <h3 className="text-[14px] font-semibold text-[#1d1d1f] mb-2">
                    Lesson Focus & Practical Execution
                  </h3>
                  <p className="text-[13px] text-[#6e6e73] leading-relaxed">
                    {currentPlan.lessonFocus}
                  </p>
                  <div className="mt-5 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] text-[#86868b]">
                      Nepal CDC Grade 8 Curriculum Alignment
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveCanvasView('plan')}
                      className="text-[12px] font-medium text-[#0071e3] hover:underline cursor-pointer"
                    >
                      View Official Cambridge Sheet &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Chapter Selection Drawer */}
      <ChapterSelectorDrawer
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onPlanGenerated={handlePlanGenerated}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
        onStartGenerating={(ctx) => setGeneratingTarget(ctx)}
      />

      {/* Curriculum Browser Modal */}
      <CurriculumBrowserModal
        isOpen={isCurriculumBrowserOpen}
        onClose={() => setIsCurriculumBrowserOpen(false)}
        onSelectUnitAndTopic={(uNum, topic) => {
          setIsCurriculumBrowserOpen(false);
          handleQuickTopicSelect(uNum, topic);
        }}
      />
    </div>
  );
}
