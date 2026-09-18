import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  FlaskConical,
  Target,
  CheckCircle2,
  Atom,
} from 'lucide-react';

interface GenerationAnimationOverlayProps {
  unitNumber?: number;
  topic?: string;
}

const GENERATION_STAGES = [
  {
    icon: Target,
    label: 'Curriculum Grounding',
    detail: 'Extracting Nepal CDC Grade 8 learning outcomes & competencies...',
  },
  {
    icon: BookOpen,
    label: 'Cambridge Formatting',
    detail: 'Structuring Beginning, Main Activities & Reflection timelines...',
  },
  {
    icon: FlaskConical,
    label: 'STEAM & Local Resources',
    detail: 'Integrating zero-cost, locally available household apparatus...',
  },
  {
    icon: Atom,
    label: 'Pedagogical Calibration',
    detail: 'Formulating diagnostic checkpoints & formative assessment points...',
  },
];

export const GenerationAnimationOverlay: React.FC<GenerationAnimationOverlayProps> = ({
  unitNumber,
  topic,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIdx((prev) => (prev + 1) % GENERATION_STAGES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const activeStage = GENERATION_STAGES[currentStageIdx];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_20px_rgba(0,0,0,0.04)] border border-black/[0.06] p-6 sm:p-10 min-h-[580px] flex flex-col justify-between">
      {/* Background Animated Cambridge Skeleton */}
      <div className="absolute inset-0 p-6 sm:p-10 pointer-events-none opacity-20 select-none overflow-hidden">
        {/* Skeleton Header */}
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-3 animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-6 animate-pulse" />

        {/* Skeleton Cambridge Table */}
        <div className="border border-[#9e9d42]/40 rounded-sm overflow-hidden mb-6">
          <div className="h-10 border-b border-[#9e9d42]/30 bg-gray-100/50 flex items-center px-4">
            <div className="h-3 w-24 bg-gray-300 rounded" />
          </div>
          <div className="h-16 border-b border-[#9e9d42]/30 bg-white p-3 space-y-2">
            <div className="h-2.5 w-full bg-gray-200 rounded" />
            <div className="h-2.5 w-4/5 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-12 h-36">
            <div className="col-span-3 border-r border-[#9e9d42]/30 p-3 bg-gray-50/50 space-y-2">
              <div className="h-3 w-16 bg-gray-300 rounded" />
              <div className="h-2 w-12 bg-gray-200 rounded" />
            </div>
            <div className="col-span-6 border-r border-[#9e9d42]/30 p-3 space-y-2">
              <div className="h-2.5 w-full bg-gray-200 rounded" />
              <div className="h-2.5 w-11/12 bg-gray-200 rounded" />
              <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
            </div>
            <div className="col-span-3 p-3 bg-gray-50/50 space-y-2">
              <div className="h-2.5 w-full bg-gray-200 rounded" />
              <div className="h-2.5 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Skeleton Reflection */}
        <div className="h-28 border border-[#9e9d42]/30 p-4 space-y-2">
          <div className="h-3 w-32 bg-gray-300 rounded" />
          <div className="h-2.5 w-full bg-gray-200 rounded" />
          <div className="h-2.5 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Shimmer Light Beam Sweep */}
      <motion.div
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#0071e3]/[0.06] to-transparent pointer-events-none transform -skew-x-12"
        initial={{ left: '-25%' }}
        animate={{ left: '125%' }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: 'easeInOut',
        }}
      />

      {/* Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0071e3]" />
          </span>
          <span className="text-[12px] font-semibold text-[#1d1d1f] tracking-wide">
            GENERATING LESSON PLAN
          </span>
        </div>
        <div className="text-[11px] font-medium text-[#657f28] bg-[#657f28]/10 px-2.5 py-1 rounded-full border border-[#657f28]/20">
          Cambridge Lower Secondary Template
        </div>
      </div>

      {/* Center Interactive Aesthetic Stage Card */}
      <div className="relative z-10 max-w-lg mx-auto w-full py-8 text-center flex flex-col items-center">
        {/* Pulsing Concentric Visual Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-[#0071e3]/10"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-18 h-18 rounded-full bg-[#657f28]/15"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
          <div className="relative w-14 h-14 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,113,227,0.18)] border border-black/[0.08] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.label}
                initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 15 }}
                transition={{ duration: 0.35 }}
              >
                <ActiveIcon className="w-7 h-7 text-[#0071e3]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Topic Context */}
        <div className="mb-4">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#86868b] block mb-1">
            {unitNumber ? `Unit ${unitNumber} Science & Technology` : 'Curriculum Focus'}
          </span>
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] tracking-tight max-w-md mx-auto line-clamp-2">
            {topic || 'Formulating Comprehensive Lesson Plan'}
          </h2>
        </div>

        {/* Dynamic Stage Switcher */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <div className="text-[13px] font-semibold text-[#0071e3] flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeStage.label}</span>
              </div>
              <p className="text-[12px] text-[#6e6e73] max-w-sm mx-auto leading-normal">
                {activeStage.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Continuous Aesthetic Progress Track */}
        <div className="w-full max-w-xs mt-4">
          <div className="h-1.5 w-full bg-[#f5f5f7] rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-[#0071e3] to-[#34c759] rounded-full"
              initial={{ left: '0%', width: '15%' }}
              animate={{
                left: ['0%', '70%', '0%'],
                width: ['25%', '45%', '25%'],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          {/* Step Pill Indicators */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {GENERATION_STAGES.map((s, idx) => (
              <div
                key={s.label}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStageIdx
                    ? 'w-6 bg-[#0071e3]'
                    : 'w-1.5 bg-black/[0.12]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Meta Guarantee */}
      <div className="relative z-10 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#86868b]">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759]" />
          <span>Validating Cambridge 3-section layout requirements</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Zero-budget household materials prioritized</span>
        </div>
      </div>
    </div>
  );
};
