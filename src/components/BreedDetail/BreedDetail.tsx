import React from 'react';
import type { Breed } from '@/types';

interface BreedDetailProps {
  breed: Breed;
}

const BreedDetail: React.FC<BreedDetailProps> = ({ breed }) => {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{breed.name}</h2>
      
      <div className="space-y-6 pb-20">
          <div className="flex justify-center mb-6">
            <img 
              src={breed.image?.url || '/golden-retriever.jpg'} 
              alt={breed.name}
              className="w-80 h-80 rounded-lg shadow-md object-cover"
            />
          </div>
        <div className="space-y-4 text-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed Group</label>
            <p className="text-gray-900">{breed.breed_group || 'Not specified'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Life Span</label>
            <p className="text-gray-900">{breed.life_span || 'Not specified'}</p>
          </div>

          {breed.weight?.metric && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <p className="text-gray-900">{breed.weight.metric} kg</p>
            </div>
          )}

          {breed.height?.metric && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <p className="text-gray-900">{breed.height.metric} cm</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperament</label>
            <p className="text-gray-900">{breed.temperament || 'Not specified'}</p>
          </div>

          {breed.bred_for && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bred For</label>
              <p className="text-gray-900">{breed.bred_for}</p>
            </div>
          )}

          {breed.origin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <p className="text-gray-900">{breed.origin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedDetail;