import React from 'react';
import Table from '../components/Table/Table';
import type { Breed } from '../types';
import { useGetBreeds } from '@/hooks/useGetBreeds';
import { getBreeds } from '@/services/breedService';



const HomePage: React.FC = () => {

  const { data: breeds, loading, error } = useGetBreeds(getBreeds);
  return (
    <div>
      <h1>Volkswagen Challenge</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching breeds: {error.message}</p>}
      <Table data={breeds} />
    </div>
  );
};

export default HomePage;