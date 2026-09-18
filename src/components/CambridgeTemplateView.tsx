import React, { useState } from 'react';
import { CambridgeLessonPlan } from '../types';
import { Edit3, CheckCircle2, Printer, Download } from 'lucide-react';
import { exportLessonPlanToWordDoc, cleanGrade } from '../utils/exportTemplate';

interface CambridgeTemplateViewProps {
  plan: CambridgeLessonPlan;
  onUpdatePlan?: (updated: CambridgeLessonPlan) => void;
}

export const CambridgeTemplateView: React.FC<CambridgeTemplateViewProps> = ({
  plan,
  onUpdatePlan,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<CambridgeLessonPlan>(plan);

  // Sync if prop changes externally
  React.useEffect(() => {
    setCurrentPlan(plan);
  }, [plan]);

  const handleChange = (path: string[], value: any) => {
    const updated = JSON.parse(JSON.stringify(currentPlan));
    let cursor = updated;
    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]];
    }
    cursor[path[path.length - 1]] = value;
    setCurrentPlan(updated);
    if (onUpdatePlan) {
      onUpdatePlan(updated);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-black/[0.06] overflow-hidden lesson-plan-container transition-all">
      {/* Action Toolbar on Top of Template (Hidden during print) */}
      <div className="no-print bg-[#f5f5f7]/90 backdrop-blur-md border-b border-black/[0.06] px-5 py-3 flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-2 text-[#1d1d1f] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
          <span>Cambridge Lower Secondary Lesson Plan Template</span>
          <span className="text-[#86868b] font-normal hidden sm:inline">&bull; Exact Official Format</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => exportLessonPlanToWordDoc(currentPlan)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7] shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
            title="Download Word Document formatted as Cambridge Template"
          >
            <Download className="w-3.5 h-3.5 text-[#6e6e73]" />
            <span>Export .doc</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7] shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#6e6e73]" />
            <span>Print / PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
              isEditing
                ? 'bg-[#0071e3] text-white shadow-xs active:scale-[0.98]'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7] shadow-2xs active:scale-[0.98]'
            }`}
          >
            {isEditing ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#6e6e73]" />
                <span>Edit Fields</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Template Document Body */}
      <div className="p-4 sm:p-8 md:p-10 font-sans max-w-[850px] mx-auto text-black leading-normal bg-white">
        
        {/* ================= PAGE 1 ================= */}
        <div className="cambridge-page cambridge-page-1">
          {/* Lesson Plan Header: Title & Topic */}
          <div className="mb-4 pb-3 border-b-2 border-[#9e9d42]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2 mb-2">
                    <div>
                      <label className="text-[10px] font-bold text-[#657f28] block uppercase tracking-wider">
                        Lesson Plan Title / Unit
                      </label>
                      <input
                        type="text"
                        value={currentPlan.unitTitle}
                        onChange={(e) => handleChange(['unitTitle'], e.target.value)}
                        placeholder="e.g. Unit 3: Living Beings and Their Structure"
                        className="w-full px-2.5 py-1 text-[16px] font-bold border border-[#0071e3] rounded text-[#1d1d1f] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#657f28] block uppercase tracking-wider">
                        Topic
                      </label>
                      <input
                        type="text"
                        value={currentPlan.topic}
                        onChange={(e) => handleChange(['topic'], e.target.value)}
                        placeholder="e.g. Plant and Animal Cells"
                        className="w-full px-2.5 py-1 text-[14px] font-semibold border border-[#0071e3] rounded text-[#1d1d1f] outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-[18px] sm:text-[20px] font-bold text-black tracking-tight leading-snug">
                      {currentPlan.unitTitle || `Unit ${currentPlan.unitNumber}`}
                    </h1>
                    <div className="text-[13px] sm:text-[14px] mt-1 flex flex-wrap items-baseline gap-1.5">
                      <span className="font-bold text-[#657f28] text-[11px] uppercase tracking-wider">Topic:</span>
                      <span className="font-semibold text-black">{currentPlan.topic}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-[11px] font-bold text-[#657f28] uppercase tracking-wider shrink-0 sm:pt-1">
                Cambridge Lower Secondary
              </div>
            </div>
          </div>

          {/* Table 1: Meta Information */}
          <div className="border border-[#9e9d42] mb-3 text-[13px] bg-white">
            {/* Row 1: GRADE */}
            <div className="border-b border-[#9e9d42] p-2 sm:px-3 sm:py-2 flex items-center">
              <span className="font-bold mr-2 text-[13px] shrink-0">GRADE:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={currentPlan.classGrade}
                  onChange={(e) => handleChange(['classGrade'], e.target.value)}
                  placeholder="e.g. Grade 8"
                  className="flex-1 px-2 py-0.5 border border-[#0071e3] rounded text-[13px] outline-none"
                />
              ) : (
                <span className="text-[13px]">{cleanGrade(currentPlan.classGrade)}</span>
              )}
            </div>

            {/* Row 2: Learning objectives */}
            <div className="border-b border-[#9e9d42] grid grid-cols-12">
              <div className="col-span-3 sm:col-span-3 p-2 sm:px-3 sm:py-2 border-r border-[#9e9d42] font-bold text-[13px]">
                Learning objectives
              </div>
              <div className="col-span-9 sm:col-span-9 p-2 sm:px-3 sm:py-2 space-y-1">
                <div className="text-[#657f28] italic text-[12px]">
                  Learning objective(s) from the curriculum framework
                </div>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={currentPlan.learningObjectives.join('\n')}
                    onChange={(e) => handleChange(['learningObjectives'], e.target.value.split('\n'))}
                    className="w-full p-2 border border-[#0071e3] rounded text-[13px] outline-none"
                  />
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-[13px]">
                    {currentPlan.learningObjectives.map((lo, idx) => (
                      <li key={idx}>{lo}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Row 4: Lesson focus */}
            <div className="border-b border-[#9e9d42] grid grid-cols-12">
              <div className="col-span-3 sm:col-span-3 p-2 sm:px-3 sm:py-2 border-r border-[#9e9d42] font-bold text-[13px]">
                Lesson focus
              </div>
              <div className="col-span-9 sm:col-span-9 p-2 sm:px-3 sm:py-2 space-y-1">
                <div className="text-[#657f28] italic text-[12px]">
                  Think about a specific, realistic and achievable amount of learning for the lesson.
                </div>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.lessonFocus}
                    onChange={(e) => handleChange(['lessonFocus'], e.target.value)}
                    className="w-full p-2 border border-[#0071e3] rounded text-[13px] outline-none"
                  />
                ) : (
                  <div className="text-[13px]">{currentPlan.lessonFocus}</div>
                )}
              </div>
            </div>

            {/* Row 5: Previous learning */}
            <div className="grid grid-cols-12">
              <div className="col-span-3 sm:col-span-3 p-2 sm:px-3 sm:py-2 border-r border-[#9e9d42] font-bold text-[13px]">
                Previous learning
              </div>
              <div className="col-span-9 sm:col-span-9 p-2 sm:px-3 sm:py-2 space-y-1">
                <div className="text-[#657f28] italic text-[12px]">
                  What have learners already covered or what do they need to know in order to access this lesson? How will you check their previous learning?
                </div>
                {isEditing ? (
                  <div className="space-y-1.5 pt-1">
                    <textarea
                      rows={2}
                      value={currentPlan.previousLearning.priorKnowledge}
                      onChange={(e) => handleChange(['previousLearning', 'priorKnowledge'], e.target.value)}
                      placeholder="Prior knowledge..."
                      className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                    />
                    <textarea
                      rows={2}
                      value={currentPlan.previousLearning.diagnosticCheck}
                      onChange={(e) => handleChange(['previousLearning', 'diagnosticCheck'], e.target.value)}
                      placeholder="Diagnostic check..."
                      className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                    />
                  </div>
                ) : (
                  <div className="text-[13px] space-y-1">
                    <div>{currentPlan.previousLearning.priorKnowledge}</div>
                    <div className="text-[12px] text-[#444444]">
                      <strong>Diagnostic check:</strong> {currentPlan.previousLearning.diagnosticCheck}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section Heading: Plan */}
          <div className="font-bold text-[15px] text-black mb-1.5">
            Plan
          </div>

          {/* Table 2: The Plan Table (Timing, Planned activities, Notes) */}
          <div className="border border-[#9e9d42] mb-4 text-[13px] bg-white">
            {/* Header Row */}
            <div className="border-b border-[#9e9d42] grid grid-cols-12 text-center font-bold">
              <div className="col-span-2 sm:col-span-2 p-2 border-r border-[#9e9d42] flex items-center justify-center">
                Timing
              </div>
              <div className="col-span-7 sm:col-span-7 p-2 border-r border-[#9e9d42] flex items-center justify-center">
                Planned activities
              </div>
              <div className="col-span-3 sm:col-span-3 p-2 flex items-center justify-center">
                Notes
              </div>
            </div>

            {/* Row 1: Beginning */}
            <div className="border-b border-[#9e9d42] grid grid-cols-12 align-top">
              {/* Timing */}
              <div className="col-span-2 sm:col-span-2 p-2.5 border-r border-[#9e9d42] text-center">
                <div className="font-bold text-[13px]">Beginning</div>
                <div className="text-[12px] mt-2">{currentPlan.plan.beginning.timing || '5–10 minutes'}</div>
              </div>
              {/* Planned activities */}
              <div className="col-span-7 sm:col-span-7 p-2.5 border-r border-[#9e9d42] space-y-1.5">
                <div className="text-[#657f28] italic text-[12px]">
                  At the start of the lesson, teachers can:
                </div>
                <ul className="text-[#657f28] italic text-[12px] list-disc pl-5 space-y-0.5">
                  <li>grab learners&rsquo; attention</li>
                  <li>establish the context of the lesson/learning</li>
                  <li>share objectives</li>
                  <li>set expectations.</li>
                </ul>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={currentPlan.plan.beginning.plannedActivities.join('\n')}
                    onChange={(e) =>
                      handleChange(['plan', 'beginning', 'plannedActivities'], e.target.value.split('\n'))
                    }
                    className="w-full p-2 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-[13px] text-black pt-1">
                    {currentPlan.plan.beginning.plannedActivities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Notes */}
              <div className="col-span-3 sm:col-span-3 p-2.5 space-y-1">
                <div className="text-[#657f28] italic text-[12px]">
                  Books, physical resources, web links etc.
                </div>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={currentPlan.plan.beginning.notes}
                    onChange={(e) => handleChange(['plan', 'beginning', 'notes'], e.target.value)}
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <div className="text-[12px] text-black pt-1">{currentPlan.plan.beginning.notes}</div>
                )}
              </div>
            </div>

            {/* Row 2: Main activities */}
            <div className="border-b border-[#9e9d42] grid grid-cols-12 align-top">
              {/* Timing */}
              <div className="col-span-2 sm:col-span-2 p-2.5 border-r border-[#9e9d42] text-center">
                <div className="font-bold text-[13px]">Main activities</div>
                <div className="text-[12px] mt-2">{currentPlan.plan.mainActivities.timing || '25–30 minutes'}</div>
              </div>
              {/* Planned activities */}
              <div className="col-span-7 sm:col-span-7 p-2.5 border-r border-[#9e9d42] space-y-1.5">
                <div className="text-[#657f28] italic text-[12px]">
                  For the main activities during the lesson, learners can:
                </div>
                <ul className="text-[#657f28] italic text-[12px] list-disc pl-5 space-y-0.5">
                  <li>develop skills and knowledge related to lesson focus</li>
                  <li>practise techniques</li>
                  <li>apply existing knowledge and skills</li>
                  <li>explore concepts</li>
                  <li>solve problems.</li>
                </ul>
                {isEditing ? (
                  <textarea
                    rows={6}
                    value={currentPlan.plan.mainActivities.plannedActivities.join('\n')}
                    onChange={(e) =>
                      handleChange(['plan', 'mainActivities', 'plannedActivities'], e.target.value.split('\n'))
                    }
                    className="w-full p-2 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-black pt-1">
                    {currentPlan.plan.mainActivities.plannedActivities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                )}
                <div className="text-[#657f28] italic text-[12px] pt-1.5">
                  (Include formative assessment guidance where applicable.)
                </div>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.plan.mainActivities.formativeAssessment}
                    onChange={(e) =>
                      handleChange(['plan', 'mainActivities', 'formativeAssessment'], e.target.value)
                    }
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <div className="text-[12px] text-black pl-1">
                    <strong>Formative Assessment:</strong> {currentPlan.plan.mainActivities.formativeAssessment}
                  </div>
                )}
              </div>
              {/* Notes */}
              <div className="col-span-3 sm:col-span-3 p-2.5 space-y-1">
                {isEditing ? (
                  <textarea
                    rows={6}
                    value={currentPlan.plan.mainActivities.notes}
                    onChange={(e) => handleChange(['plan', 'mainActivities', 'notes'], e.target.value)}
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <div className="text-[12px] text-black">{currentPlan.plan.mainActivities.notes}</div>
                )}
              </div>
            </div>

            {/* Row 3: End / Reflection / Summary */}
            <div className="grid grid-cols-12 align-top">
              {/* Timing */}
              <div className="col-span-2 sm:col-span-2 p-2.5 border-r border-[#9e9d42] text-center">
                <div className="font-bold text-[13px]">End</div>
                <div className="font-bold text-[13px] mt-1">Reflection</div>
                <div className="font-bold text-[13px] mt-1">Summary</div>
                <div className="text-[12px] mt-2">{currentPlan.plan.end.timing || '5–10 minutes'}</div>
              </div>
              {/* Planned activities */}
              <div className="col-span-7 sm:col-span-7 p-2.5 border-r border-[#9e9d42] space-y-1.5">
                <div className="text-[#657f28] italic text-[12px]">
                  At the end of the lesson, learners can:
                </div>
                <ul className="text-[#657f28] italic text-[12px] list-disc pl-5 space-y-0.5">
                  <li>reflect on their learning</li>
                  <li>set targets for next lesson</li>
                  <li>evaluate own and each others&rsquo; work.</li>
                </ul>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={currentPlan.plan.end.plannedActivities.join('\n')}
                    onChange={(e) =>
                      handleChange(['plan', 'end', 'plannedActivities'], e.target.value.split('\n'))
                    }
                    className="w-full p-2 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-[13px] text-black pt-1">
                    {currentPlan.plan.end.plannedActivities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Notes */}
              <div className="col-span-3 sm:col-span-3 p-2.5 space-y-1">
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={currentPlan.plan.end.notes}
                    onChange={(e) => handleChange(['plan', 'end', 'notes'], e.target.value)}
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <div className="text-[12px] text-black">{currentPlan.plan.end.notes}</div>
                )}
              </div>
            </div>
          </div>

          {/* Table 3: Reflection & Summary Evaluation (Part 1 - End of Page 1) */}
          <div className="border border-[#9e9d42] text-[13px] bg-white">
            {/* Centered Reflection Header and Guidance */}
            <div className="p-3 text-center border-b border-[#9e9d42] space-y-1">
              <div className="font-bold text-[14px] text-black">Reflection</div>
              <div className="font-bold text-[12px] text-black max-w-xl mx-auto leading-snug">
                Use the space below to reflect on your lesson. Answer the most relevant questions from the box on the left about your lesson.
              </div>
              <div className="text-[#657f28] italic text-[12px] space-y-0.5 pt-1">
                <div>Were the learning objectives/lesson focus realistic? What did the learners learn today?</div>
                <div>What was the learning atmosphere like?</div>
                <div>Did I stick to timings?</div>
                <div>What changes did I make from my plan and why?</div>
              </div>
            </div>

            {/* Reflection Content */}
            <div className="p-3 text-[13px] text-black border-b border-[#9e9d42] space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={currentPlan.reflection.learningOutcomesRealistic}
                    onChange={(e) => handleChange(['reflection', 'learningOutcomesRealistic'], e.target.value)}
                    placeholder="Objectives realistic & what learners learned..."
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                  <textarea
                    rows={2}
                    value={currentPlan.reflection.learningAtmosphere}
                    onChange={(e) => handleChange(['reflection', 'learningAtmosphere'], e.target.value)}
                    placeholder="Learning atmosphere..."
                    className="w-full p-1.5 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                </div>
              ) : (
                <>
                  <p>{currentPlan.reflection.learningOutcomesRealistic} {currentPlan.reflection.whatLearnersLearned}</p>
                  <p className="text-[12px] text-[#444444]">
                    <strong>Atmosphere & Timings:</strong> {currentPlan.reflection.learningAtmosphere} {currentPlan.reflection.timingAdherence}
                  </p>
                </>
              )}
            </div>

            {/* Summary evaluation Header & First Question */}
            <div className="p-3">
              <div className="font-bold text-[13px] text-black">Summary evaluation</div>
              <div className="font-bold text-[12px] text-black mt-1">
                What two things really went well (consider both teaching and learning)?
              </div>
            </div>
          </div>

          {/* Page 1 Bottom Footer */}
          <div className="flex justify-between items-center text-[11px] text-black mt-2">
            <span>Cambridge Lower Secondary</span>
            <span className="no-print text-[#86868b]">Page 1</span>
          </div>
        </div>

        {/* Visual Page Break Indicator (Screen only) */}
        <div className="no-print my-8 py-3 flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-[#9e9d42]/40" />
          <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider bg-[#f5f5f7] px-3 py-1 rounded-full border border-black/[0.06]">
            Page Break &bull; Page 2
          </span>
          <div className="flex-1 border-t border-dashed border-[#9e9d42]/40" />
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="cambridge-page cambridge-page-2 page-break-before">
          <div className="border border-[#9e9d42] p-4 text-[13px] space-y-4 bg-white min-h-[500px]">
            {/* 1: and 2: for Things that went well */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">1:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPlan.summaryEvaluation.wentWell[0] || ''}
                    onChange={(e) => handleChange(['summaryEvaluation', 'wentWell', '0'], e.target.value)}
                    className="flex-1 p-1 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <span className="flex-1">{currentPlan.summaryEvaluation.wentWell[0]}</span>
                )}
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">2:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPlan.summaryEvaluation.wentWell[1] || ''}
                    onChange={(e) => handleChange(['summaryEvaluation', 'wentWell', '1'], e.target.value)}
                    className="flex-1 p-1 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <span className="flex-1">{currentPlan.summaryEvaluation.wentWell[1]}</span>
                )}
              </div>
            </div>

            {/* Question 2: What two things would have improved the lesson */}
            <div className="pt-2 space-y-2">
              <div className="font-bold text-[12px] text-black">
                What two things would have improved the lesson (consider both teaching and learning)?
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">1:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPlan.summaryEvaluation.improveNextTime[0] || ''}
                    onChange={(e) => handleChange(['summaryEvaluation', 'improveNextTime', '0'], e.target.value)}
                    className="flex-1 p-1 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <span className="flex-1">{currentPlan.summaryEvaluation.improveNextTime[0]}</span>
                )}
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">2:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPlan.summaryEvaluation.improveNextTime[1] || ''}
                    onChange={(e) => handleChange(['summaryEvaluation', 'improveNextTime', '1'], e.target.value)}
                    className="flex-1 p-1 border border-[#0071e3] rounded text-[12px] outline-none"
                  />
                ) : (
                  <span className="flex-1">{currentPlan.summaryEvaluation.improveNextTime[1]}</span>
                )}
              </div>
            </div>

            {/* Question 3: What have I learned from this lesson */}
            <div className="pt-2 space-y-1.5">
              <div className="font-bold text-[12px] text-black">
                What have I learned from this lesson about the class or individuals that will inform my next lesson?
              </div>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={currentPlan.summaryEvaluation.informNextLesson || ''}
                  onChange={(e) => handleChange(['summaryEvaluation', 'informNextLesson'], e.target.value)}
                  className="w-full p-2 border border-[#0071e3] rounded text-[12px] outline-none"
                />
              ) : (
                <div className="text-[13px] text-black pt-1">
                  {currentPlan.summaryEvaluation.informNextLesson}
                </div>
              )}
            </div>

            {/* Divider line before Next Steps */}
            <div className="pt-4 border-t border-[#9e9d42] space-y-1.5">
              <div className="font-bold text-[13px] text-black">Next steps</div>
              <div className="font-bold text-[12px] text-black">
                What will I teach next based on learners&rsquo; understanding of this lesson?
              </div>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={currentPlan.nextSteps || ''}
                  onChange={(e) => handleChange(['nextSteps'], e.target.value)}
                  className="w-full p-2 border border-[#0071e3] rounded text-[12px] outline-none"
                />
              ) : (
                <div className="text-[13px] text-black pt-1">
                  {currentPlan.nextSteps}
                </div>
              )}
            </div>
          </div>

          {/* Page 2 Bottom Footer */}
          <div className="flex justify-between items-center text-[11px] text-black mt-2">
            <span>Cambridge Lower Secondary</span>
            <span className="no-print text-[#86868b]">Page 2</span>
          </div>
        </div>

      </div>
    </div>
  );
};

