import { CurriculumUnit, LearningOutcome } from '../types';

export const OFFICIAL_GRADE_8_LOS: LearningOutcome[] = [
  // Scientific Learning
  { id: '1.1', theme: 'Scientific Learning', topic: 'Investigations and report writing', text: 'To carry out simple investigations/surveys inside or outside the laboratory using certain methods and prepare reports on the same' },
  { id: '1.2', theme: 'Scientific Learning', topic: 'Investigations and report writing', text: 'To follow the precautions to be taken while doing the experimental work of science' },

  // Information and Communication Technology
  { id: '2.1', theme: 'Information and communication technology', topic: 'ICT tools & Cybersecurity', text: 'To make simple use of ICT tools' },
  { id: '2.2', theme: 'Information and communication technology', topic: 'ICT tools & Cybersecurity', text: 'To introduce search engines, websites, ISPs' },
  { id: '2.3', theme: 'Information and communication technology', topic: 'ICT tools & Cybersecurity', text: 'To introduce and use the social networking site in general' },
  { id: '2.4', theme: 'Information and communication technology', topic: 'ICT tools & Cybersecurity', text: 'To give a general introduction to cyber crime, computer ethics, cyber law and internet security' },
  { id: '3.1', theme: 'Information and communication technology', topic: 'Robotics and A.I', text: 'To introduce robotics and virtual reality' },
  { id: '3.2', theme: 'Information and communication technology', topic: 'Robotics and A.I', text: 'To introduce and general use artificial intelligence and cloud computing' },

  // Organisms and their structure
  { id: '4.1', theme: 'Organisms and their structure', topic: 'Cells and Tissues', text: 'To describe the functions of the components of animal cells and plant cells' },
  { id: '4.2', theme: 'Organisms and their structure', topic: 'Cells and Tissues', text: 'To distinguish the similarities and differences between plant cells and animal cells' },
  { id: '4.3', theme: 'Organisms and their structure', topic: 'Cells and Tissues', text: 'To explain the interrelationship of cells, tissues and organs in the human body' },
  { id: '5.1', theme: 'Organisms and their structure', topic: 'Microorganisms', text: 'To give a general introduction to microorganisms (amoeba, fungi, viruses, bacteria), explain their benefits, harms and measures to avoid them' },
  { id: '5.3', theme: 'Organisms and their structure', topic: 'Microorganisms', text: 'To identify and adopt measures to prevent food spoilage' },
  { id: '6.1', theme: 'Organisms and their structure', topic: 'Classification of organisms', text: 'To give general information about two world system and five world system of classification of organisms' },

  // Biodiversity and Environment
  { id: '7.1', theme: 'Biodiversity and Environment', topic: 'Biodiversity', text: 'To introduce biodiversity and state its current status and importance' },
  { id: '7.2', theme: 'Biodiversity and Environment', topic: 'Biodiversity', text: 'To explain the causes and examples of biodiversity loss' },
  { id: '7.3', theme: 'Biodiversity and Environment', topic: 'Biodiversity', text: 'To identify common local medicinal plants and their uses' },
  { id: '7.4', theme: 'Biodiversity and Environment', topic: 'Biodiversity', text: 'To identify measures for biodiversity conservation' },
  { id: '7.5', theme: 'Biodiversity and Environment', topic: 'Sustainable development', text: 'To explain the concept and importance of sustainable development' },
  { id: '7.6', theme: 'Biodiversity and Environment', topic: 'Sustainable development', text: 'To explain efforts in Nepal to achieve the Sustainable Development Goals related to biodiversity conservation' },

  // Life Processes
  { id: '8.1', theme: 'Life processes', topic: 'Asexual reproduction', text: 'To give a general introduction to asexual reproduction in plants and animals' },
  { id: '8.2', theme: 'Life processes', topic: 'Asexual reproduction', text: 'To introduce vegetative propagation in plants and describe its methods' },
  { id: '8.3', theme: 'Life processes', topic: 'Asexual reproduction', text: 'To describe asexual reproduction in plants and animals' },
  { id: '9.1', theme: 'Life processes', topic: 'Sexual reproduction', text: 'To identify the parts of different types of seeds and describe their functions' },
  { id: '9.2', theme: 'Life processes', topic: 'Sexual reproduction', text: 'To introduce seed propagation and describe methods of propagation' },
  { id: '9.3', theme: 'Life processes', topic: 'Sexual reproduction', text: 'To demonstrate the process of seed germination and explain its importance' },

  // Force and Motion
  { id: '10.1', theme: 'Force and motion', topic: 'Motion', text: 'To introduce relative and average speed and to solve simple mathematical problems of average speed' },
  { id: '10.2', theme: 'Force and motion', topic: 'Motion', text: 'To define acceleration and solve simple related mathematical problems' },
  { id: '11.1', theme: 'Force and motion', topic: 'Simple machine', text: 'To introduce and describe types of levers' },
  { id: '11.2', theme: 'Force and motion', topic: 'Simple machine', text: 'To state the principle of operation of a lever and to prove practically' },
  { id: '11.3', theme: 'Force and motion', topic: 'Simple machine', text: 'To solve mathematical problems related to mechanical advantage and speed ratio of a lever by giving definition of mechanical advantage and speed ratio' },
  { id: '12.1', theme: 'Force and motion', topic: 'Pressure', text: 'To introduce pressure and solve mathematical problems related to pressure' },
  { id: '12.2', theme: 'Force and motion', topic: 'Pressure', text: 'To explain the relationship between the weight of the material and the area of the base and the pressure exerted by the material and to explain its use in daily life' },
  { id: '12.3', theme: 'Force and motion', topic: 'Pressure', text: 'To demonstrate the pressure exerted by a fluid and to demonstrate the fact that the pressure of a fluid increases with depth and density' },
  { id: '12.4', theme: 'Force and motion', topic: 'Pressure', text: 'To explain the importance of fluid pressure in daily life with examples' },
  { id: '12.5', theme: 'Force and motion', topic: 'Pressure', text: 'To demonstrate the pressure generated by compressed air and explain the use of air pressure in everyday life' },
  { id: '12.6', theme: 'Force and motion', topic: 'Pressure', text: 'To explain the method of measuring the air pressure inside a closed object' },
  { id: '12.7', theme: 'Force and motion', topic: 'Pressure', text: 'To introduce atmospheric pressure and explain its importance and simple applications' },

  // Energy in Daily Life
  { id: '13.1', theme: 'Energy in daily life', topic: 'Heat', text: 'To explain the various methods of heat transfer (conduction, convection and radiation) with experimental evidence' },
  { id: '13.2', theme: 'Energy in daily life', topic: 'Heat', text: 'To distinguish between good conductors and bad conductors in heat conduction and to explain the use of heat conduction in daily life' },
  { id: '13.3', theme: 'Energy in daily life', topic: 'Heat', text: 'To demonstrate the conduction of heat in water and in air and to explain conduction currents' },
  { id: '13.4', theme: 'Energy in daily life', topic: 'Heat', text: 'To explain the daily life application of convection method of heat transfer' },
  { id: '13.5', theme: 'Energy in daily life', topic: 'Heat', text: 'To demonstrate the radiative method of heat transfer with an introduction to electromagnetic waves' },
  { id: '13.6', theme: 'Energy in daily life', topic: 'Heat', text: 'To explain the use of methods of heat transfer in daily life' },
  { id: '13.7', theme: 'Energy in daily life', topic: 'Heat', text: 'To explain the structure and function of a thermos' },
  { id: '13.8', theme: 'Energy in daily life', topic: 'Heat', text: 'To describe the working process of greenhouse and explain its use' },
  { id: '14.1', theme: 'Energy in daily life', topic: 'Optics', text: 'To introduce concave and convex mirrors' },
  { id: '14.2', theme: 'Energy in daily life', topic: 'Optics', text: 'To identify the center of curvature, principal axis and focal point of a spherical mirror, focal distance, center of mirror, radius of curvature' },
  { id: '14.3', theme: 'Energy in daily life', topic: 'Optics', text: 'To demonstrate the shape of objects at different distances from a spherical mirror and to describe the nature of the shape formed' },
  { id: '14.4', theme: 'Energy in daily life', topic: 'Optics', text: 'To draw a ray line diagram of reflections from spherical mirrors' },
  { id: '14.5', theme: 'Energy in daily life', topic: 'Optics', text: 'To explain the utility of spherical mirrors' },
  { id: '15.1', theme: 'Energy in daily life', topic: 'Waves & sound', text: 'To solve simple mathematical problems using the relationship between wavelength, frequency and speed of sound' },
  { id: '15.2', theme: 'Energy in daily life', topic: 'Waves & sound', text: 'To introduce audible sound, infrasound and ultrasound' },
  { id: '15.3', theme: 'Energy in daily life', topic: 'Waves & sound', text: 'To measure the intensity of sound' },
  { id: '15.4', theme: 'Energy in daily life', topic: 'Waves & sound', text: 'To describe the causes, effects and mitigation measures of noise pollution' },

  // Electricity and Magnetism
  { id: '16.1', theme: 'Electricity and magnetism', topic: 'Magnetism', text: 'To distinguish between natural and artificial magnets and explain their uses' },
  { id: '16.2', theme: 'Electricity and magnetism', topic: 'Magnetism', text: 'To describe the atomic theory of magnetism' },
  { id: '16.3', theme: 'Electricity and magnetism', topic: 'Magnetism', text: 'To explain the causes of loss of magnetic force and methods of conservation of magnetic force' },
  { id: '16.4', theme: 'Electricity and magnetism', topic: 'Magnetism', text: 'To determine the direction with the help of magnet by introducing geomagnet' },
  { id: '17.1', theme: 'Electricity and magnetism', topic: 'Electricity', text: 'To identify the appliances used in domestic electrical circuits and to explain their working and connection order' },
  { id: '17.2', theme: 'Electricity and magnetism', topic: 'Electricity', text: 'To state the working of live/phase, neutral and earth wires' },
  { id: '17.3', theme: 'Electricity and magnetism', topic: 'Electricity', text: 'To connect the wires securely to the plug' },
  { id: '17.4', theme: 'Electricity and magnetism', topic: 'Electricity', text: 'To wire the lamp, holder and switch to the plug to form the lamp circuit' },
  { id: '17.5', theme: 'Electricity and magnetism', topic: 'Electricity', text: 'To calculate the normal electricity tariff by reading the electricity meter' },

  // Matter
  { id: '18.1', theme: 'Matter', topic: 'Periodic table', text: 'To describe the structure of atoms of elements up to atomic number 20' },
  { id: '18.2', theme: 'Matter', topic: 'Periodic table', text: 'To find the valence of elements having atomic number up to 20' },
  { id: '18.3', theme: 'Matter', topic: 'Periodic table', text: 'To introduce the modern periodic table and state the rules' },
  { id: '18.4', theme: 'Matter', topic: 'Periodic table', text: 'To describe the position of elements with atomic number up to 20 in the modern periodic table' },
  { id: '18.5', theme: 'Matter', topic: 'Periodic table', text: 'To describe cell number, valence and atomic size and metallic properties of elements by period and group' },
  { id: '19.1', theme: 'Matter', topic: 'Atoms & Molecules', text: 'To define molecular formula and write molecular formula of various compounds' },
  { id: '19.2', theme: 'Matter', topic: 'Atoms & Molecules', text: 'To calculate the atomic weight of elements and the molecular weight of molecules' },
  { id: '19.3', theme: 'Matter', topic: 'Atoms & Molecules', text: 'To represent simple chemical reactions in terms and balanced formula equations' },

  // Materials Used in Daily Life
  { id: '20.1', theme: 'Materials used in daily life', topic: 'Acid, Base & Salt', text: 'To introduce acids, bases and salts to describe their physical and chemical properties' },
  { id: '20.2', theme: 'Materials used in daily life', topic: 'Acid, Base & Salt', text: 'To explain the use of acids, bases and salts with examples' },
  { id: '20.3', theme: 'Materials used in daily life', topic: 'Acid, Base & Salt', text: 'To introduce acid rain and explain its causes and environmental effects' },
  { id: '21.1', theme: 'Materials used in daily life', topic: 'Hardness of water', text: 'To distinguish between soft and hard water' },
  { id: '21.2', theme: 'Materials used in daily life', topic: 'Hardness of water', text: 'To demonstrate the causes of water hardness and how to remove it' },
  { id: '21.3', theme: 'Materials used in daily life', topic: 'Hardness of water', text: 'To state the advantages and disadvantages of hard and soft water' },
  { id: '22.1', theme: 'Materials used in daily life', topic: 'Alloys', text: 'To introduce metal alloys and to state the components and uses of steel, brass and bronze' },

  // Earth and Space
  { id: '23.1', theme: 'Earth and the space', topic: 'Minerals & Rocks', text: 'To introduce minerals and mention their types' },
  { id: '23.2', theme: 'Earth and the space', topic: 'Minerals & Rocks', text: 'To describe the properties and uses of minerals' },
  { id: '23.3', theme: 'Earth and the space', topic: 'Minerals & Rocks', text: 'To mention the metallic minerals found in Nepal and where they are found' },
  { id: '24.1', theme: 'Earth and the space', topic: 'Universe', text: 'To introduce the Universe, asteroids and comets' },
  { id: '24.2', theme: 'Earth and the space', topic: 'Universe', text: 'To introduce constellations, meteors and meteorites and distinguish similarities and differences between them' },
  { id: '24.3', theme: 'Earth and the space', topic: 'Universe', text: 'To introduce the evolution of life on earth' },
];

export const GRADE_8_CURRICULUM_UNITS: CurriculumUnit[] = [
  {
    unitNumber: 1,
    title: 'Scientific Learning',
    theme: 'Scientific Learning',
    pageRange: 'Pages 1–17',
    summary: 'Laboratory safety precautions, science process skills (observation, testing, hypothesis), phases of research, and community survey methodology.',
    topics: [
      '1.1 Precautions in the Science Laboratory',
      '1.2 Experimental Works: Observation & Hypothesis Testing',
      '1.3 Phases of Scientific Research',
      '1.4 Survey Methodology & Data Presentation'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['1.1', '1.2'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 1.1',
        title: 'Observation of Fungi Structure',
        objective: 'To study the structure of fungi under a microscope',
        materialsRequired: ['Moist bread', 'water', 'forceps/tongs', 'glass slide', 'coverslip', 'microscope', 'methylene blue'],
        localLowCostAlternatives: ['Leftover stale roti/bread', 'dropper', 'hand lens if microscope unavailable'],
        methodSummary: 'Sprinkle water on bread, leave covered in moist place for days, mount mycelia with needle, observe hyphae and sporangia.',
        safetyPrecautions: 'Use forceps carefully; avoid fungus getting into mouth or eyes.',
        pageNumber: 4
      },
      {
        id: 'Activity 1.3',
        title: 'Test of Acids, Bases and Salts using Indicators',
        objective: 'To identify given substances using red and blue litmus paper',
        materialsRequired: ['Lemon juice', 'soap water', 'salt water', 'red & blue litmus paper', 'test tubes'],
        localLowCostAlternatives: ['Lemon juice, wood ash water (alkali), common salt water', 'hibiscus flower petal extract as natural indicator'],
        methodSummary: 'Dip litmus papers into each solution, observe color changes, record in table and deduce acid/base/neutral.',
        pageNumber: 6
      },
      {
        id: 'Activity 1.6',
        title: 'Research on Factors Affecting Algae Growth',
        objective: 'To explore the role of chemical fertilizers and vinegar on algae growth',
        materialsRequired: ['Pond water with algae', '3 glass bottles', 'chemical fertilizer', 'vinegar'],
        localLowCostAlternatives: ['Reused clear jam bottles', 'compost/urea', 'lemon juice instead of vinegar'],
        methodSummary: 'Fill 3 bottles half with algae pond water. Bottle 1 control, Bottle 2 + fertilizer, Bottle 3 + vinegar. Observe for 15-20 days.',
        pageNumber: 10
      },
      {
        id: 'Activity 1.8',
        title: 'Survey on Solid Waste Management in Local Community',
        objective: 'To collect data from 50 households on degradable vs non-degradable waste practices',
        materialsRequired: ['Survey questionnaire sheet', 'pen', 'notebook'],
        localLowCostAlternatives: ['Paper survey forms', 'interview questions on chalkboard'],
        methodSummary: 'Conduct door-to-door survey on waste disposal, categorize compost vs municipal disposal, present findings in bar chart.',
        pageNumber: 13
      }
    ],
    keyGlossary: [
      { term: 'Observation', definition: 'The process of experiencing an object, event, or process carefully using the sense organs.' },
      { term: 'Hypothesis', definition: 'An inference or assumption made in the scientific learning process before testing.' },
      { term: 'Survey', definition: 'The process of collecting data related to a topic or problem directly and deriving a conclusion.' }
    ]
  },
  {
    unitNumber: 2,
    title: 'Information and Communication Technology',
    theme: 'Information and communication technology',
    pageRange: 'Pages 18–54',
    summary: 'Hardware components of ATMs, photocopiers, scanners, printers, routers, STBs; search engines, websites, ISPs; cyber safety, cyber law (Electronic Transactions Act 2063), robotics, AI, and cloud computing.',
    topics: [
      '2.1 Tools of ICT (ATM, Photocopier, Scanner, Printer, Router, STB)',
      '2.2 Search Engine, Website and ISP Architecture',
      '2.3 Social Networking Sites: Opportunities, Health Impacts & Ethics',
      '2.4 Cybercrime, Computer Code of Conduct & Cyber Law in Nepal',
      '2.5 Introduction to Robotics & Virtual Reality',
      '2.6 Artificial Intelligence & Cloud Computing'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['2.1', '2.2', '2.3', '2.4', '3.1', '3.2'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 2.1',
        title: 'Categorizing Daily ICT Tools & Their Functions',
        objective: 'To identify ICT devices used in everyday life and document their specific functions',
        materialsRequired: ['Notebook', 'chalkboard', 'printed charts/pictures of devices'],
        localLowCostAlternatives: ['Old discarded electronics or pictures cut from newspapers/magazines'],
        methodSummary: 'Students inventory ICT equipment used at home/school and tabulate input, output, and transmission devices.',
        pageNumber: 20
      },
      {
        id: 'Activity 2.10',
        title: 'Computer Code of Conduct Dos and Don\'ts Roleplay',
        objective: 'To recognize ethical rules of computer usage and cyber laws in Nepal',
        materialsRequired: ['Chart paper', 'markers'],
        localLowCostAlternatives: ['Cardboard scraps', 'recycled chart papers'],
        methodSummary: 'Roleplay scenarios covering password sharing, copyright infringement, cyberbullying, and report procedures.',
        pageNumber: 37
      }
    ],
    keyGlossary: [
      { term: 'ATM', definition: 'Automated Teller Machine providing automated banking services (cash withdrawal, deposit, PIN change).' },
      { term: 'Cybercrime', definition: 'Any crime committed against a person, institution, or government using computers or electronic networks.' },
      { term: 'Artificial Intelligence', definition: 'Computer programs or machines that perform tasks requiring human intelligence (decision making, speech, pattern recognition).' }
    ]
  },
  {
    unitNumber: 3,
    title: 'Living Beings and Their Structure',
    theme: 'Organisms and their structure',
    pageRange: 'Pages 55–88',
    summary: 'Discovery of cell, cytology; plant vs animal cell anatomy; cellular organelles (mitochondria, plastids, ER, Golgi, lysosomes, nucleus); cell-tissue-organ hierarchy; Two-Kingdom vs Five-Kingdom classification; microorganisms and food preservation methods.',
    topics: [
      '3.1 Cell: Fundamental Unit of Life, History & Shape/Size',
      '3.1.1 Cell Components & Organelles (Covering, Cytoplasm, Nucleus, Organelles)',
      '3.2 Interrelationship Among Cell, Tissue and Organ in Human Body',
      '3.3 Classification of Living Beings: Two-Kingdom vs Five-Kingdom Systems',
      '3.4 Microorganisms (Viruses, Bacteria, Amoeba, Fungi)',
      '3.4.1 Positive & Negative Effects of Microorganisms',
      '3.4.2 Methods of Food Preservation (Dry, Wet, Cold)'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['4.1', '4.2', '4.3', '5.1', '5.3', '6.1'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 3.2',
        title: 'Observation of Onion Peel Plant Cells',
        objective: 'To prepare and observe temporary slides of plant cells and draw labelled diagram',
        materialsRequired: ['Onion', 'blade', 'needle', 'brush', 'watch glass', 'forceps', 'slide', 'coverslip', 'safranin', 'glycerin', 'microscope'],
        localLowCostAlternatives: ['Tomato skin peel or Zebrina / Aloe Vera leaf outer translucent peel', 'food coloring or iodine tincture if safranin unavailable', 'water drop if glycerin unavailable'],
        methodSummary: 'Peel translucent inner membrane, stain in safranin, wash in water, mount on slide with glycerin and coverslip, observe rectangular cell walls and nucleus.',
        safetyPrecautions: 'Careful with razor blade edges.',
        pageNumber: 58
      },
      {
        id: 'Activity 3.3',
        title: 'Observation of Cheek Animal Cells',
        objective: 'To prepare and observe temporary slide of animal cheek cells',
        materialsRequired: ['Sterilized wooden toothpick', 'slide', 'coverslip', 'needle', '1% methylene blue', 'clean salt solution', 'microscope'],
        localLowCostAlternatives: ['Flat clean toothpick', 'inner thin layer of chicken skin from butcher shop if cheek swab unavailable'],
        methodSummary: 'Gently scrape inside of cheek with clean toothpick, mix with drop of saline and methylene blue, place coverslip without bubbles, observe irregular cell membranes and central nucleus.',
        safetyPrecautions: 'Never use sharp metal needles to scrape cheek. Supervised by teacher.',
        pageNumber: 59
      },
      {
        id: 'Activity 3.4',
        title: '3D Hands-On Cell Model Making',
        objective: 'To prepare physical 3D models comparing plant and animal cells',
        materialsRequired: ['Thermocol sheet or local clay', 'knife/cutter', 'color pencils/paint'],
        localLowCostAlternatives: ['Local potting clay / dough', 'hay', 'colorful waste threads', 'scraps of cloth', 'cardboard box lid'],
        methodSummary: 'Construct cell models illustrating cell wall (plant only), large central vacuole, chloroplasts, and round animal cell with centrosome.',
        pageNumber: 66
      }
    ],
    keyGlossary: [
      { term: 'Cytology', definition: 'The branch of biology that deals with the study of cells.' },
      { term: 'Mitochondria', definition: 'Powerhouses of the cell where oxidation of glucose produces ATP (cellular respiration).' },
      { term: 'Plastids', definition: 'Plant organelles divided into Chloroplasts (green/photosynthesis), Chromoplasts (colored/pollination), and Leucoplasts (colorless/storage).' },
      { term: 'Lysosome', definition: 'Membrane-bound digestive organelle containing enzymes, nicknamed "suicidal bags" due to autolysis.' }
    ]
  },
  {
    unitNumber: 4,
    title: 'Biodiversity and Environment',
    theme: 'Biodiversity and Environment',
    pageRange: 'Pages 89–111',
    summary: 'Biodiversity levels (genetic, species, ecosystem); Nepal biodiversity status (27th global, endemic Spiny babbler, Marsi rice); threats to biodiversity; In-situ vs Ex-situ conservation; sustainable development pillars, Brundtland report 1987, and Nepal SDG initiatives.',
    topics: [
      '4.1 Biodiversity: Concept, Importance & Status in Nepal',
      '4.1.1 Disciplines of Biodiversity (Genetic, Species, Ecosystem)',
      '4.1.2 Causes of Biodiversity Degradation',
      '4.1.3 Conservation Strategies: In-situ vs Ex-situ Conservation in Nepal',
      '4.2 Sustainable Development: Pillars, Principles & Importance',
      '4.2.1 Sustainable Development Goals (SDGs) & Nepal\'s National Efforts'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 4.1',
        title: 'Quadrat Sampling of School Grassland Biodiversity',
        objective: 'To study the species richness of a 1m² grassland area',
        materialsRequired: ['Measuring tape', '4 iron nails/wooden pegs', 'cord or jute rope', 'plastic bags', 'scissors'],
        localLowCostAlternatives: ['Bamboo sticks as corner pegs', 'local jute rope / string', 'newspaper bags'],
        methodSummary: 'Measure 1m x 1m square on school ground, mark with pegs and string. Collect and count distinct plant species (crabgrass, weeds) and small insects. Calculate species counts.',
        pageNumber: 91
      },
      {
        id: 'Activity 4.3',
        title: 'Model of an Ideal Clean-Green Sustainable Village',
        objective: 'To prepare a 3D model demonstrating ecological, social, and economic sustainability',
        materialsRequired: ['Clay', 'wood', 'bamboo pieces', 'cardboard paper', 'rope', 'glue', 'natural colors'],
        localLowCostAlternatives: ['Local clay mud', 'recycled cardboard', 'twigs', 'dry leaves', 'seeds'],
        methodSummary: 'Build village model with terrace farming, tree belts for landslide control, composting pits, rainwater collection, and solar units.',
        pageNumber: 102
      }
    ],
    keyGlossary: [
      { term: 'In-situ Conservation', definition: 'Conserving wild organisms within their natural habitats (e.g. 12 National Parks like Chitwan, Rara).' },
      { term: 'Ex-situ Conservation', definition: 'Conserving endangered species outside their natural habitat under controlled care (e.g. Central Zoo, botanical gardens, seed banks).' },
      { term: 'Sustainable Development', definition: 'Development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs (Brundtland 1987).' }
    ]
  },
  {
    unitNumber: 5,
    title: 'Life Process (Reproduction in Plants and Animals)',
    theme: 'Life processes',
    pageRange: 'Pages 112–151',
    summary: 'Asexual reproduction modes (fission, budding, fragmentation, regeneration, sporulation, parthenogenesis); natural & artificial vegetative propagation; flower sexual reproduction, pollination mechanisms, double fertilization; seed anatomy, dispersal methods, seed dormancy & germination factors.',
    topics: [
      '5.1 Asexual Reproduction in Plants and Animals',
      '5.1.1 Types of Asexual Reproduction (Fission, Budding, Fragmentation, Regeneration, Sporulation)',
      '5.1.2 Vegetative Propagation (Natural: root, tuber, rhizome, bulb, bulbil, leaf; Artificial: cutting, layering, gootee, grafting, tissue culture)',
      '5.2 Sexual Reproduction in Plants: Flower Anatomy, Pollination & Fertilization',
      '5.2.2 Sexual Reproduction in Animals: Gametogenesis, Internal vs External Fertilization',
      '5.3 Seed: Structure (Seed Coat, Embryo, Endosperm), Dispersal Mechanisms, and Factors Affecting Germination'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['8.1', '8.2', '8.3', '9.1', '9.2', '9.3'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 5.2',
        title: 'Study of Fern Leaf Spores (Sporulation)',
        objective: 'To observe spore structures under the microscope from fern leaves',
        materialsRequired: ['Fern leaf with dark mature sori', 'microscope', 'glass slide', 'brush', 'water'],
        localLowCostAlternatives: ['Locally plucked wild fern fronds', 'clear plastic strip', 'hand magnifying lens'],
        methodSummary: 'Gently brush powdery spores from sori on back of fern frond onto water drop on slide. Observe single-celled round spores.',
        pageNumber: 117
      },
      {
        id: 'Activity 5.6',
        title: 'Observation of Flower Pollen Grains',
        objective: 'To dissect flower parts and observe pollen grain adaptations',
        materialsRequired: ['Bisexual flower (mustard or hibiscus)', 'fine brush', 'slide', 'coverslip', 'microscope'],
        localLowCostAlternatives: ['Local yellow mustard (Tori) flower or pumpkin blossom', 'clear glass or transparent tape', 'hand lens'],
        methodSummary: 'Dissect calyx, corolla, stamen, and carpel. Dust yellow anther pollen on slide with water, observe microscopic textured coat.',
        pageNumber: 130
      },
      {
        id: 'Activity 5.11',
        title: 'Dissection of Dicot Seed (Soybean / Bean)',
        objective: 'To identify seed coat (testa, tegmen), cotyledons, radicle, and plumule',
        materialsRequired: ['Soaked soybean or kidney bean seeds', 'water', 'hand lens', 'forceps', 'watch glass'],
        localLowCostAlternatives: ['Kitchen beans (Bodi/Simi/Bhatmas) soaked overnight in water', 'sewing needle for gentle peeling'],
        methodSummary: 'Peel off softened seed coat, split two fleshy cotyledons apart, examine embryo: curved radicle (root) and tiny plumule (shoot).',
        pageNumber: 144
      },
      {
        id: 'Activity 5.13',
        title: 'Three-Bean Experiment on Factors Affecting Seed Germination',
        objective: 'To prove that water, oxygen, and suitable temperature are essential for germination',
        materialsRequired: ['3 bean seeds', 'glass beaker', 'wooden spatula or ruler', 'thread', 'water'],
        localLowCostAlternatives: ['Clear plastic glass or cut mineral water bottle', 'bamboo flat stick', 'cotton thread', 'chana/pea seeds'],
        methodSummary: 'Tie 3 seeds along stick: top seed in air (no water), middle seed half submerged (water + air), bottom seed fully submerged (water, no air). Middle seed germinates successfully.',
        pageNumber: 147
      }
    ],
    keyGlossary: [
      { term: 'Vegetative Propagation', definition: 'Asexual reproduction occurring from vegetative parts of plants (root, stem, leaf) without seeds.' },
      { term: 'Pollination', definition: 'Transfer of pollen grains from anther to stigma of the same flower (self) or another flower of same species (cross).' },
      { term: 'Dormancy', definition: 'The resting state in which a mature dry seed remains inactive until conditions (water, air, temperature) trigger germination.' }
    ]
  },
  {
    unitNumber: 6,
    title: 'Force and Motion',
    theme: 'Force and motion',
    pageRange: 'Pages 152–184',
    summary: 'Rest & motion as relative states; speed, velocity, relative velocity equations; acceleration & retardation; Lever principles (Archimedes, 1st, 2nd, 3rd class, MA, VR, Efficiency); Solid pressure (P=F/A), Liquid pressure (P=hdg), Atmospheric pressure (760 mmHg, barometers, manometers).',
    topics: [
      '6.1 Motion: Speed, Velocity, Relative Velocity & Acceleration',
      '6.2 Simple Machines: Principle of Lever, 1st, 2nd & 3rd Class Levers, MA, VR, Efficiency',
      '6.3 Pressure: Definition (P = F/A), Units (Pascal Pa), Daily Life Applications',
      '6.3.1 Liquid Pressure: Derivation of P = hdg & Characteristics',
      '6.3.2 Atmospheric Pressure: Evidence, Measurement & Everyday Instruments (Syringe, Pump)'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['10.1', '10.2', '11.1', '11.2', '11.3', '12.1', '12.2', '12.3', '12.4', '12.5', '12.6', '12.7'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 6.3',
        title: 'Verification of the Principle of the Lever',
        objective: 'To demonstrate practically that Effort x Effort Distance = Load x Load Distance in equilibrium',
        materialsRequired: ['1m plastic ruler', 'wire support', 'known slotted weights or coins', 'stand'],
        localLowCostAlternatives: ['1-meter straight wooden stick/ruler', 'string suspension', 'equal mass coins or small stone bags calibrated with beam balance'],
        methodSummary: 'Pivot ruler at center (50 cm). Hang load on right side and effort on left. Adjust distances until balanced horizontal. Show E × E.D. = L × L.D.',
        pageNumber: 167
      },
      {
        id: 'Activity 6.5',
        title: 'Pressure and Surface Area Demonstration with Brick and Foam',
        objective: 'To show that smaller contact surface area produces greater pressure for the same weight',
        materialsRequired: ['Standard building brick', 'thick sponge / foam pad', 'measuring ruler'],
        localLowCostAlternatives: ['Heavy textbook or clay brick', 'soft sponge / bed foam / soft moist clay bed'],
        methodSummary: 'Place brick on foam flat (wide surface: large area, shallow depression). Stand brick on edge (narrow surface: small area, deep depression). Deduce P = F/A.',
        pageNumber: 174
      },
      {
        id: 'Activity 6.6',
        title: 'Variation of Liquid Pressure with Depth',
        objective: 'To demonstrate that liquid pressure increases with depth (P = hdg)',
        materialsRequired: ['Plastic mineral water bottle', '3 small holes at different heights', 'tape', 'water basin'],
        localLowCostAlternatives: ['Empty 1L plastic soda bottle', 'heated needle to puncture 3 vertical holes', 'cellotape'],
        methodSummary: 'Punch 3 holes vertically at low, medium, and high positions. Seal with tape, fill bottle with water, pull tape simultaneously. Bottom jet shoots furthest.',
        pageNumber: 176
      },
      {
        id: 'Activity 6.7',
        title: 'Inverted Glass Tumbler Atmospheric Pressure Test',
        objective: 'To prove that atmospheric pressure exerts upward force supporting water weight',
        materialsRequired: ['Glass tumbler', 'thick postcard / cardboard square', 'water'],
        localLowCostAlternatives: ['Clean glass or plastic cup', 'cereal box cardboard / stiff greeting card'],
        methodSummary: 'Fill cup to brim with water, cover with flat cardboard card, hold card and invert quickly. Release hand; atmospheric pressure holds card and water in place.',
        pageNumber: 180
      }
    ],
    keyGlossary: [
      { term: 'Relative Velocity', definition: 'The velocity of a body relative to a reference point or another moving body (V_AB = V_A - V_B in same direction; V_AB = V_A + V_B in opposite direction).' },
      { term: 'Mechanical Advantage (MA)', definition: 'The ratio of load to applied effort in a simple machine (MA = Load / Effort).' },
      { term: 'Pascal (Pa)', definition: 'The SI unit of pressure equivalent to one Newton per square meter (1 Pa = 1 N/m²).' },
      { term: 'Liquid Pressure', definition: 'The pressure exerted by a liquid column at depth h: P = h·d·g.' }
    ]
  },
  {
    unitNumber: 7,
    title: 'Energy in Daily Life (Heat, Waves, Optics, Sound)',
    theme: 'Energy in daily life',
    pageRange: 'Pages 185–226',
    summary: 'Heat transmission (conduction, convection, radiation); thermos flask design; greenhouse effect & agricultural tunnels; spherical mirrors (concave converging vs convex diverging, ray diagrams); sound waves (frequency, wavelength v=f·λ, audible range 20-20kHz, ultrasound, noise pollution).',
    topics: [
      '7.1 Heat Transmission: Conduction (conductors/insulators), Convection (sea/land breeze), Radiation (absorption & reflection)',
      '7.1.5 Structure & Working Principle of Thermos Flask',
      '7.1.6 Greenhouse Effect & Agricultural Farming Tunnels',
      '7.2 Light & Optics: Concave and Convex Spherical Mirrors, Terms (P, C, R, F, f), Ray Diagrams, Utilities',
      '7.3 Waves & Sound: Longitudinal waves, Frequency, Period, Wavelength, Speed (v = f·λ)',
      '7.3.1 Audible Sound, Infrasound (<20 Hz), Ultrasound (>20 kHz), Intensity (dB) & Noise Pollution Mitigation'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['13.1', '13.2', '13.3', '13.4', '13.5', '13.6', '13.7', '13.8', '14.1', '14.2', '14.3', '14.4', '14.5', '15.1', '15.2', '15.3', '15.4'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 7.1',
        title: 'Conduction of Heat along a Metal Rod',
        objective: 'To demonstrate that heat travels through solids by molecular vibration (conduction)',
        materialsRequired: ['Metal rod or bicycle spoke', 'candle wax', 'small metal pins', 'spirit lamp or candle'],
        localLowCostAlternatives: ['Old bicycle spoke or iron wire', 'candle wax drops', 'common office pins'],
        methodSummary: 'Stick pins with wax drops along metal rod at 3 cm intervals. Heat one end of the rod. Pins drop off one by one in sequence as heat conducts.',
        safetyPrecautions: 'Use pliers/cloth to hold rod; avoid touching hot metal.',
        pageNumber: 187
      },
      {
        id: 'Activity 7.6',
        title: 'Radiation Absorption: Black vs White Containers',
        objective: 'To show that dark surfaces absorb more heat radiation than white or shiny surfaces',
        materialsRequired: ['3 tin cans (painted black, white, and shiny/silver)', 'thermometers', 'water', 'sunlight'],
        localLowCostAlternatives: ['3 identical soda cans / glass jars wrapped in black paper, white paper, and foil'],
        methodSummary: 'Place equal volumes of water in black, white, and shiny cans in bright midday sunlight. Record water temperature every 10 min. Black heats fastest.',
        pageNumber: 196
      },
      {
        id: 'Activity 7.11',
        title: 'Focusing and Real Image Formation with Concave Mirror',
        objective: 'To produce real, inverted images on a screen and determine focal length',
        materialsRequired: ['Concave mirror', 'white card screen', 'meter scale', 'distant window/tree'],
        localLowCostAlternatives: ['Concave mirror from torch or school lab', 'white sheet of cardboard on wooden block'],
        methodSummary: 'Face mirror toward distant window. Move white screen back and forth until sharp inverted image forms. Measure mirror-screen distance = focal length (f).',
        pageNumber: 210
      },
      {
        id: 'Activity 7.13',
        title: 'Sound Production through Vibrations (Tuning Fork)',
        objective: 'To prove that sound is produced by vibrating bodies',
        materialsRequired: ['Tuning fork', 'rubber striker pad', 'water bowl'],
        localLowCostAlternatives: ['Tuning fork or metal spoon suspended by string', 'stretched rubber bands across paper box'],
        methodSummary: 'Strike tuning fork, dip vibrating prongs into surface of water bowl. Water splashes vigorously, demonstrating mechanical vibrations.',
        pageNumber: 217
      }
    ],
    keyGlossary: [
      { term: 'Conduction', definition: 'The transmission of heat through a solid substance from molecule to molecule without actual bodily movement of molecules.' },
      { term: 'Convection', definition: 'Heat transfer in liquids and gases caused by the actual upward movement of hotter, less dense molecules and sinking of cooler fluids.' },
      { term: 'Radiation', definition: 'The transfer of heat in the form of electromagnetic infrared waves without requiring any material medium.' },
      { term: 'Ultrasound', definition: 'Sound waves with frequencies above 20,000 Hz, used in medical USG and nautical SONAR.' }
    ]
  },
  {
    unitNumber: 8,
    title: 'Electricity and Magnetism',
    theme: 'Electricity and magnetism',
    pageRange: 'Pages 227–249',
    summary: 'Magnets (natural loadstone vs artificial); Molecular theory of magnetism (Weber & Ewing); demagnetization and magnetic keepers; terrestrial geomagnetism (declination & dip); domestic electrification (220 V, master switch, electric meter kWh bill calculation, MCB, fuse, live/neutral/earth wires, 3-pin plug wiring, parallel bulbs).',
    topics: [
      '8.1 Magnetism: Properties of Magnets, Natural vs Artificial, Making Electromagnets',
      '8.1.2 Molecular Theory of Magnetism (Weber & Ewing)',
      '8.1.3 Demagnetization Methods & Conservation Using Keepers',
      '8.1.4 Geomagnetism: Evidence, Magnetic Declination & Angle of Dip in Nepal (Kathmandu 42°)',
      '8.2 Domestic Electrification: Supply Path, Electric Meter Tariff Calculation (Units = kW x hrs)',
      '8.2.2 Safety Devices: MCB, Fuse, Earthing, Color Coding (Live-Red/Brown, Neutral-Black/Blue, Earth-Green/Yellow)',
      '8.2.3 Step-by-Step Wiring of a 3-Pin Plug & Parallel Lamp Circuits'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['16.1', '16.2', '16.3', '16.4', '17.1', '17.2', '17.3', '17.4', '17.5'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 8.2',
        title: 'Constructing a Solenoid Electromagnet',
        objective: 'To build a temporary electromagnet using copper wire, an iron nail, and a dry cell',
        materialsRequired: ['1.5V dry cell', '50cm insulated enamel copper wire', 'large iron nail', 'switch', 'iron paperclips/pins'],
        localLowCostAlternatives: ['3-inch iron carpentry nail', 'insulated telephone/motor copper wire', 'paper clips or staples'],
        methodSummary: 'Wind copper wire tightly around iron nail in a solenoid spiral. Connect ends to 1.5V dry cell and switch. Demonstrate attraction of pins when circuit is closed.',
        pageNumber: 230
      },
      {
        id: 'Activity 8.5',
        title: 'Step-by-Step Wiring of a 3-Pin Electrical Plug',
        objective: 'To strip, twist, and safely connect live, neutral, and earth wires into a 3-pin plug',
        materialsRequired: ['3-pin plug', '3-core insulated electrical cable', 'screwdriver', 'wire strippers/knife', 'tester'],
        localLowCostAlternatives: ['Discarded 3-pin plug from broken kettle/monitor', 'spare cable piece'],
        methodSummary: 'Strip outer sheath 1.5 inches. Identify Live (Red/Brown to right fused pin), Neutral (Black/Blue to left pin), Earth (Green/Yellow to top long pin). Clamp cord firmly.',
        safetyPrecautions: 'Never practice on live mains current! Practice only on disconnected plugs.',
        pageNumber: 244
      },
      {
        id: 'Activity 8.6',
        title: 'Constructing a Parallel Circuit with Light Bulbs',
        objective: 'To assemble parallel circuits for domestic lighting and demonstrate independent switching',
        materialsRequired: ['Wooden board', '2 lamp holders', '2 bulbs (60W or LED)', '2 switches', 'insulated wires', 'plug'],
        localLowCostAlternatives: ['Plywood scrap board', 'low-voltage torch bulbs with AA battery pack for student desktop safety'],
        methodSummary: 'Connect two bulbs in parallel across the live and neutral bus. Show that each bulb receives full voltage and can be controlled by its own switch.',
        pageNumber: 245
      }
    ],
    keyGlossary: [
      { term: 'Electromagnet', definition: 'A temporary magnet formed by passing electric current through a coil of insulated wire wound around a magnetic core.' },
      { term: 'Magnetic Declination', definition: 'The angle between the geographical meridian and the geomagnetic meridian at any given location.' },
      { term: 'Angle of Dip (Magnetic Inclination)', definition: 'The angle made by a freely suspended magnetic needle with the horizontal plane (0° at equator, 90° at poles, 42° in Kathmandu).' },
      { term: 'Kilowatt-Hour (kWh)', definition: 'The commercial unit of electricity consumed when a 1000 W appliance runs for 1 hour (1 Unit = 1 kWh).' }
    ]
  },
  {
    unitNumber: 9,
    title: 'Matter (Atoms, Molecules, Periodic Table, Equations)',
    theme: 'Matter',
    pageRange: 'Pages 250–276',
    summary: 'Structure of atom (protons, neutrons, electrons); first 20 elements (H to Ca); Bohr-Bury 2n² rule (K, L, M, N); valence electrons & valency; criss-cross method for chemical formulas; atomic & molecular weights; Modern Periodic Table (Henry Moseley 1913, 18 groups, 7 periods); word, skeletal, and balanced chemical equations.',
    topics: [
      '9.1 Atomic Structure: Subatomic Particles (p+, n0, e-), Mass (amu) & Charges',
      '9.1.1 First 20 Elements & Bohr-Bury 2n² Rule (K=2, L=8, M=18, N=32)',
      '9.1.2 Valence Shell, Valence Electrons & Valency Calculation',
      '9.1.3 Writing Molecular Formulas using Criss-Cross Method (MgO, CaCl2, NH3, CO2, H2O)',
      '9.1.4 Atomic Weight (p+ + n0) & Molecular Weight Calculations (CaCO3 = 100 amu, MgCl2 = 94 amu)',
      '9.2 Modern Periodic Table: Periodic Law, Groups (1-18) & Periods (1-7), Periodic Trends',
      '9.3 Chemical Reactions: Reactants, Products, Word & Balanced Chemical Equations'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['18.1', '18.2', '18.3', '18.4', '18.5', '19.1', '19.2', '19.3'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 9.1',
        title: 'Element Symbol and Atomic Number Matching',
        objective: 'To recall and associate symbols and atomic numbers for first 20 elements',
        materialsRequired: ['Element cards (H to Ca)', 'chart board'],
        localLowCostAlternatives: ['Cardboard flashcards made from scrap boxes'],
        methodSummary: 'Match symbols (Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca) with atomic numbers (1-20).',
        pageNumber: 251
      },
      {
        id: 'Activity 9.7',
        title: 'Human Periodic Table Grid Simulation',
        objective: 'To understand the organization of groups and periods through active student movement',
        materialsRequired: ['Chalk or lime powder', 'numbered placards (Roll 1 to 20)'],
        localLowCostAlternatives: ['School playground chalk markings', 'slate chalk'],
        methodSummary: 'Draw a chalk grid of groups 1, 2, 13-18 and periods 1-4 in the schoolyard. Students representing elements 1-20 step into their correct coordinates and explain their valence electrons.',
        pageNumber: 268
      },
      {
        id: 'Activity 9.8',
        title: 'Modeling Group 1 Alkali Metals Electron Shells',
        objective: 'To discover trends in atomic size and valence electrons down Group 1 (Li, Na, K)',
        materialsRequired: ['Yarn / colored thread', 'colored pulses/seeds', 'paper circles'],
        localLowCostAlternatives: ['Lentils (dal) as electrons, red beans as protons, dried peas as neutrons', 'thread circles for K, L, M shells'],
        methodSummary: 'Construct 2D models of Li (2,1), Na (2,8,1), and K (2,8,8,1). Observe that all have 1 valence electron while shells increase from 2 to 4.',
        pageNumber: 269
      }
    ],
    keyGlossary: [
      { term: 'Bohr and Bury\'s 2n² Rule', definition: 'The mathematical rule determining the maximum number of electrons in the nth energy shell (K=2, L=8, M=18, N=32).' },
      { term: 'Valency', definition: 'The combining capacity of an atom, measured by the number of electrons donated, accepted, or shared to achieve a stable octet or duplet.' },
      { term: 'Modern Periodic Law', definition: 'The physical and chemical properties of elements are the periodic function of their atomic numbers (Henry Moseley 1913).' }
    ]
  },
  {
    unitNumber: 10,
    title: 'Materials Used in Daily Life (Acids, Bases, Salts, Water Hardness, Alloys)',
    theme: 'Materials used in daily life',
    pageRange: 'Pages 277–305',
    summary: 'Acids (sour, H+ ions, organic vs inorganic, reactions with metals and carbonates); Bases (bitter, slippery, OH- ions, alkalis, neutralization); Salts (neutral, acidic, basic); Acid rain causes & impacts; Water hardness (temporary vs permanent, boiling, Clark\'s method, Permutit zeolite method); Metal alloys (steel, stainless steel, brass, bronze, duralumin, 22-carat gold).',
    topics: [
      '10.1 Acids, Bases and Salts: Definitions, Physical & Chemical Properties, Natural & Synthetic Indicators',
      '10.1.1 Chemical Reactions: Acid + Metal -> Salt + H2; Acid + Carbonate -> Salt + H2O + CO2; Neutralization',
      '10.1.2 Everyday Uses of Acids, Bases (Antacids, Whitewash) and Salts (NaCl, Na2CO3, NaHCO3)',
      '10.2 Acid Rain: Formation (SO2, NO2 + Rain), Harmful Effects & Prevention Measures',
      '10.3 Hardness of Water: Soft vs Hard Water, Temporary (Bicarbonates) vs Permanent (Sulphates/Chlorides), Clark\'s & Permutit Methods',
      '10.4 Metal Alloys: Definition, Properties & Common Examples (Steel, Stainless Steel, Brass, Bronze, 22-Carat Gold)'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['20.1', '20.2', '20.3', '21.1', '21.2', '21.3', '22.1'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 10.4',
        title: 'Reaction between Acid and Metal (Mg Ribbon + Dilute HCl)',
        objective: 'To observe hydrogen gas evolution and test with pop sound',
        materialsRequired: ['Magnesium ribbon', 'dilute hydrochloric acid', 'test tube', 'matchsticks'],
        localLowCostAlternatives: ['Zinc from discarded dry cell case', 'lemon juice / vinegar if lab acid unavailable'],
        methodSummary: 'Add magnesium strip to dilute HCl in test tube. Observe effervescence. Bring burning splint near mouth; hear characteristic \'pop\' explosion.',
        safetyPrecautions: 'Wear safety goggles; point test tube away from faces.',
        pageNumber: 280
      },
      {
        id: 'Activity 10.8',
        title: 'Testing Properties of Base using Wood Ash Water',
        objective: 'To test slippery touch, alkaline pH, and indicator reactions of wood ash',
        materialsRequired: ['Wood ash', 'water', 'filter paper / cloth', 'red & blue litmus', 'phenolphthalein'],
        localLowCostAlternatives: ['Wood ash from kitchen hearth/chulo', 'fine cotton cloth filter', 'hibiscus flower strip indicator'],
        methodSummary: 'Dissolve wood ash in water and filter. Feel soapy/slippery filtrate. Test with red litmus (turns blue). Mix with turmeric (turns deep red).',
        pageNumber: 284
      },
      {
        id: 'Activity 10.13',
        title: 'Testing Hardness of Water from Different Sources',
        objective: 'To compare lather formation with soap in rainwater, well water, and tap water',
        materialsRequired: ['3 beakers with water samples (rainwater, tube-well, pond water)', 'liquid soap / soap flakes', 'dropper'],
        localLowCostAlternatives: ['Recycled glass tumblers', 'common bathing soap flakes', 'rainwater vs groundwater'],
        methodSummary: 'Add 2 drops of soap solution to 20ml of each sample. Shake vigorously for 30 seconds. Rainwater produces abundant frothy lather (soft); well water forms curd-like scum (hard).',
        pageNumber: 294
      }
    ],
    keyGlossary: [
      { term: 'Neutralization Reaction', definition: 'The chemical reaction between an acid and a base producing a salt and water: Acid + Base -> Salt + Water.' },
      { term: 'Acid Rain', definition: 'Rainwater with high acidity (low pH) caused by dissolved sulphur dioxide and nitrogen oxides in the atmosphere.' },
      { term: 'Temporary Hardness', definition: 'Water hardness caused by dissolved calcium and magnesium bicarbonates, removable by simple boiling or Clark\'s lime method.' },
      { term: 'Alloy', definition: 'A homogeneous solid mixture of two or more metals, or a metal with a non-metal, exhibiting superior strength, hardness, and corrosion resistance.' }
    ]
  },
  {
    unitNumber: 11,
    title: 'The Earth and Universe (Minerals, Origin of Earth, Astronomy)',
    theme: 'Earth and the space',
    pageRange: 'Pages 306–337',
    summary: 'Earth\'s crust & minerals (metallic: ferrous, non-ferrous, precious; non-metallic: gems & non-gems; energy minerals); Mineral resources in Nepal (>60 types, 83% in Himalayas); Origin hypotheses (Nebular Kant-Laplace, Planetesimal Buffon, Binary, Tidal Jeans-Jeffreys); Geological Time Scale (Cryptozoic & Phanerozoic Eons, eras, mass extinction); Universe & Big Bang (Hubble, Lemaître); Asteroids, Comets, Meteors, Galaxies, and Constellations (88 total, 12 zodiacs).',
    topics: [
      '11.1 Minerals: Classification (Metallic, Non-Metallic, Energy Minerals) & Industrial Utility',
      '11.1.2 Minerals of Nepal: Geographic Distribution & Sustainable Extraction (Iron, Copper, Gold, Uranium)',
      '11.2 Origin & Age of Earth (4.6 Billion Years): Nebular, Planetesimal, Binary & Tidal Hypotheses',
      '11.2.2 Geological Time Scale: Cryptozoic Eon & Phanerozoic Eon (Palaeozoic, Mesozoic & Cenozoic Eras)',
      '11.3 Universe & Astronomy: Big Bang Theory (13.8 Billion Years), Hubble\'s Expansion',
      '11.3.1 Solar System Members: Asteroid Belt & Trojans, Comets (Nucleus, Coma, Tail), Meteors & Meteorites',
      '11.3.2 Galaxies (Milky Way) & Constellations (88 Identified, 12 Zodiacs, Navigation Use)'
    ],
    learningOutcomes: OFFICIAL_GRADE_8_LOS.filter(lo => ['23.1', '23.2', '23.3', '24.1', '24.2', '24.3'].includes(lo.id)),
    textbookActivities: [
      {
        id: 'Activity 11.1',
        title: 'Local Mineral and Stone Specimen Collection',
        objective: 'To collect and classify local mineral/rock samples by color, shape, luster, and hardness',
        materialsRequired: ['Field rock samples', 'magnifying lens', 'iron nail for scratch test', 'table chart'],
        localLowCostAlternatives: ['Riverbed pebbles, road aggregate stones, local red/white clay, limestone pieces'],
        methodSummary: 'Collect 5 distinct rock specimens from surrounding paths. Perform scratch test with nail. Tabulate color, crystal shape, metallic sheen vs earthy luster.',
        pageNumber: 306
      },
      {
        id: 'Activity 11.3',
        title: 'Modeling Asteroids and Solar System Orbits',
        objective: 'To build a physical scale model showing the Asteroid Belt between Mars and Jupiter and the Kuiper Belt',
        materialsRequired: ['Potter\'s clay', 'cardboard sheet', 'compass', 'paint/markers'],
        localLowCostAlternatives: ['Dough/clay balls', 'recycled cardboard carton', 'twigs/sticks'],
        methodSummary: 'Draw circular planetary orbits on cardboard. Mold irregular tiny clay crumbs to represent asteroids clustered between Mars and Jupiter and in Kuiper belt.',
        pageNumber: 325
      }
    ],
    keyGlossary: [
      { term: 'Mineral', definition: 'A naturally occurring, inorganic solid substance with a definite chemical composition and crystalline structure.' },
      { term: 'Nebular Hypothesis', definition: 'The theory proposed by Immanuel Kant (1755) and Pierre Simon Laplace (1796) that the solar system evolved from a spinning cloud of hot gas and dust.' },
      { term: 'Light Year', definition: 'The astronomical distance travelled by light in a vacuum in one year, equal to approximately 9.46 x 10¹² km.' },
      { term: 'Constellation', definition: 'A recognizable pattern or grouping of stars in the night sky (88 officially recognized, including 12 zodiacs).' }
    ]
  }
];

export const CAMBRIDGE_LESSON_PLAN_PROMPT_TEMPLATE = `
System Role & Objective
You are an expert curriculum designer and STEAM educator. Your task is to act as a specialized lesson plan generator. You will receive a base textbook context, a list of official Learning Outcomes (LOs), and a specific Lesson Plan Template provided in the system materials or user context.

Input Processing
1. Textbook Context: Use only the content, examples, and local context provided in the attached textbook materials (Nepal CDC Grade 8 Science and Technology).
2. Learning Outcomes (LOs): Align every learning target directly with the provided LOs (numbered e.g., 1.1 to 24.3).
3. Lesson Plan Template: You MUST strictly adopt and adhere to the structural layout, section headers, tables, and fields provided in the user's uploaded or specified template (Cambridge Lower Secondary Lesson Plan Template). Do not introduce alternative formats unless explicitly asked.
4. User Input: The user will specify the Chapter Name/Number, Target Grade/Class, and any specific topic focus.

Generation Rules
- Strict Template Adherence: Output the lesson plan using exact section names and structure from the provided template:
  * CLASS: [Target Class & Section]
  * DATE: [Date]
  * Learning objectives: Direct mapping to curriculum LOs with official IDs
  * Lesson focus: Specific, realistic and achievable amount of learning
  * Previous learning: Prior knowledge + diagnostic check method
  * Plan Table with:
    - Beginning (5–10 minutes): grab learners' attention, establish context, share objectives, set expectations
    - Main activities: develop skills and knowledge, practise techniques, apply knowledge, explore concepts, solve problems, with formative assessment guidance
    - End / Reflection / Summary: reflect on learning, set targets for next lesson, evaluate work
    - Notes column: Books, physical resources, web links
  * Reflection:
    - Were the learning objectives/lesson focus realistic? What did the learners learn today?
    - What was the learning atmosphere like?
    - Did I stick to timings?
    - What changes did I make from my plan and why?
  * Summary evaluation:
    - What two things really went well (both teaching and learning)? 1: ..., 2: ...
    - What two things would have improved the lesson (both teaching and learning)? 1: ..., 2: ...
    - What have I learned from this lesson about the class or individuals that will inform my next lesson?
  * Next steps: What will I teach next based on learners' understanding of this lesson?
- Low-Resource & Hands-On Focus: Prioritize low-cost, locally available materials (clay, bamboo, water bottles, onion peels, wood ash, scrap wire, coins, seeds, garden soil) and interactive teaching over digital tools. Practical activities must fit real-world classroom constraints.
- Pedagogical Alignment: Directly map classroom tasks to the provided Learning Outcomes and textbook content.
- Language & Tone: Write in clear, direct, and actionable prose. Avoid educational jargon, inflated claims, and AI clichés. Prioritize concrete teacher actions and student tasks.
`;
