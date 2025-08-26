import React, { useRef } from 'react';
import type { Breed } from '@/types';

interface BreedCardProps {
  breed: Breed;
  onClick?: (breed: Breed, triggerRef?: React.RefObject<HTMLElement>) => void; // Update to pass ref
}

const BreedCard: React.FC<BreedCardProps> = ({ breed, onClick }) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onClick?.(breed, cardRef);
  };

  return (
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
  );
};

export default BreedCard;