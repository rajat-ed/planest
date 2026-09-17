import { CambridgeLessonPlan } from '../types';

export const DEFAULT_GRADE_8_LESSON_PLAN: CambridgeLessonPlan = {
  id: 'plan-default-unit3-cells',
  classGrade: 'Grade 8 (Section A & B)',
  date: new Date().toISOString().split('T')[0],
  unitNumber: 3,
  unitTitle: 'Unit 3: Living Beings and Their Structure',
  topic: 'Plant and Animal Cells: Structure, Organelles & Comparative Microscopic Observation',
  durationMinutes: 45,
  learningObjectives: [
    '[LO 4.1] To describe the functions of the components of animal cells and plant cells',
    '[LO 4.2] To distinguish the similarities and differences between plant cells and animal cells',
    '[LO 4.3] To explain the interrelationship of cells, tissues and organs in the human body'
  ],
  lessonFocus: 'Observe temporary wet mounts of onion epidermal cells and compare key structural differences (cell wall, large vacuole, plastids) against animal cheek cell diagrams using low-cost slide preparation techniques.',
  previousLearning: {
    priorKnowledge: 'Learners already know that living things are made of microscopic units called cells (Robert Hooke, 1665) and have seen multicellular organisms with distinct organs.',
    diagnosticCheck: 'Ask 3 quick oral diagnostic questions: 1. "What word did Robert Hooke coin when observing cork under his microscope?" 2. "Do plant and animal cells look identical?" 3. Have students sketch their concept of a cell on mini slates/notebooks in 60 seconds.'
  },
  plan: {
    beginning: {
      timing: '5–10 minutes',
      plannedActivities: [
        'Grab learners\' attention: Display a fresh red onion bulb and a slice of tomato. Ask: "Can we see individual cells with our naked eyes? What tool allowed Robert Hooke to see \'cellulae\'?"',
        'Establish context: Connect to Textbook Chapter 3 (Pages 55–61). Explain that while bacteria like Mycoplasma are 0.2 microns and ostrich eggs are 15–18 cm, plant cells like onion peel are easy to mount and view.',
        'Share objectives: Explain that by the end of this 45-minute lesson, every student will prepare an onion epidermal mount, identify the cell wall and nucleus, and record 3 differences from animal cells.',
        'Set expectations: Form pairs for slide preparation; review knife/forceps handling safety.'
      ],
      notes: 'Science & Technology Grade 8 Textbook (pages 55–63), red onion, clean glass slides, coverslips, forceps, diluted safranin or iodine tincture, dropper, waste bowl.'
    },
    mainActivities: {
      timing: '25–30 minutes',
      plannedActivities: [
        'Teacher Demonstration (5 mins): Show the knife-peeling technique from Textbook Activity 3.2 (Page 58). Peel the paper-thin translucent inner epidermis from the concave side of an onion scale leaf. Transfer into water in a watch glass to prevent wrinkling.',
        'Hands-on Practical Mount (12 mins): Student pairs cut a 5mm square of onion peel, place it in a drop of safranin stain for 60 seconds, rinse in water, and transfer to a clean slide with a drop of glycerin (or water). Guide students to lower the coverslip at a 45-degree angle with a needle to prevent air bubbles.',
        'Microscopic Observation & Sketching (8 mins): Students focus on low power (10x) then medium power (40x). Observe brick-like hexagonal cells arranged in neat rows. Identify the rigid non-living cell wall and stained nucleus.',
        'Comparative Analysis (5 mins): Refer to Textbook Activity 3.3 (Page 59, cheek cell mount). Contrast the plant cell\'s rigid cell wall and prominent vacuole with the flexible irregular plasma membrane and central nucleus of animal cells.'
      ],
      formativeAssessment: 'Circulate among student pairs during slide mounting. Check: 1. Is the specimen thin and flat without overlapping folds? 2. Are air bubbles avoided under the coverslip? 3. Prompt individual learners: "Why does the onion cell have a distinct box-like shape while cheek cells are irregular?" Check labelled drawings in their practical notebook.',
      notes: 'Low-resource adjustments: If onions are unavailable, use tomato skin peel or translucent Zebrina / Aloe Vera outer leaf skin (Textbook Page 59 note). If safranin is unavailable, use diluted medical iodine tincture or water-based fountain pen blue ink.'
    },
    end: {
      timing: '5–10 minutes',
      plannedActivities: [
        'Reflect on learning: Have students complete a 2-minute 3-column quick Venn diagram comparing Plant Cell vs Animal Cell (Textbook Page 69 Activity 3.6 & Page 72 Question 4g).',
        'Evaluate work: Peer review: Table partners swap practical sheets and verify labels for "Cell Wall", "Cytoplasm", and "Nucleus".',
        'Set targets for next lesson: Preview Textbook Section 3.1.1 on specialized cell organelles (mitochondria as powerhouse, plastids: chloroplast/chromoplast/leucoplast).'
      ],
      notes: 'Blackboard summary, practical notebook submission, clean-up of microscope stage and glassware.'
    }
  },
  reflection: {
    learningOutcomesRealistic: 'Yes. Focusing specifically on observing the onion epidermis provided a concrete visual anchor for [LO 4.1] and [LO 4.2] without overwhelming students with all 8 organelles at once.',
    whatLearnersLearned: 'Learners successfully identified that plant cells have an outer protective non-living cell wall enclosing the cell membrane, which gives them regular hexagonal shapes, unlike flexible animal cells.',
    learningAtmosphere: 'Highly engaged and collaborative during the peel extraction and microscope focusing, with great excitement when the nucleus stained clearly.',
    timingAdherence: 'Mounting took 3 minutes longer for groups that got air bubbles under coverslips; timing was recovered by streamlining the final Venn diagram discussion.',
    changesMadeAndWhy: 'Switched one pair from glycerin to a plain water drop because glycerin was too viscous for their thin specimen; the water mount provided clear contrast under natural light.'
  },
  summaryEvaluation: {
    wentWell: [
      'Hands-on slide preparation: Over 90% of student pairs successfully found and focused on single-layer cell walls under 10x magnification.',
      'Active peer dialogue: Students accurately justified why onion cells do not have chloroplasts (they grow underground away from sunlight).'
    ],
    improveNextTime: [
      'Pre-cut small onion squares before the bell to save 4 minutes of slicing time at student desks.',
      'Provide a laminated troubleshooting card for eliminating air bubbles under coverslips.'
    ],
    informNextLesson: 'Several students confused the cell membrane with the cell wall; next lesson must start with a physical model (mesh bag vs cardboard box) to cement the double-layer concept before organelle functions.'
  },
  nextSteps: 'Proceed to Unit 3 Section 3.1.1: Functional deep-dive into Mitochondria (ATP cellular respiration), Plastids (chloroplast vs chromoplast in fruits/flowers), and constructing 3D clay cell models (Textbook Activity 3.4).',
  steamConnections: {
    science: 'Cell theory, cytology, difference between plant cell wall and animal plasma membrane, staining mechanisms with safranin.',
    technology: 'Optical compound microscope operation, magnification calculation (Eyepiece 10x × Objective 40x = 400x).',
    engineering: 'Specimen mounting mechanics: 45-degree angled coverslip deployment to prevent capillary air bubble trapping.',
    arts: 'Accurate scientific observational illustration and proportioned labelling on practical observation sheets.',
    math: 'Measurement of cell dimensions (microns vs millimeters), scale ratios between microscopic cells and whole tissues.'
  },
  textbookReference: {
    pageRange: 'Pages 55–63 (Nepal CDC Grade 8)',
    activities: [
      'Activity 3.2: Observation of Onion Cells (Page 58)',
      'Activity 3.3: Observation of Cheek-cells (Page 59)',
      'Activity 3.6: Comparison between Plant and Animal Cell (Page 69)'
    ],
    localLowCostMaterials: [
      'Red onion or tomato skin / Aloe Vera leaf epidermis',
      'Discarded clean wooden toothpicks',
      'Iodine tincture or red food coloring as low-cost stain',
      'Hand magnifying lens for macroscopic tissue overview'
    ]
  }
};
