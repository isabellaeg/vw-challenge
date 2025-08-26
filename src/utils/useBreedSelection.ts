import { useBreedStore } from '@/store/breedStore';
import type { Breed } from '@/types';

export const useBreedSelection = (currentBreeds: Breed[]) => {
  const {
    selectedBreeds,
    toggleBreedSelection,
    toggleSelectAll,
    clearSelection,
    deleteSelectedBreeds,
  } = useBreedStore();

  const currentBreedIds = currentBreeds.map(breed => breed.id);
  const isAllSelected = currentBreedIds.length > 0 && 
    currentBreedIds.every(id => selectedBreeds?.includes(id));
  const isIndeterminate = selectedBreeds?.some(id => currentBreedIds.includes(id)) && !isAllSelected;

  const handleSelectAll = () => toggleSelectAll(currentBreedIds);
  
  const handleDeleteSelected = () => {
    deleteSelectedBreeds();
  };

  return {
    selectedBreeds,
    isAllSelected,
    isIndeterminate,
    toggleBreedSelection,
    handleSelectAll,
    handleDeleteSelected,
    clearSelection,
  };
};