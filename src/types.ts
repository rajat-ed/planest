/**
 * Types for the Grade 8 STEAM Curriculum and Lesson Plan Generator
 * strictly adopting the Cambridge Lower Secondary Lesson Plan Template
 * and aligned with Nepal CDC Grade 8 Science and Technology Curriculum.
 */

export interface LearningOutcome {
  id: string; // e.g. "1.1", "4.1", "10.2"
  theme: string;
  topic: string;
  text: string;
}

export interface TextbookActivity {
  id: string; // e.g. "Activity 3.2"
  title: string;
  objective: string;
  materialsRequired: string[];
  localLowCostAlternatives: string[];
  methodSummary: string;
  safetyPrecautions?: string;
  pageNumber: number;
}

export interface CurriculumUnit {
  unitNumber: number;
  title: string;
  theme: string;
  pageRange: string;
  summary: string;
  topics: string[];
  learningOutcomes: LearningOutcome[];
  textbookActivities: TextbookActivity[];
  keyGlossary: { term: string; definition: string }[];
}

export interface CambridgeLessonPlan {
  id: string;
  classGrade: string;
  date: string;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  durationMinutes: number;
  learningObjectives: string[]; // Aligned directly to official LOs
  lessonFocus: string; // Specific, realistic, achievable
  previousLearning: {
    priorKnowledge: string;
    diagnosticCheck: string;
  };
  plan: {
    beginning: {
      timing: string;
      plannedActivities: string[];
      notes: string;
    };
    mainActivities: {
      timing: string;
      plannedActivities: string[];
      formativeAssessment: string;
      notes: string;
    };
    end: {
      timing: string;
      plannedActivities: string[];
      notes: string;
    };
  };
  reflection: {
    learningOutcomesRealistic: string;
    whatLearnersLearned: string;
    learningAtmosphere: string;
    timingAdherence: string;
    changesMadeAndWhy: string;
  };
  summaryEvaluation: {
    wentWell: [string, string];
    improveNextTime: [string, string];
    informNextLesson: string;
  };
  nextSteps: string;
  steamConnections?: {
    science: string;
    technology: string;
    engineering: string;
    arts: string;
    math: string;
  };
  textbookReference?: {
    pageRange: string;
    activities: string[];
    localLowCostMaterials: string[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  lessonPlan?: CambridgeLessonPlan;
  suggestedPrompts?: string[];
}
