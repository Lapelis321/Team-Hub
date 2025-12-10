import React from 'react';
import { Team } from '../types';
import { TrashIcon } from './icons';

interface TeamCardProps {
  team: Team;
  onClick: () => void;
  onDelete: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick, onDelete }) => {
  const shortInfo = `${team.teamSize} people | ${team.workLocation}`;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onClick}
      className="bg-surface group p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">{team.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{team.industry}</p>
          <p className="text-sm text-gray-500 mt-2">{shortInfo}</p>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Delete ${team.name}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TeamCard;