import { useMemo } from 'react';
import type { Breed } from '@/types';

export const useFilteredBreeds = (
  breeds: Breed[],
  currentBreeds: Breed[],
  searchQuery: string,
  currentPage: number,
  itemsPerPage: number,
  totalCount: number
) => {
  const filteredBreeds = useMemo(() => {
    if (!searchQuery?.trim()) {
      return currentBreeds;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = breeds.filter(breed => 
      breed.name?.toLowerCase().includes(query) ||
      breed.breed_group?.toLowerCase().includes(query) ||
      breed.temperament?.toLowerCase().includes(query) ||
      breed.origin?.toLowerCase().includes(query)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [breeds, currentBreeds, searchQuery, currentPage, itemsPerPage]);

  const filteredTotalCount = useMemo(() => {
    if (!searchQuery?.trim()) {
      return totalCount;
    }
    
    const query = searchQuery.toLowerCase();
    return breeds.filter(breed => 
      breed.name?.toLowerCase().includes(query) ||
      breed.breed_group?.toLowerCase().includes(query) ||
      breed.temperament?.toLowerCase().includes(query) ||
      breed.origin?.toLowerCase().includes(query)
    ).length;
  }, [breeds, searchQuery, totalCount]);

  return { filteredBreeds, filteredTotalCount };
};