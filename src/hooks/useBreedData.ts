import { useEffect, useMemo } from 'react';
import { useBreedStore } from '@/store/breedStore';

export const useBreedData = () => {
  const {
    breeds,
    loading,
    error,
    fetchBreeds,
    sortKey,
    sortDirection,
    currentPage,
    itemsPerPage,
  } = useBreedStore();

  useEffect(() => {
    if (breeds.length === 0) {
      fetchBreeds();
    }
  }, [fetchBreeds, breeds.length]);

  const sortedBreeds = useMemo(() => {
    if (!sortKey) return breeds;
    
    const sorted = [...breeds].sort((a, b) => {
      if (sortKey === 'life_span') {
        const getAvgLifeSpan = (span: string | undefined) => {
          const numbers = (span || '').match(/\d+/g)?.map(Number) || [0];
          return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
        };
        return getAvgLifeSpan(a.life_span) - getAvgLifeSpan(b.life_span);
      }
      
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      return String(valA).localeCompare(String(valB));
    });

    return sortDirection === 'desc' ? sorted.reverse() : sorted;
  }, [breeds, sortKey, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBreeds = sortedBreeds.slice(indexOfFirstItem, indexOfLastItem);

  return {
    breeds: sortedBreeds,
    currentBreeds,
    loading,
    error,
    totalCount: breeds.length,
  };
};