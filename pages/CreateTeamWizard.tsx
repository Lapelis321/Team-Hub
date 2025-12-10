import React, { useState, useMemo } from 'react';
import { NavigationFn, Page, Team, TeamAnswers, QuestionOption } from '../types';
import { WIZARD_QUESTIONS } from '../constants';
import Button from '../components/Button';
import useLocalStorage from '../hooks/useLocalStorage';

interface CreateTeamWizardProps {
  navigate: NavigationFn;
  startFromStep1?: boolean;
}

const initialAnswers: TeamAnswers = {
  name: '', industry: '', companySize: '', mainGoal: '', biggestChallenge: '',
  teamSize: '', roleTypes: '', decisionMaking: '', teamIndependence: '',
  workLocation: '', workPace: '', taskAssignment: '', slowsDown: [],
  motivatesMost: [], demotivatesFastest: [], feedbackFrequency: '',
  openSpeaking: '', leadershipStyle: '', controlPreference: '', decisionSpeed: ''
};

const CreateTeamWizard: React.FC<CreateTeamWizardProps> = ({ navigate, startFromStep1 = false }) => {
  const [step, setStep] = useState(startFromStep1 ? 1 : 0);
  const [answers, setAnswers] = useState<TeamAnswers>(initialAnswers);
  const [explanation, setExplanation] = useState('');
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', []);

  const totalQuestions = WIZARD_QUESTIONS.length;
  const currentQuestion = step > 0 ? WIZARD_QUESTIONS[step - 1] : null;

  const isAnswered = useMemo(() => {
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.key];
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return !!answer;
  }, [answers, currentQuestion]);
  
  const handleNext = () => {
    if (step < totalQuestions + 1) {
      setStep(step + 1);
      setExplanation('');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setExplanation('');
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      const key = currentQuestion.key;
      setAnswers(prev => ({
        ...prev,
        [key]: initialAnswers[key],
      }));
    }
    handleNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.key]: e.target.value });
  };
  
  const handleOptionChange = (value: string, option: QuestionOption) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.key]: value });
    setExplanation(option.explanation);
  };

  const handleCheckboxChange = (value: string, option: QuestionOption, isChecked: boolean) => {
    if (!currentQuestion) return;
    const key = currentQuestion.key as keyof TeamAnswers;
    const currentValues = (answers[key] as string[] || []);

    let newValues: string[];
    
    if (isChecked) {
        newValues = [...currentValues, value];
    } else {
        newValues = currentValues.filter(v => v !== value);
    }
    
    setAnswers({ ...answers, [key]: newValues });
    setExplanation(isChecked ? option.explanation : '');
  };

  const createTeam = () => {
    const newTeam: Team = {
      ...answers,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setTeams([...teams, newTeam]);
    navigate({ page: Page.Main });
  };
  
  const renderIntro = () => (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Create Your Team Profile</h1>
      <p className="mt-4 text-lg text-gray-600">
        Answering these questions will help us understand your company and team context. This makes it possible to give the most accurate responses later.
      </p>
      <Button onClick={() => setStep(1)} className="mt-8 px-8 py-3 text-lg">Start</Button>
    </div>
  );

  const renderFinalStep = () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-primary mb-2">Almost there!</h2>
      <p className="text-gray-600 mb-6">Finally, give your team a name.</p>
      <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
      <input
        type="text"
        id="teamName"
        value={answers.name}
        onChange={(e) => setAnswers({...answers, name: e.target.value})}
        className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="e.g., Marketing Squad, Project Phoenix"
      />
       <div className="mt-8 flex justify-between items-center">
        <Button variant="secondary" onClick={handleBack}>Back</Button>
        <Button onClick={createTeam} disabled={!answers.name.trim()}>Create Team</Button>
      </div>
    </div>
  );
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    const { question, type, options, key } = currentQuestion;
    const answer = answers[key];
    const groupProgress = WIZARD_QUESTIONS.filter(q => q.group === currentQuestion.group).findIndex(q => q.key === key) + 1;
    const groupTotal = WIZARD_QUESTIONS.filter(q => q.group === currentQuestion.group).length;

    return (
      <div className="w-full max-w-2xl">
        <p className="text-sm font-semibold text-primary">{currentQuestion.group} ({groupProgress}/{groupTotal})</p>
        <h2 className="text-2xl md:text-3xl font-bold text-near-black mt-2">{question}</h2>
        <div className="mt-6 space-y-4">
          {type === 'text' && (
            <textarea
              rows={3}
              value={answer as string}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          )}
          {type === 'radio' && options && options.map(opt => (
            <label key={opt.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${answer === opt.value ? 'bg-blue-100 border-primary shadow-sm' : 'bg-surface border-border'}`}>
              <input type="radio" name={key} value={opt.value} checked={answer === opt.value} onChange={() => handleOptionChange(opt.value, opt)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
              <span className="ml-3 text-near-black">{opt.value}</span>
            </label>
          ))}
          {type === 'checkbox' && options && options.map(opt => (
            <label key={opt.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${(answer as string[]).includes(opt.value) ? 'bg-blue-100 border-primary shadow-sm' : 'bg-surface border-border'}`}>
              <input type="checkbox" name={opt.value} checked={(answer as string[]).includes(opt.value)} onChange={(e) => handleCheckboxChange(opt.value, opt, e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <span className="ml-3 text-near-black">{opt.value}</span>
            </label>
          ))}
        </div>
        
        {explanation && <div className="mt-4 p-3 bg-surface border-l-4 border-border text-slate-700 rounded-r-lg transition-opacity duration-300 opacity-100"><p>{explanation}</p></div>}
        
        <div className="mt-8 flex justify-between items-center">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleSkip}>Skip question</Button>
            <Button onClick={handleNext} disabled={!isAnswered}>Next</Button>
          </div>
        </div>
      </div>
    );
  }

  const progress = step > 0 ? ((step-1) / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      {step > 0 && (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-primary">Progress</span>
                <span className="text-sm font-medium text-primary">{step > totalQuestions ? 'Final Step' : `Step ${step} of ${totalQuestions}`}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      )}
      {step === 0 && renderIntro()}
      {step > 0 && step <= totalQuestions && renderQuestion()}
      {step > totalQuestions && renderFinalStep()}
    </div>
  );
};

export default CreateTeamWizard;