import React, { useState, useEffect } from 'react';
import { NavigationFn, Page, Team, Question } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { BackIcon, OptionsIcon, CloseIcon } from '../components/icons';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { WIZARD_QUESTIONS } from '../constants';

interface TeamDetailPageProps {
  navigate: NavigationFn;
  teamId: string;
}

// OPTIMIZATION: Create a map for faster question lookup (O(1) vs O(n))
const questionsMap = WIZARD_QUESTIONS.reduce((acc, q) => {
  acc[q.key] = q;
  return acc;
}, {} as Record<string, Question>);

const DetailItem: React.FC<{ label: string; value: string | string[] }> = ({ label, value }) => (
  <div>
    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
    <p className="mt-1 text-base text-near-black font-medium">{Array.isArray(value) ? value.join(', ') || 'N/A' : value || 'N/A'}</p>
  </div>
);

const EditItem: React.FC<{ label: string; value: string | string[]; name: keyof Team; onChange: (name: keyof Team, value: any) => void; }> = ({ label, value, name, onChange }) => {
  const question = questionsMap[name as keyof typeof questionsMap];

  if (!question) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(name, e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {question.type === 'text' && (
        <textarea
          rows={2}
          value={value as string}
          onChange={(e) => onChange(name, e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm"
        />
      )}
      {(question.type === 'radio') && (
        <select value={value as string} onChange={(e) => onChange(name, e.target.value)} className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm">
          {question.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
        </select>
      )}
      {(question.type === 'checkbox') && (
        <div className="mt-2 space-y-2">
          {question.options?.map(opt => (
            <label key={opt.value} className="flex items-center">
              <input
                type="checkbox"
                checked={(value as string[]).includes(opt.value)}
                onChange={(e) => {
                  const currentValues = value as string[];
                  const newValues = e.target.checked ? [...currentValues, opt.value] : currentValues.filter(v => v !== opt.value);
                  onChange(name, newValues);
                }}
                className="h-4 w-4 text-primary rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{opt.value}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};


const TeamDetailPage: React.FC<TeamDetailPageProps> = ({ navigate, teamId }) => {
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', []);
  const [team, setTeam] = useState<Team | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeam, setEditedTeam] = useState<Team | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  useEffect(() => {
    const foundTeam = teams.find(t => t.id === teamId) || null;
    setTeam(foundTeam);
    setEditedTeam(foundTeam);
  }, [teamId, teams]);

  if (!team || !editedTeam) {
    return <div className="text-center p-8">Team not found.</div>;
  }
  
  const handleSave = () => {
    setTeams(teams.map(t => t.id === teamId ? editedTeam : t));
    setIsEditing(false);
  };

  const handleDelete = () => {
    setTeams(teams.filter(t => t.id !== teamId));
    navigate({ page: Page.Main });
  };
  
  const handleEditChange = (name: keyof Team, value: any) => {
    setEditedTeam(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const sections = {
    "Company Context": ["industry", "companySize", "mainGoal", "biggestChallenge"],
    "Team Setup": ["teamSize", "roleTypes", "decisionMaking", "teamIndependence"],
    "Work Style": ["workLocation", "workPace", "taskAssignment", "slowsDown"],
    "Motivation & Feedback": ["motivatesMost", "demotivatesFastest", "feedbackFrequency", "openSpeaking"],
    "Manager Profile": ["leadershipStyle", "controlPreference", "decisionSpeed"],
  };

  const getLabel = (key: string) => questionsMap[key as keyof typeof questionsMap]?.question || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
  return (
    <div className="min-h-[calc(100vh-5rem)]">
        <div className="bg-surface border-b border-border">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Button variant="ghost" onClick={() => navigate({ page: Page.Main })}>
                    <BackIcon className="w-5 h-5 mr-2" />
                    Back to Teams
                </Button>
                <h1 className="text-xl font-bold text-primary">{team.name}</h1>
                <div className="relative">
                    <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <OptionsIcon className="w-5 h-5"/>
                    </Button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsEditing(true); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-near-black hover:bg-slate-100">Edit Team</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsDeleteModalOpen(true); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Team</a>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {isEditing && (
             <div className="mb-6 p-4 bg-blue-100 border-l-4 border-primary rounded-r-md flex justify-between items-center">
                 <p className="text-primary font-medium">You are in edit mode.</p>
                 <div>
                    <Button variant="secondary" onClick={() => { setIsEditing(false); setEditedTeam(team); }} className="mr-2">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                 </div>
             </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(sections).map(([title, keys]) => (
                <div key={title} className="bg-surface p-6 rounded-lg shadow-sm space-y-6">
                    <h3 className="text-lg font-semibold text-primary border-b pb-2">{title}</h3>
                    {keys.map(key => (
                       isEditing ? (
                        <EditItem
                          key={key}
                          label={getLabel(key)}
                          value={editedTeam[key as keyof Team]}
                          name={key as keyof Team}
                          onChange={handleEditChange}
                        />
                       ) : (
                        <DetailItem
                          key={key}
                          label={getLabel(key)}
                          value={editedTeam[key as keyof Team]}
                        />
                       )
                    ))}
                </div>
            ))}
          </div>
        </div>

        <button onClick={() => setIsAiPanelOpen(true)} className="fixed bottom-6 right-6 bg-primary text-white rounded-full shadow-lg h-16 w-16 flex items-center justify-center text-2xl font-bold hover:bg-primary-light transition-transform hover:scale-110">
            AI
        </button>

        <Modal isOpen={isAiPanelOpen} onClose={() => setIsAiPanelOpen(false)} title="AI Panel">
            <div className="text-center text-gray-500">
                <p>AI features are coming soon.</p>
            </div>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Team">
            <p>This will permanently delete "{team.name}". This action cannot be undone.</p>
            <div className="flex justify-end space-x-4 mt-6">
                <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
        </Modal>
    </div>
  );
};

export default TeamDetailPage;