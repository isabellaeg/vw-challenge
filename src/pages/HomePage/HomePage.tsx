import React, { useEffect } from 'react';
import Table from '@/components/Table/Table';
import { useBreedStore } from '@/store/breedStore';

const HomePage: React.FC = () => {
  const { breeds, loading, error, fetchBreeds } = useBreedStore();

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dog Breeds</h1>
      <Table data={breeds} />
    </div>
  );
};

export default HomePage;