// EGER Curated Educational Resource Hub Database
const EGER_RESOURCES = [
  // --- ENTRANCE EXAM RESOURCES ---
  {
    id: "ent-1",
    category: "entrance",
    type: "youtube",
    title: "Dan Academy (दान Academy)",
    description: "In-depth video tutorials covering Grade 11 & 12 Mathematics, Physics, and Chemistry aligned with the Ethiopian national curriculum.",
    author: "Dan Academy",
    badge: "Most Popular",
    link: "https://www.youtube.com/@DanAcademy",
    tags: ["Grade 12", "STEM", "Video Tutorials"]
  },
  {
    id: "ent-2",
    category: "entrance",
    type: "youtube",
    title: "Ethiopian Education YouTube",
    description: "Comprehensive step-by-step lectures on Natural Science and Social Science entrance exam subjects, past paper solutions and tips.",
    author: "Ethiopian Education",
    badge: "Verified Curriculum",
    link: "https://www.youtube.com/@EthiopianEducation",
    tags: ["Natural Science", "Social Science", "Solutions"]
  },
  {
    id: "ent-3",
    category: "entrance",
    type: "youtube",
    title: "Neat Academy & MasterKey",
    description: "Focused crash courses, fast problem-solving techniques, and high-yield topic reviews for Matric & Entrance students.",
    author: "Neat Academy",
    badge: "Exam Strategies",
    link: "https://www.youtube.com/@NeatAcademy",
    tags: ["Crash Course", "Shortcuts", "Matric"]
  },
  {
    id: "ent-4",
    category: "entrance",
    type: "book",
    title: "MoE Official Grade 9-12 Textbooks",
    description: "The primary source for all national entrance exam questions. Over 85% of exam conceptual questions are derived directly from the textbook examples and summary boxes.",
    author: "Ministry of Education (Ethiopia)",
    badge: "Must Read 100%",
    link: "#entrance-guide",
    tags: ["Core Textbooks", "Curriculum", "Foundation"]
  },
  {
    id: "ent-5",
    category: "entrance",
    type: "book",
    title: "Extreme Series (Physics, Chem, Bio, Maths)",
    description: "High-yield reference books with condensed theory, chapter summaries, and thousands of topic-specific practice questions with answer keys.",
    author: "Extreme Publishers",
    badge: "Top Seller",
    link: "#entrance-resources",
    tags: ["Practice Questions", "Revision", "STEM"]
  },
  {
    id: "ent-6",
    category: "entrance",
    type: "book",
    title: "Aster Nega & Alpha Entrance Series",
    description: "Decade-long compilations of past entrance exam papers categorized by chapter and difficulty, with step-by-step explanatory solutions.",
    author: "Aster Nega / Alpha",
    badge: "Past Papers",
    link: "#entrance-resources",
    tags: ["Past Papers", "Solutions", "Classics"]
  },
  {
    id: "ent-7",
    category: "entrance",
    type: "website",
    title: "MoE Digital Education Portal & Telegram Banks",
    description: "Official bulletins, model exam releases, and student Telegram communities sharing digital PDFs, answer keys, and discussion channels.",
    author: "Community & MoE",
    badge: "Digital Community",
    link: "https://t.me/EGER_Prep",
    tags: ["Telegram", "PDFs", "Community"]
  },

  // --- DSAT (DIGITAL SAT) RESOURCES ---
  {
    id: "sat-1",
    category: "dsat",
    type: "website",
    title: "Official College Board Bluebook App",
    description: "The official testing app for the Digital SAT. Contains 6 official adaptive practice tests with real Desmos built-in and exact test day UI.",
    author: "College Board",
    badge: "Official & Essential",
    link: "https://bluebook.collegeboard.org/",
    tags: ["Adaptive Tests", "Software", "Official"]
  },
  {
    id: "sat-2",
    category: "dsat",
    type: "website",
    title: "Khan Academy Official DSAT Prep",
    description: "100% free, personalized practice in partnership with College Board. Diagnostic quizzes, leveled skill practice (Foundations to Advanced).",
    author: "Khan Academy & College Board",
    badge: "Free & Certified",
    link: "https://www.khanacademy.org/digital-sat",
    tags: ["Free Course", "Official Partner", "Adaptive"]
  },
  {
    id: "sat-3",
    category: "dsat",
    type: "website",
    title: "College Board Educator Question Bank",
    description: "Access over 3,500 real, active DSAT practice questions filtered by domain, skill, and difficulty (Hard, Medium, Easy).",
    author: "College Board",
    badge: "Secret Weapon",
    link: "https://satsuitequestionbank.collegeboard.org/",
    tags: ["Question Bank", "Hard Math", "Reading"]
  },
  {
    id: "sat-4",
    category: "dsat",
    type: "youtube",
    title: "PrepPros YouTube & Desmos Mastery",
    description: "Renowned for groundbreaking Desmos calculator hacks that solve 60%+ of Math questions in seconds without algebra.",
    author: "PrepPros (Matt & Michael)",
    badge: "1500+ Strategy",
    link: "https://www.youtube.com/@PrepPros",
    tags: ["Desmos Hacks", "Math 800", "Top Scorer"]
  },
  {
    id: "sat-5",
    category: "dsat",
    type: "youtube",
    title: "Tutor Dr. / Scalar Learning",
    description: "Live timed walkthroughs of real DSAT tests, explaining thought process, pacing, and trap avoidance in real time.",
    author: "Huzefa Snead (Scalar Learning)",
    badge: "Speed & Accuracy",
    link: "https://www.youtube.com/@ScalarLearning",
    tags: ["Live Solves", "Math 800", "Pacing"]
  },
  {
    id: "sat-6",
    category: "dsat",
    type: "book",
    title: "The Critical Reader & 4th Ed Grammar",
    description: "The gold standard book for DSAT Reading and Writing. Covers every punctuation rule, transition question, and rhetorical synthesis.",
    author: "Erica L. Meltzer",
    badge: "Bible of DSAT RW",
    link: "https://thecriticalreader.com/",
    tags: ["Reading", "Grammar", "750+ RW"]
  },
  {
    id: "sat-7",
    category: "dsat",
    type: "book",
    title: "The College Panda: DSAT Math (Advanced Guide)",
    description: "Clear explanations of every math topic on the exam, trick question patterns, and hundreds of difficult problem drills.",
    author: "Nielson Phu",
    badge: "Math Mastery",
    link: "https://thecollegepanda.com/",
    tags: ["Advanced Math", "Target 800", "Formulas"]
  },

  // --- SCHOLARSHIP & COLLEGE APPLICATION RESOURCES ---
  {
    id: "sch-1",
    category: "scholarship",
    type: "website",
    title: "Common App (Common Application)",
    description: "The central application platform for over 1,000 universities worldwide. Manages your essays, counselor recommendations, and fee waivers.",
    author: "Common Application Inc.",
    badge: "Application Hub",
    link: "https://www.commonapp.org/",
    tags: ["Applications", "Fee Waiver", "Essays"]
  },
  {
    id: "sch-2",
    category: "scholarship",
    type: "website",
    title: "College Essay Guy (Ethan Sawyer)",
    description: "The ultimate guide for crafting authentic, vulnerable personal statements. Includes free brainstorming exercises (Essence Objects, Values Exercise).",
    author: "Ethan Sawyer",
    badge: "Best Essay Guide",
    link: "https://www.collegeessayguy.com/",
    tags: ["Personal Statement", "Brainstorming", "Free Tools"]
  },
  {
    id: "sch-3",
    category: "scholarship",
    type: "website",
    title: "EducationUSA International Network",
    description: "U.S. Department of State network providing free advising, Opportunity Funds for application testing/visa costs, and competitive scholar cohorts.",
    author: "U.S. Department of State",
    badge: "Full Funding Ally",
    link: "https://educationusa.state.gov/",
    tags: ["Opportunity Funds", "Advising", "US Embassies"]
  },
  {
    id: "sch-4",
    category: "scholarship",
    type: "website",
    title: "Opportunity Desk & Youth Opportunities",
    description: "Daily updated portal of global fully-funded scholarships, international youth summits, competitions, and fellowship grants.",
    author: "Opportunity Desk",
    badge: "Global Opportunities",
    link: "https://opportunitydesk.org/",
    tags: ["Competitions", "Grants", "Youth Summits"]
  },
  {
    id: "sch-5",
    category: "scholarship",
    type: "program",
    title: "Yale Young Global Scholars (YYGS)",
    description: "Intensive 2-week academic summer enrichment program at Yale University with generous need-based financial aid for international students.",
    author: "Yale University",
    badge: "Prestigious Summer",
    link: "https://globalscholars.yale.edu/",
    tags: ["Summer Program", "Pre-College", "Leadership"]
  },
  {
    id: "sch-6",
    category: "scholarship",
    type: "program",
    title: "RISE Global Winners Program",
    description: "Funded by Schmidt Futures and Rhodes Trust for 15-17 year olds. Winners receive lifetime benefits including full 4-year university scholarships.",
    author: "Schmidt Futures & Rhodes Trust",
    badge: "Lifetime Scholarship",
    link: "https://www.risefortheworld.org/",
    tags: ["Full Ride", "Age 15-17", "Global Leaders"]
  },
  {
    id: "sch-7",
    category: "scholarship",
    type: "website",
    title: "r/IntltoUSA & r/ApplyingToCollege Communities",
    description: "Active Reddit forums of thousands of international students sharing verified full-ride financial aid packages, college list advice, and interview tips.",
    author: "Reddit Student Community",
    badge: "Crowdsourced Insights",
    link: "https://www.reddit.com/r/IntltoUSA/",
    tags: ["International Aid", "Case Studies", "AMA"]
  }
];
