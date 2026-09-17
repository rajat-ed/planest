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
import { CambridgeLessonPlan } from './types';
import { DEFAULT_GRADE_8_LESSON_PLAN } from './data/defaultLessonPlan';
import { Header } from './components/Header';
import { InputSidebar } from './components/InputSidebar';
import { CambridgeTemplateView } from './components/CambridgeTemplateView';
import { SteamMaterialsBadge } from './components/SteamMaterialsBadge';
import { ChapterSelectorDrawer } from './components/ChapterSelectorDrawer';
import { TeacherChatPanel } from './components/TeacherChatPanel';
import { CurriculumBrowserModal } from './components/CurriculumBrowserModal';
import { GRADE_8_CURRICULUM_UNITS } from './data/curriculumData';
import {
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  X,
  Bot,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [currentPlan, setCurrentPlan] = useState<CambridgeLessonPlan>(DEFAULT_GRADE_8_LESSON_PLAN);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isCurriculumBrowserOpen, setIsCurriculumBrowserOpen] = useState(false);
  const [isAssistantDrawerOpen, setIsAssistantDrawerOpen] = useState(false);
  const [activeCanvasView, setActiveCanvasView] = useState<'plan' | 'steam' | 'curriculum'>('plan');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePlanGenerated = (newPlan: CambridgeLessonPlan) => {
    setCurrentPlan(newPlan);
    setActiveCanvasView('plan');
    showToast(`Lesson plan updated for Unit ${newPlan.unitNumber}: ${newPlan.topic}`);
  };

  const handleQuickTopicSelect = async (unitNum: number, topic: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitNumber: unitNum,
          topic,
          classGrade: currentPlan.classGrade || 'Grade 8 (Section A)',
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
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 flex flex-col font-sans">
      {/* Top Application Header with Direct Zero-Friction Utilities */}
      <Header
        lessonPlan={currentPlan}
        onNewPlanClick={() => setIsSelectorOpen(true)}
        isGenerating={isGenerating}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Subtle Breadcrumb & Quick Unit Navigator */}
      <nav aria-label="Quick Unit Navigator" className="no-print bg-white/80 backdrop-blur-xs border-b border-slate-200/80 sticky top-[61px] z-20 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Active Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              Active Unit:
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-md font-semibold border border-slate-200">
              Unit {currentPlan.unitNumber}: {currentPlan.unitTitle}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium truncate max-w-xs sm:max-w-md">
              {currentPlan.topic}
            </span>
          </div>

          {/* Quick Chapter Shortcuts */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Quick Jump:</span>
            {GRADE_8_CURRICULUM_UNITS.slice(0, 7).map((u) => (
              <button
                key={u.unitNumber}
                type="button"
                onClick={() => handleQuickTopicSelect(u.unitNumber, u.topics[0])}
                disabled={isGenerating}
                className={`text-[11px] px-2 py-0.5 rounded transition-all border ${
                  currentPlan.unitNumber === u.unitNumber
                    ? 'bg-slate-900 text-white border-slate-900 font-medium shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                U{u.unitNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsSelectorOpen(true)}
              className="text-[11px] text-slate-500 hover:text-slate-900 px-1.5 py-0.5 hover:underline font-medium"
            >
              All 11 &rarr;
            </button>
          </div>

          {/* Assistant Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              id="btn-open-copilot"
              type="button"
              onClick={() => setIsAssistantDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shadow-2xs"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              <span>AI Curriculum Copilot</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Single-Page Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clean, Low-Cognitive-Load Input Sidebar (35% or col-span-4) */}
        <div className="no-print lg:col-span-4 xl:col-span-4 space-y-4">
          <InputSidebar
            currentPlan={currentPlan}
            onPlanGenerated={handlePlanGenerated}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            onOpenCurriculumGuide={() => setIsCurriculumBrowserOpen(true)}
            onOpenAssistant={() => setIsAssistantDrawerOpen(true)}
          />

          {/* Quick Textbook Context Summary */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Textbook Grounding</span>
              </span>
              <span className="text-[11px] text-slate-500">
                {currentPlan.textbookReference?.pageRange || 'Grade 8 Science'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentPlan.textbookReference?.chapterSummary ||
                'Aligned with official Nepal CDC science concepts, terminology, and laboratory experiments.'}
            </p>
          </div>
        </div>

        {/* Right Column: Dominant, Distraction-Free Preview / Canvas Area (col-span-8) */}
        <section aria-label="Lesson Plan Document Workspace" className="lg:col-span-8 xl:col-span-8 space-y-4">
          {/* Canvas View Switcher Toolbar */}
          <div className="no-print flex items-center justify-between bg-white border border-slate-200/90 px-3 py-2 rounded-xl shadow-xs">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCanvasView('plan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCanvasView === 'plan'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Cambridge Plan Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCanvasView('steam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCanvasView === 'steam'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>STEAM & Low-Cost Materials</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Template: Cambridge Lower Secondary
              </span>
              <button
                type="button"
                onClick={() => setIsCurriculumBrowserOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors font-medium"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>CDC LOs</span>
              </button>
            </div>
          </div>

          {/* Active Canvas Content */}
          {activeCanvasView === 'plan' && (
            <div className="space-y-4">
              <CambridgeTemplateView
                plan={currentPlan}
                onUpdatePlan={(updated) => setCurrentPlan(updated)}
              />
              <SteamMaterialsBadge plan={currentPlan} />
            </div>
          )}

          {activeCanvasView === 'steam' && (
            <div className="space-y-4">
              <SteamMaterialsBadge plan={currentPlan} />
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Lesson Focus & Practical Execution
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentPlan.lessonFocus}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Nepal CDC Grade 8 Curriculum Alignment
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCanvasView('plan')}
                    className="text-xs font-semibold text-slate-900 hover:underline"
                  >
                    View Official Cambridge Sheet &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* AI Curriculum Copilot Slide-Over Drawer */}
      {isAssistantDrawerOpen && (
        <div className="no-print fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsAssistantDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Curriculum AI Copilot
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Ask questions, adjust pacing, or request low-cost experiments
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssistantDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <TeacherChatPanel
                  currentPlan={currentPlan}
                  onPlanUpdated={(newPlan) => {
                    handlePlanGenerated(newPlan);
                    setIsAssistantDrawerOpen(false);
                  }}
                  onOpenSelector={() => {
                    setIsAssistantDrawerOpen(false);
                    setIsSelectorOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Selection Drawer */}
      <ChapterSelectorDrawer
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onPlanGenerated={handlePlanGenerated}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />

      {/* Curriculum Browser Modal */}
      <CurriculumBrowserModal
        isOpen={isCurriculumBrowserOpen}
        onClose={() => setIsCurriculumBrowserOpen(false)}
        onSelectUnitAndTopic={(uNum, topic) => {
          handleQuickTopicSelect(uNum, topic);
        }}
      />
    </div>
  );
}
