import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Team, NavigationFn, Page } from '../types';
import TeamCard from '../components/TeamCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { PlusIcon } from '../components/icons';

interface MainPageProps {
  navigate: NavigationFn;
}

const MainPage: React.FC<MainPageProps> = ({ navigate }) => {
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', []);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const handleDeleteConfirm = () => {
    if (teamToDelete) {
      setTeams(teams.filter(t => t.id !== teamToDelete.id));
      setTeamToDelete(null);
    }
  };
  
  const sortedTeams = [...teams].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (sortedTeams.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary">Create Your Team Profile</h1>
          <p className="mt-4 text-lg text-gray-600">
            Answering these questions will help us understand your company and team context. This makes it possible to give the most accurate responses later.
          </p>
          <Button 
            onClick={() => navigate({ page: Page.CreateTeam, startFromStep1: true })} 
            className="mt-8 px-8 py-3 text-lg"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Your First Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-near-black">Your Teams</h1>
        <Button onClick={() => navigate({ page: Page.CreateTeam })}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Create a Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onClick={() => navigate({ page: Page.TeamDetail, teamId: team.id })}
            onDelete={() => setTeamToDelete(team)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!teamToDelete}
        onClose={() => setTeamToDelete(null)}
        title="Delete Team"
      >
        <p>Are you sure you want to delete the team "{teamToDelete?.name}"? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="secondary" onClick={() => setTeamToDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;