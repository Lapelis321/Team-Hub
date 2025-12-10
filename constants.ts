
import { Question } from './types';

export const WIZARD_QUESTIONS: Question[] = [
  // Step 1: Company Context
  { group: 'Company Context', question: 'What industry is your company in?', key: 'industry', type: 'text' },
  {
    group: 'Company Context', question: 'How big is your company?', key: 'companySize', type: 'radio',
    options: [
      { value: '1–10', explanation: 'A small, agile team where direct communication is key.' },
      { value: '11–50', explanation: 'A growing company where processes are starting to formalize.' },
      { value: '51–200', explanation: 'A mid-sized business with multiple departments and layers.' },
      { value: '200+', explanation: 'A large organization where scalability and alignment are critical.' },
    ],
  },
  { group: 'Company Context', question: 'What is your main goal for the next 6–12 months?', key: 'mainGoal', type: 'text' },
  { group: 'Company Context', question: 'What is your biggest current challenge?', key: 'biggestChallenge', type: 'text' },

  // Step 2: Team Setup
  {
    group: 'Team Setup', question: 'How many people are in your team?', key: 'teamSize', type: 'radio',
    options: [
      { value: '1–3', explanation: 'A small, focused unit. Roles may be fluid.' },
      { value: '4–7', explanation: 'A standard-sized team, ideal for collaboration without too much overhead.' },
      { value: '8–15', explanation: 'A larger team that may need sub-groups or clear role definitions.' },
      { value: '16+', explanation: 'A very large team or department, requiring strong structure.' },
    ],
  },
  {
    group: 'Team Setup', question: 'What type of roles do they have?', key: 'roleTypes', type: 'radio',
    options: [
      { value: 'Creative', explanation: 'Roles focused on design, content, and ideation.' },
      { value: 'Technical', explanation: 'Roles focused on engineering, data, and development.' },
      { value: 'Mixed', explanation: 'A cross-functional team with a blend of skills.' },
    ],
  },
  {
    group: 'Team Setup', question: 'Is decision-making mostly:', key: 'decisionMaking', type: 'radio',
    options: [
      { value: 'Manager-led', explanation: 'Decisions are made top-down for speed and clarity.' },
      { value: 'Shared', explanation: 'The team decides together, fostering ownership and buy-in.' },
    ],
  },
  {
    group: 'Team Setup', question: 'How independent is your team?', key: 'teamIndependence', type: 'radio',
    options: [
      { value: 'Low', explanation: 'The team requires frequent guidance and supervision.' },
      { value: 'Medium', explanation: 'The team handles defined tasks but needs direction on goals.' },
      { value: 'High', explanation: 'The team is self-sufficient and drives its own projects.' },
    ],
  },

  // Step 3: Work Style
  {
    group: 'Work Style', question: 'Is the team working:', key: 'workLocation', type: 'radio',
    options: [
      { value: 'Onsite', explanation: 'Collaboration happens in-person in a shared office.' },
      { value: 'Hybrid', explanation: 'A mix of in-office and remote work offers flexibility.' },
      { value: 'Remote', explanation: 'The team is fully distributed and works from anywhere.' },
    ],
  },
  {
    group: 'Work Style', question: 'Is work mostly:', key: 'workPace', type: 'radio',
    options: [
      { value: 'Project-based', explanation: 'Work is organized around distinct projects with clear start and end dates.' },
      { value: 'Task-based', explanation: 'Work consists of ongoing, individual tasks.' },
    ],
  },
  {
    group: 'Work Style', question: 'How are tasks usually assigned?', key: 'taskAssignment', type: 'radio',
    options: [
      { value: 'Manager assigns', explanation: 'A top-down approach ensuring alignment with priorities.' },
      { value: 'Self-selects', explanation: 'Team members choose their own tasks, promoting autonomy.' },
      { value: 'Mixed', explanation: 'A combination of assigned tasks and self-selection.' },
    ],
  },
  {
    group: 'Work Style', question: 'What slows your team down the most?', key: 'slowsDown', type: 'checkbox',
    options: [
      { value: 'Too many approvals', explanation: 'Bureaucracy and red tape can stifle momentum.' },
      { value: 'Poor communication', explanation: 'Misunderstandings and information silos create friction.' },
      { value: 'Low motivation', explanation: 'A lack of engagement can impact productivity.' },
      { value: 'Unclear priorities', explanation: 'When everything is a priority, nothing is.' },
      { value: 'Burnout', explanation: 'Overworked teams eventually become less effective.' },
    ],
  },

  // Step 4: Motivation & Feedback
  {
    group: 'Motivation & Feedback', question: 'What motivates your team most?', key: 'motivatesMost', type: 'checkbox',
    options: [
      { value: 'Money', explanation: 'Competitive compensation is a primary driver.' },
      { value: 'Growth', explanation: 'Opportunities for learning and career advancement.' },
      { value: 'Meaning', explanation: 'A connection to the company\'s mission and impact.' },
      { value: 'Flexibility', explanation: 'Autonomy over when and where work is done.' },
    ],
  },
  {
    group: 'Motivation & Feedback', question: 'What demotivates them fastest?', key: 'demotivatesFastest', type: 'checkbox',
    options: [
      { value: 'Toxic feedback', explanation: 'Negative or poorly delivered feedback can destroy morale.' },
      { value: 'Pressure', explanation: 'Unrealistic deadlines and constant pressure lead to burnout.' },
      { value: 'No results', explanation: 'Working hard without seeing impact is demoralizing.' },
      { value: 'Low pay', explanation: 'Feeling undervalued financially is a powerful demotivator.' },
      { value: 'No recognition', explanation: 'A lack of appreciation for hard work can kill motivation.' },
    ],
  },
  {
    group: 'Motivation & Feedback', question: 'How often do you give feedback?', key: 'feedbackFrequency', type: 'radio',
    options: [
      { value: 'Daily', explanation: 'Constant, informal feedback keeps everyone aligned.' },
      { value: 'Weekly', explanation: 'Regular check-ins provide consistent guidance.' },
      { value: 'Monthly', explanation: 'Structured feedback sessions on a monthly basis.' },
      { value: 'Rarely', explanation: 'Feedback is infrequent, reserved for major events or reviews.' },
    ],
  },
  {
    group: 'Motivation & Feedback', question: 'Do team members feel safe to speak openly?', key: 'openSpeaking', type: 'radio',
    options: [
      { value: 'Yes', explanation: 'High psychological safety allows for honest and open discussion.' },
      { value: 'Sometimes', explanation: 'Safety depends on the topic or people involved.' },
      { value: 'No', explanation: 'Team members are hesitant to share their true thoughts.' },
    ],
  },

  // Step 5: Manager Profile
  {
    group: 'Manager Profile', question: 'What is your leadership style?', key: 'leadershipStyle', type: 'radio',
    options: [
      { value: 'Directive', explanation: 'Providing clear instructions and closely monitoring tasks.' },
      { value: 'Supportive', explanation: 'Focusing on relationships and team well-being.' },
      { value: 'Coaching', explanation: 'Developing team members\' skills and empowering them.' },
    ],
  },
  {
    group: 'Manager Profile', question: 'How much control do you prefer?', key: 'controlPreference', type: 'radio',
    options: [
      { value: 'Low', explanation: 'Prefer to give the team full autonomy and trust.' },
      { value: 'Medium', explanation: 'Set the direction but let the team figure out the "how".' },
      { value: 'High', explanation: 'Closely involved in the details of the work.' },
    ],
  },
  {
    group: 'Manager Profile', question: 'How fast do you usually make decisions?', key: 'decisionSpeed', type: 'radio',
    options: [
      { value: 'Fast', explanation: 'Prioritize speed and action, willing to adjust course later.' },
      { value: 'Balanced', explanation: 'Take time to gather data but avoid analysis paralysis.' },
      { value: 'Slow', explanation: 'Prefer to be thorough and deliberate, ensuring the right choice.' },
    ],
  },
];

export const ABOUT_TEXT = {
  title: "About Team Hub & Massalati's Theory",
  subtitle: "A new framework for a new generation of work.",
  sections: [
    {
      heading: "WHY A NEW MANAGEMENT THEORY IS NEEDED",
      content: "Traditional management models were designed for the industrial age—think factory lines and top-down control. Theories like Taylorism emphasized efficiency through rigid processes and strict hierarchies. While effective for repetitive tasks, these models clash with the needs of modern knowledge work and a new generation of talent. \n\nFor Gen Z, this friction leads to burnout, disengagement, and a lack of autonomy. The old \"carrot-and-stick\" approach to motivation is no longer enough. We need a system built on trust, purpose, and freedom, not just control and compliance."
    },
    {
      heading: "WHAT MASSALATI’S THEORY IS",
      content: "Massalati’s Theory is a management framework designed to replace outdated control mechanisms with principles of freedom and engagement. It recognizes that today's greatest asset is individual talent, which thrives in an environment of trust and autonomy. \n\nThe core idea is simple: manage the work, not the worker. By focusing on outcomes and creating the right conditions for success, teams become more innovative, resilient, and motivated."
    },
    {
      heading: "THE SIX PILLARS",
      content: "1. Freedom – Granting team members autonomy over how they approach their tasks. \n2. Flexibility – Allowing choice over when and where work gets done. \n3. Comfortable Environment – Fostering psychological safety where people can experiment without fear. \n4. Payment by Done Tasks – Measuring value by results, not hours. \n5. General Engagement – Connecting work to a meaningful mission. \n6. Alternativity (Choice) – Giving people options in tasks, tools, and growth paths."
    },
    {
      heading: "HOW IT REPLACES OLD MANAGEMENT",
      content: "Instead of supervision and pressure, it relies on clarity and context. Instead of enforcing rules, it establishes principles. The manager becomes a coach and a barrier-remover, not a controller."
    },
    {
      heading: "WHY IT FITS GEN Z",
      content: "Gen Z values purpose, balance, authenticity, and fast feedback. The six pillars directly support these values."
    },
    {
      heading: "HOW THIS APP APPLIES THE THEORY",
      content: "Team Hub creates transparent team profiles that define how a team works and what drives it. This clarity builds trust and enables freedom, flexibility, and engagement in real practice."
    },
    {
      heading: "THE MAIN GOAL",
      content: "To build high-performing teams that are sustainable, motivating, and human-centered."
    }
  ]
};
