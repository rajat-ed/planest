import { CambridgeLessonPlan } from '../types';

export const cleanGrade = (grade?: string): string => {
  if (!grade) return 'Grade 8';
  return grade
    .replace(/\s*\([^)]*section[^)]*\)/gi, '')
    .replace(/\s*section\s+[a-z0-9&,\s]+/gi, '')
    .replace(/\s*[-/]\s*[a-z]\b/gi, '')
    .trim() || 'Grade 8';
};

export const generateCambridgeTemplateHTML = (lessonPlan: CambridgeLessonPlan): string => {
  const gradeDisplay = cleanGrade(lessonPlan.classGrade);

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Cambridge Lower Secondary Lesson Plan - ${lessonPlan.topic}</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #000000;
      margin: 15mm 20mm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    td, th {
      border: 1px solid #9e9d42;
      padding: 6px 10px;
      vertical-align: top;
      font-size: 9.5pt;
    }
    .guide-text {
      color: #657f28;
      font-style: italic;
      font-size: 9pt;
      margin-bottom: 4px;
    }
    .bold {
      font-weight: bold;
    }
    .center {
      text-align: center;
    }
    .plan-heading {
      font-weight: bold;
      font-size: 11pt;
      margin-top: 14px;
      margin-bottom: 4px;
    }
    .footer-text {
      font-size: 8.5pt;
      color: #333333;
      margin-top: 6px;
    }
    @page {
      size: A4 portrait;
      margin: 15mm 20mm;
    }
    .page-break {
      page-break-before: always;
      mso-break-type: page-break;
    }
  </style>
</head>
<body>
  <!-- PAGE 1 -->
  <!-- Lesson Plan Header: Title and Topic -->
  <div style="margin-bottom: 14px; border-bottom: 2px solid #9e9d42; padding-bottom: 6px;">
    <table style="width: 100%; border: none; margin-bottom: 0;">
      <tr>
        <td style="border: none; padding: 0;">
          <h1 style="margin: 0 0 4px 0; font-size: 14pt; font-weight: bold; color: #000000; text-transform: uppercase;">
            ${lessonPlan.unitTitle || `Unit ${lessonPlan.unitNumber}`}
          </h1>
          <div style="font-size: 10.5pt; font-weight: bold; color: #48631b;">
            <span style="color: #657f28; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px;">Topic:</span>
            <span style="color: #000000; font-weight: normal;"> ${lessonPlan.topic}</span>
          </div>
        </td>
        <td style="border: none; padding: 0; text-align: right; vertical-align: top; width: 35%;">
          <span style="font-size: 8.5pt; font-weight: bold; color: #657f28; text-transform: uppercase;">
            Cambridge Lower Secondary
          </span>
        </td>
      </tr>
    </table>
  </div>

  <!-- Table 1: Meta Information -->
  <table>
    <tr>
      <td colspan="2" style="border: 1px solid #9e9d42;">
        <span class="bold">GRADE:</span> &nbsp; ${gradeDisplay}
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #9e9d42; width: 25%;">Learning objectives</td>
      <td style="border: 1px solid #9e9d42; width: 75%;">
        <div class="guide-text">Learning objective(s) from the curriculum framework</div>
        <ul style="margin: 4px 0 0 18px; padding: 0;">
          ${lessonPlan.learningObjectives.map((lo) => `<li>${lo}</li>`).join('')}
        </ul>
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #9e9d42;">Lesson focus</td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">Think about a specific, realistic and achievable amount of learning for the lesson.</div>
        <div>${lessonPlan.lessonFocus}</div>
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #9e9d42;">Previous learning</td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">What have learners already covered or what do they need to know in order to access this lesson? How will you check their previous learning?</div>
        <div>${lessonPlan.previousLearning.priorKnowledge}</div>
        <div style="margin-top: 4px;"><strong>Diagnostic check:</strong> ${lessonPlan.previousLearning.diagnosticCheck}</div>
      </td>
    </tr>
  </table>

  <!-- Section: Plan -->
  <div class="plan-heading">Plan</div>

  <!-- Table 2: The Plan Table -->
  <table>
    <tr>
      <th style="width: 18%; text-align: center; font-weight: bold; border: 1px solid #9e9d42;">Timing</th>
      <th style="width: 54%; text-align: center; font-weight: bold; border: 1px solid #9e9d42;">Planned activities</th>
      <th style="width: 28%; text-align: center; font-weight: bold; border: 1px solid #9e9d42;">Notes</th>
    </tr>
    <tr>
      <td style="text-align: center; border: 1px solid #9e9d42;">
        <div class="bold">Beginning</div>
        <div style="margin-top: 6px;">${lessonPlan.plan.beginning.timing || '5–10 minutes'}</div>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">At the start of the lesson, teachers can:</div>
        <ul class="guide-text" style="margin: 2px 0 6px 18px; padding: 0;">
          <li>grab learners' attention</li>
          <li>establish the context of the lesson/learning</li>
          <li>share objectives</li>
          <li>set expectations.</li>
        </ul>
        <ul style="margin: 4px 0 0 18px; padding: 0;">
          ${lessonPlan.plan.beginning.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
        </ul>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">Books, physical resources, web links etc.</div>
        <div>${lessonPlan.plan.beginning.notes}</div>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; border: 1px solid #9e9d42;">
        <div class="bold">Main activities</div>
        <div style="margin-top: 6px;">${lessonPlan.plan.mainActivities.timing || '25–30 minutes'}</div>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">For the main activities during the lesson, learners can:</div>
        <ul class="guide-text" style="margin: 2px 0 6px 18px; padding: 0;">
          <li>develop skills and knowledge related to lesson focus</li>
          <li>practise techniques</li>
          <li>apply existing knowledge and skills</li>
          <li>explore concepts</li>
          <li>solve problems.</li>
        </ul>
        <ul style="margin: 4px 0 0 18px; padding: 0;">
          ${lessonPlan.plan.mainActivities.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
        </ul>
        <div class="guide-text" style="margin-top: 8px;">(Include formative assessment guidance where applicable.)</div>
        <div><strong>Formative assessment:</strong> ${lessonPlan.plan.mainActivities.formativeAssessment}</div>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div>${lessonPlan.plan.mainActivities.notes}</div>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; border: 1px solid #9e9d42;">
        <div class="bold">End</div>
        <div class="bold" style="margin-top: 2px;">Reflection</div>
        <div class="bold" style="margin-top: 2px;">Summary</div>
        <div style="margin-top: 6px;">${lessonPlan.plan.end.timing || '5–10 minutes'}</div>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div class="guide-text">At the end of the lesson, learners can:</div>
        <ul class="guide-text" style="margin: 2px 0 6px 18px; padding: 0;">
          <li>reflect on their learning</li>
          <li>set targets for next lesson</li>
          <li>evaluate own and each others' work.</li>
        </ul>
        <ul style="margin: 4px 0 0 18px; padding: 0;">
          ${lessonPlan.plan.end.plannedActivities.map((act) => `<li>${act}</li>`).join('')}
        </ul>
      </td>
      <td style="border: 1px solid #9e9d42;">
        <div>${lessonPlan.plan.end.notes}</div>
      </td>
    </tr>
  </table>

  <!-- Table 3: Reflection & Summary Evaluation (Page 1) -->
  <table>
    <tr>
      <td style="border: 1px solid #9e9d42; text-align: center;">
        <div style="font-weight: bold; font-size: 11pt;">Reflection</div>
        <div style="font-weight: bold; font-size: 9.5pt; margin-top: 2px;">Use the space below to reflect on your lesson. Answer the most relevant questions from the box on the left about your lesson.</div>
        <div class="guide-text" style="margin-top: 4px;">
          Were the learning objectives/lesson focus realistic? What did the learners learn today?<br>
          What was the learning atmosphere like?<br>
          Did I stick to timings?<br>
          What changes did I make from my plan and why?
        </div>
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #9e9d42;">
        <p style="margin: 4px 0;">${lessonPlan.reflection.learningOutcomesRealistic} ${lessonPlan.reflection.whatLearnersLearned}</p>
        <p style="margin: 4px 0;"><strong>Atmosphere & Timings:</strong> ${lessonPlan.reflection.learningAtmosphere} ${lessonPlan.reflection.timingAdherence}</p>
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid #9e9d42;">
        <div style="font-weight: bold; font-size: 10pt;">Summary evaluation</div>
        <div style="font-weight: bold; font-size: 9.5pt; margin-top: 2px;">What two things really went well (consider both teaching and learning)?</div>
      </td>
    </tr>
  </table>

  <div class="footer-text">Cambridge Lower Secondary</div>

  <!-- PAGE 2 BREAK -->
  <div class="page-break" style="page-break-before: always; mso-break-type: page-break;"></div>

  <!-- PAGE 2 -->
  <table style="margin-top: 10px;">
    <tr>
      <td style="border: 1px solid #9e9d42; padding: 12px;">
        <div style="margin-bottom: 6px;"><strong>1:</strong> ${lessonPlan.summaryEvaluation.wentWell[0]}</div>
        <div style="margin-bottom: 14px;"><strong>2:</strong> ${lessonPlan.summaryEvaluation.wentWell[1]}</div>

        <div style="font-weight: bold; margin-bottom: 6px;">What two things would have improved the lesson (consider both teaching and learning)?</div>
        <div style="margin-bottom: 6px;"><strong>1:</strong> ${lessonPlan.summaryEvaluation.improveNextTime[0]}</div>
        <div style="margin-bottom: 14px;"><strong>2:</strong> ${lessonPlan.summaryEvaluation.improveNextTime[1]}</div>

        <div style="font-weight: bold; margin-bottom: 4px;">What have I learned from this lesson about the class or individuals that will inform my next lesson?</div>
        <div style="margin-bottom: 16px;">${lessonPlan.summaryEvaluation.informNextLesson}</div>

        <div style="border-top: 1px solid #9e9d42; padding-top: 12px;">
          <div style="font-weight: bold; font-size: 10.5pt;">Next steps</div>
          <div style="font-weight: bold; margin-bottom: 4px;">What will I teach next based on learners' understanding of this lesson?</div>
          <div>${lessonPlan.nextSteps}</div>
        </div>
      </td>
    </tr>
  </table>

  <div class="footer-text">Cambridge Lower Secondary</div>
</body>
</html>`;
};

export const exportLessonPlanToWordDoc = (lessonPlan: CambridgeLessonPlan) => {
  const htmlContent = generateCambridgeTemplateHTML(lessonPlan);
  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Cambridge_Lesson_Plan_Unit${lessonPlan.unitNumber}_${lessonPlan.topic.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
