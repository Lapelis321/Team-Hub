export interface Team {
  id: string;
  name: string;
  industry: string;
  companySize: string;
  mainGoal: string;
  biggestChallenge: string;
  teamSize: string;
  roleTypes: string;
  decisionMaking: string;
  teamIndependence: string;
  workLocation: string;
  workPace: string;
  taskAssignment: string;
  slowsDown: string[];
  motivatesMost: string[];
  demotivatesFastest: string[];
  feedbackFrequency: string;
  openSpeaking: string;
  leadershipStyle: string;
  controlPreference: string;
  decisionSpeed: string;
  createdAt: string;
}

export type TeamAnswers = Omit<Team, 'id' | 'createdAt'>;

export enum Page {
  Main,
  About,
  CreateTeam,
  TeamDetail,
}

export type CurrentPage =
  | { page: Page.Main }
  | { page: Page.About }
  | { page: Page.CreateTeam; startFromStep1?: boolean }
  | { page: Page.TeamDetail; teamId: string };

export type NavigationFn = (page: CurrentPage) => void;

export interface QuestionOption {
  value: string;
  explanation: string;
}

export interface Question {
  group: string;
  question: string;
  key: keyof Omit<TeamAnswers, 'name'>;
  type: 'text' | 'radio' | 'checkbox';
  options?: QuestionOption[];
}