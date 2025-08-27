import React, { useRef } from 'react';
import type { Breed } from '@/types';

interface BreedCardProps {
  breed: Breed;
  onClick?: (breed: Breed, triggerRef?: React.RefObject<HTMLElement>) => void;
  isSelected?: boolean;
  onToggleSelection?: (id: number) => void;
  showCheckbox?: boolean;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed, onClick, isSelected, onToggleSelection, showCheckbox }) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
      e.stopPropagation();
      return;
    }
    onClick?.(breed, cardRef);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggleSelection?.(breed.id);
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onToggleSelection?.(breed.id);
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      {showCheckbox && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            onKeyDown={handleCheckboxKeyDown}
            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            aria-label={`Select ${breed.name}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    <button
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      ref={cardRef}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{breed.name}</h2>
      <div className="space-y-1 text-sm">
        <p>
          <strong className="font-medium text-gray-600">Breed Group: </strong>
          <span>{breed.breed_group || '-'}</span>
        </p>
        <p>
          <strong className="font-medium text-gray-600">Life Span: </strong>
          <span>{breed.life_span || '-'}</span>
        </p>
        <p>
          <strong className="font-medium text-gray-600">Temperament: </strong>
          <span>{breed.temperament || '-'}</span>
        </p>
      </div>
    </button>
    </div>
  );
};

export default BreedCard;