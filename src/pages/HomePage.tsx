import React from 'react';
import Table from '../components/Table/Table';
import type { Breed } from '../types';

const hardcodedBreeds: Breed[] = [
  {
    "id": 1,
    "name": "Labrador Retriever",
    "origin": "United Kingdom",
    "temperament": "Friendly, Outgoing, Trustworthy",
    "life_span": "10-12 years"
  },
  {
    "id": 2,
    "name": "French Bulldog",
    "origin": "France",
    "temperament": "Affectionate, Patient, Playful",
    "life_span": "10-12 years"
  },
  {
    "id": 3,
    "name": "German Shepherd",
    "origin": "Germany",
    "temperament": "Confident, Courageous, Smart",
    "life_span": "9-13 years"
  }
];

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Volkswagen Challenge</h1>
      <Table data={hardcodedBreeds} />
    </div>
  );
};

export default HomePage;