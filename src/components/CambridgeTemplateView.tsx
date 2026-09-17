import React, { useState } from 'react';
import { CambridgeLessonPlan } from '../types';
import { Edit3, CheckCircle2, BookOpen, Clock, Target, Lightbulb, Compass, FlaskConical } from 'lucide-react';

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

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden lesson-plan-container">
      {/* Action Toolbar on Top of Template (Hidden during print) */}
      <div className="no-print bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Cambridge Lower Secondary Lesson Plan Template</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-normal">Aligned with Nepal CDC Grade 8</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border transition-all ${
              isEditing
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isEditing ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Editing Active (Done)</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Quick Edit Fields</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Template Paper Document */}
      <div className="p-4 sm:p-8 font-sans max-w-4xl mx-auto text-slate-900 leading-normal">
        {/* Template Header Badge */}
        <div className="border-b-2 border-slate-800 pb-3 mb-6">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif">
              CAMBRIDGE LOWER SECONDARY LESSON PLAN
            </h2>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Official Template Format
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Subject: Science & Technology | Theme: {plan.unitTitle}
          </p>
        </div>

        {/* Top Info Grid */}
        <div className="border border-slate-400 divide-y divide-slate-300 text-sm mb-6 rounded-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 bg-slate-50/70">
            <div className="p-3 flex items-center gap-3">
              <span className="font-bold text-slate-800 min-w-24 uppercase text-xs tracking-wider">
                CLASS:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={currentPlan.classGrade}
                  onChange={(e) => handleChange(['classGrade'], e.target.value)}
                  className="flex-1 px-2 py-1 border border-blue-400 rounded bg-white text-sm"
                />
              ) : (
                <span className="font-semibold text-slate-900">{currentPlan.classGrade}</span>
              )}
            </div>
            <div className="p-3 flex items-center gap-3">
              <span className="font-bold text-slate-800 min-w-24 uppercase text-xs tracking-wider">
                DATE:
              </span>
              {isEditing ? (
                <input
                  type="date"
                  value={currentPlan.date}
                  onChange={(e) => handleChange(['date'], e.target.value)}
                  className="flex-1 px-2 py-1 border border-blue-400 rounded bg-white text-sm"
                />
              ) : (
                <span className="font-semibold text-slate-900">{currentPlan.date}</span>
              )}
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="p-3 bg-white">
            <div className="font-bold text-slate-800 mb-1.5 uppercase text-xs tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Learning objectives</span>
              <span className="text-slate-400 font-normal italic lowercase">(Learning objective(s) from the curriculum framework)</span>
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={currentPlan.learningObjectives.join('\n')}
                onChange={(e) => handleChange(['learningObjectives'], e.target.value.split('\n'))}
                className="w-full px-2 py-1.5 border border-blue-400 rounded bg-white text-sm"
              />
            ) : (
              <ul className="space-y-1.5 list-disc pl-5 text-slate-800">
                {currentPlan.learningObjectives.map((lo, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="font-medium text-blue-900">{lo}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Lesson Focus */}
          <div className="p-3 bg-slate-50/40">
            <div className="font-bold text-slate-800 mb-1 uppercase text-xs tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lesson focus</span>
              <span className="text-slate-400 font-normal italic lowercase">(Specific, realistic and achievable amount of learning)</span>
            </div>
            {isEditing ? (
              <textarea
                rows={2}
                value={currentPlan.lessonFocus}
                onChange={(e) => handleChange(['lessonFocus'], e.target.value)}
                className="w-full px-2 py-1.5 border border-blue-400 rounded bg-white text-sm"
              />
            ) : (
              <p className="text-slate-800 italic">{currentPlan.lessonFocus}</p>
            )}
          </div>

          {/* Previous Learning */}
          <div className="p-3 bg-white">
            <div className="font-bold text-slate-800 mb-1.5 uppercase text-xs tracking-wider">
              Previous learning
            </div>
            <p className="text-xs text-slate-500 italic mb-2">
              What have learners already covered or what do they need to know in order to access this lesson? How will you check their previous learning?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-700 block text-xs uppercase mb-1">
                  Prior Knowledge:
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.previousLearning.priorKnowledge}
                    onChange={(e) => handleChange(['previousLearning', 'priorKnowledge'], e.target.value)}
                    className="w-full p-1 border border-blue-400 rounded text-xs"
                  />
                ) : (
                  <p className="text-slate-800">{currentPlan.previousLearning.priorKnowledge}</p>
                )}
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-700 block text-xs uppercase mb-1">
                  Diagnostic Check Method:
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.previousLearning.diagnosticCheck}
                    onChange={(e) => handleChange(['previousLearning', 'diagnosticCheck'], e.target.value)}
                    className="w-full p-1 border border-blue-400 rounded text-xs"
                  />
                ) : (
                  <p className="text-slate-800">{currentPlan.previousLearning.diagnosticCheck}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Table (The Heart of the Cambridge Framework) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Plan (Activities & Timings)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Total: {currentPlan.durationMinutes} minutes
            </span>
          </div>

          <div className="border border-slate-400 rounded-xs overflow-hidden">
            <table className="w-full border-collapse template-table text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-400 text-left">
                  <th className="p-3 font-bold text-slate-800 w-2/12 border-r border-slate-400 text-xs uppercase tracking-wider">
                    Timing
                  </th>
                  <th className="p-3 font-bold text-slate-800 w-7/12 border-r border-slate-400 text-xs uppercase tracking-wider">
                    Planned activities
                  </th>
                  <th className="p-3 font-bold text-slate-800 w-3/12 text-xs uppercase tracking-wider">
                    Notes
                    <span className="block font-normal lowercase text-[10px] text-slate-500">
                      (Books, physical resources, web links etc.)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {/* Beginning */}
                <tr className="align-top">
                  <td className="p-3 border-r border-slate-300 bg-slate-50/50">
                    <div className="font-bold text-slate-900">Beginning</div>
                    <div className="text-xs text-blue-700 font-semibold mt-1">
                      {currentPlan.plan.beginning.timing}
                    </div>
                  </td>
                  <td className="p-3 border-r border-slate-300">
                    <div className="text-[11px] text-slate-500 mb-2 italic">
                      At the start of the lesson, teachers can: grab learners' attention • establish the context of the lesson/learning • share objectives • set expectations.
                    </div>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={currentPlan.plan.beginning.plannedActivities.join('\n')}
                        onChange={(e) =>
                          handleChange(['plan', 'beginning', 'plannedActivities'], e.target.value.split('\n'))
                        }
                        className="w-full p-1.5 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
                        {currentPlan.plan.beginning.plannedActivities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="p-3 text-xs text-slate-700 bg-slate-50/30">
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={currentPlan.plan.beginning.notes}
                        onChange={(e) => handleChange(['plan', 'beginning', 'notes'], e.target.value)}
                        className="w-full p-1 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <p>{currentPlan.plan.beginning.notes}</p>
                    )}
                  </td>
                </tr>

                {/* Main Activities */}
                <tr className="align-top bg-white">
                  <td className="p-3 border-r border-slate-300 bg-slate-50/50">
                    <div className="font-bold text-slate-900">Main activities</div>
                    <div className="text-xs text-blue-700 font-semibold mt-1">
                      {currentPlan.plan.mainActivities.timing}
                    </div>
                    <div className="mt-4 no-print">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <FlaskConical className="w-3 h-3" /> Hands-On Lab
                      </span>
                    </div>
                  </td>
                  <td className="p-3 border-r border-slate-300">
                    <div className="text-[11px] text-slate-500 mb-2 italic">
                      For the main activities during the lesson, learners can: develop skills and knowledge related to lesson focus • practise techniques • apply existing knowledge and skills • explore concepts • solve problems.
                    </div>
                    {isEditing ? (
                      <textarea
                        rows={6}
                        value={currentPlan.plan.mainActivities.plannedActivities.join('\n')}
                        onChange={(e) =>
                          handleChange(['plan', 'mainActivities', 'plannedActivities'], e.target.value.split('\n'))
                        }
                        className="w-full p-1.5 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <ul className="list-disc pl-5 space-y-2 text-slate-800">
                        {currentPlan.plan.mainActivities.plannedActivities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    )}

                    {/* Formative Assessment Guidance */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-200 bg-blue-50/60 p-2.5 rounded border border-blue-100">
                      <span className="font-bold text-blue-900 text-xs uppercase block mb-1">
                        Formative assessment guidance:
                      </span>
                      {isEditing ? (
                        <textarea
                          rows={2}
                          value={currentPlan.plan.mainActivities.formativeAssessment}
                          onChange={(e) =>
                            handleChange(['plan', 'mainActivities', 'formativeAssessment'], e.target.value)
                          }
                          className="w-full p-1 border border-blue-400 rounded text-xs bg-white"
                        />
                      ) : (
                        <p className="text-xs text-slate-800">
                          {currentPlan.plan.mainActivities.formativeAssessment}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-xs text-slate-700 bg-slate-50/30">
                    {isEditing ? (
                      <textarea
                        rows={6}
                        value={currentPlan.plan.mainActivities.notes}
                        onChange={(e) => handleChange(['plan', 'mainActivities', 'notes'], e.target.value)}
                        className="w-full p-1 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <p>{currentPlan.plan.mainActivities.notes}</p>
                    )}
                  </td>
                </tr>

                {/* End / Reflection / Summary */}
                <tr className="align-top">
                  <td className="p-3 border-r border-slate-300 bg-slate-50/50">
                    <div className="font-bold text-slate-900">End</div>
                    <div className="text-xs text-slate-600 font-medium">Reflection / Summary</div>
                    <div className="text-xs text-blue-700 font-semibold mt-1">
                      {currentPlan.plan.end.timing}
                    </div>
                  </td>
                  <td className="p-3 border-r border-slate-300">
                    <div className="text-[11px] text-slate-500 mb-2 italic">
                      At the end of the lesson, learners can: reflect on their learning • set targets for next lesson • evaluate own and each others' work.
                    </div>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={currentPlan.plan.end.plannedActivities.join('\n')}
                        onChange={(e) =>
                          handleChange(['plan', 'end', 'plannedActivities'], e.target.value.split('\n'))
                        }
                        className="w-full p-1.5 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
                        {currentPlan.plan.end.plannedActivities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="p-3 text-xs text-slate-700 bg-slate-50/30">
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={currentPlan.plan.end.notes}
                        onChange={(e) => handleChange(['plan', 'end', 'notes'], e.target.value)}
                        className="w-full p-1 border border-blue-400 rounded text-xs"
                      />
                    ) : (
                      <p>{currentPlan.plan.end.notes}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reflection Section (Official Template Box) */}
        <div className="border border-slate-400 rounded-xs mb-6 overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 border-b border-slate-400">
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
              Reflection
            </h4>
            <p className="text-[11px] text-slate-600 italic">
              Use the space below to reflect on your lesson. Answer the most relevant questions from the box below about your lesson.
            </p>
          </div>

          <div className="p-4 bg-white space-y-3 text-sm">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-semibold text-slate-800 text-xs block mb-1">
                Were the learning objectives/lesson focus realistic? What did the learners learn today?
              </span>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={currentPlan.reflection.learningOutcomesRealistic}
                  onChange={(e) =>
                    handleChange(['reflection', 'learningOutcomesRealistic'], e.target.value)
                  }
                  className="w-full p-1.5 border border-blue-400 rounded text-xs bg-white"
                />
              ) : (
                <p className="text-slate-800 text-xs">
                  {currentPlan.reflection.learningOutcomesRealistic} {currentPlan.reflection.whatLearnersLearned}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">
                  What was the learning atmosphere like?
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.reflection.learningAtmosphere}
                    onChange={(e) =>
                      handleChange(['reflection', 'learningAtmosphere'], e.target.value)
                    }
                    className="w-full p-1 border border-blue-400 rounded text-xs bg-white"
                  />
                ) : (
                  <p className="text-slate-700">{currentPlan.reflection.learningAtmosphere}</p>
                )}
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">
                  Did I stick to timings?
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.reflection.timingAdherence}
                    onChange={(e) => handleChange(['reflection', 'timingAdherence'], e.target.value)}
                    className="w-full p-1 border border-blue-400 rounded text-xs bg-white"
                  />
                ) : (
                  <p className="text-slate-700">{currentPlan.reflection.timingAdherence}</p>
                )}
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">
                  What changes did I make from my plan and why?
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={currentPlan.reflection.changesMadeAndWhy}
                    onChange={(e) => handleChange(['reflection', 'changesMadeAndWhy'], e.target.value)}
                    className="w-full p-1 border border-blue-400 rounded text-xs bg-white"
                  />
                ) : (
                  <p className="text-slate-700">{currentPlan.reflection.changesMadeAndWhy}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Evaluation (Page 2 of Template) */}
        <div className="border border-slate-400 rounded-xs mb-6 overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 border-b border-slate-400">
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
              Summary evaluation
            </h4>
          </div>

          <div className="p-4 bg-white space-y-4 text-sm">
            <div>
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1.5">
                What two things really went well (consider both teaching and learning)?
              </span>
              <div className="space-y-1.5 pl-2 text-xs text-slate-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">1:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentPlan.summaryEvaluation.wentWell[0]}
                      onChange={(e) =>
                        handleChange(['summaryEvaluation', 'wentWell', '0'], e.target.value)
                      }
                      className="flex-1 p-1 border border-blue-400 rounded text-xs"
                    />
                  ) : (
                    <p className="flex-1">{currentPlan.summaryEvaluation.wentWell[0]}</p>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">2:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentPlan.summaryEvaluation.wentWell[1]}
                      onChange={(e) =>
                        handleChange(['summaryEvaluation', 'wentWell', '1'], e.target.value)
                      }
                      className="flex-1 p-1 border border-blue-400 rounded text-xs"
                    />
                  ) : (
                    <p className="flex-1">{currentPlan.summaryEvaluation.wentWell[1]}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1.5">
                What two things would have improved the lesson (consider both teaching and learning)?
              </span>
              <div className="space-y-1.5 pl-2 text-xs text-slate-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">1:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentPlan.summaryEvaluation.improveNextTime[0]}
                      onChange={(e) =>
                        handleChange(['summaryEvaluation', 'improveNextTime', '0'], e.target.value)
                      }
                      className="flex-1 p-1 border border-blue-400 rounded text-xs"
                    />
                  ) : (
                    <p className="flex-1">{currentPlan.summaryEvaluation.improveNextTime[0]}</p>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">2:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentPlan.summaryEvaluation.improveNextTime[1]}
                      onChange={(e) =>
                        handleChange(['summaryEvaluation', 'improveNextTime', '1'], e.target.value)
                      }
                      className="flex-1 p-1 border border-blue-400 rounded text-xs"
                    />
                  ) : (
                    <p className="flex-1">{currentPlan.summaryEvaluation.improveNextTime[1]}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-1">
                What have I learned from this lesson about the class or individuals that will inform my next lesson?
              </span>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={currentPlan.summaryEvaluation.informNextLesson}
                  onChange={(e) =>
                    handleChange(['summaryEvaluation', 'informNextLesson'], e.target.value)
                  }
                  className="w-full p-1.5 border border-blue-400 rounded text-xs bg-white"
                />
              ) : (
                <p className="text-xs text-slate-800 italic">
                  {currentPlan.summaryEvaluation.informNextLesson}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps (Official Template Bottom Section) */}
        <div className="border border-slate-400 rounded-xs overflow-hidden mb-6">
          <div className="bg-slate-100 px-3 py-2 border-b border-slate-400">
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
              Next steps
            </h4>
            <p className="text-[11px] text-slate-600 italic">
              What will I teach next based on learners' understanding of this lesson?
            </p>
          </div>
          <div className="p-3 bg-white">
            {isEditing ? (
              <textarea
                rows={2}
                value={currentPlan.nextSteps}
                onChange={(e) => handleChange(['nextSteps'], e.target.value)}
                className="w-full p-1.5 border border-blue-400 rounded text-xs"
              />
            ) : (
              <p className="text-xs sm:text-sm font-medium text-slate-900">
                {currentPlan.nextSteps}
              </p>
            )}
          </div>
        </div>

        {/* STEAM & Textbook Context Footer Info */}
        <div className="mt-8 pt-4 border-t border-dashed border-slate-300 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span>Reference: Science & Technology Grade 8 (CDC Nepal, 2023)</span>
            {currentPlan.textbookReference && (
              <span className="ml-1 text-slate-700 font-medium">
                • {currentPlan.textbookReference.pageRange}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-blue-800 font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Low-Resource STEAM Pedagogical Model</span>
          </div>
        </div>
      </div>
    </div>
  );
};
