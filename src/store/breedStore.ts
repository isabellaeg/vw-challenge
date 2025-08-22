import { create } from 'zustand';
import type { Breed } from '@/types';
import { getBreeds } from '@/services/breedService'; 

interface BreedState {
  breeds: Breed[];
  loading: boolean;
  error: string | null;
  fetchBreeds: () => Promise<void>;
  addBreed: (newBreedData: Omit<Breed, 'id'>) => Promise<void>;
  updateBreed: (updatedBreed: Breed) => Promise<void>;
  removeBreed: (breedId: number) => Promise<void>;
}

export const useBreedStore = create<BreedState>((set) => ({
  breeds: [],
  loading: false,
  error: null,

  fetchBreeds: async () => {
    set({ loading: true, error: null });
    try {
      const breeds = await getBreeds();
      set({ breeds, loading: false });
    } catch (_error) {
      set({ error: 'Failed to fetch breeds.', loading: false });
    }
  },

  addBreed: async (newBreedData) => {
    const newBreed: Breed = { id: Date.now(), ...newBreedData };
    set((state) => ({
      breeds: [...state.breeds, newBreed],
    }));
  },

  updateBreed: async (updatedBreed) => {
    set((state) => ({
      breeds: state.breeds.map((breed) => (breed.id === updatedBreed.id ? updatedBreed : breed)),
    }));
  },

  removeBreed: async (breedId) => {
    set((state) => ({
      breeds: state.breeds.filter((breed) => breed.id !== breedId),
    }));
  },
}));