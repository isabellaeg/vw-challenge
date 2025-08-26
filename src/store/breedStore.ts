import { create } from 'zustand';
import type { Breed } from '@/types';
import { getBreeds } from '@/services/breedService';

export interface BreedState {
  breeds: Breed[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  sortKey: keyof Breed | null;
  sortDirection: 'asc' | 'desc';
  selectedBreeds: number[];
  searchQuery: string;

  fetchBreeds: () => Promise<void>;
  createBreed: (breed: Omit<Breed, 'id'>) => void;
  updateBreed: (id: number, updates: Partial<Breed>) => void;
  deleteBreed: (id: number) => void;
  deleteSelectedBreeds: () => void;
  setCurrentPage: (page: number) => void;
  setSort: (key: keyof Breed) => void;
  toggleBreedSelection: (id: number) => void;
  toggleSelectAll: (allIds: number[]) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  getFilteredBreeds: () => Breed[];
}

export const useBreedStore = create<BreedState>((set, get) => ({
  breeds: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  sortKey: null,
  sortDirection: 'asc',
  selectedBreeds: [],
  searchQuery: '',
  
  fetchBreeds: async () => {
    set({ loading: true, error: null });
    try {
      const breeds = await getBreeds();
      set({ breeds, loading: false });
    } catch (_error) {
      set({ error: 'Failed to fetch breeds.', loading: false });
    }
  },
  
  createBreed: (breedData) => {
    const newBreed = { 
      ...breedData, 
      id: Date.now()
    };
    set((state) => ({ 
      breeds: [newBreed, ...state.breeds],
      currentPage: 1 
    }));
  },
  
  updateBreed: (id, updates) => {
    set((state) => ({
      breeds: state.breeds.map(breed => 
        breed.id === id ? { ...breed, ...updates } : breed
      )
    }));
  },
  
  deleteBreed: (id) => {
    set((state) => ({
      breeds: state.breeds.filter(breed => breed.id !== id),
      selectedBreeds: state.selectedBreeds.filter(selectedId => selectedId !== id)
    }));
  },
  
  deleteSelectedBreeds: () => {
    set((state) => ({
      breeds: state.breeds.filter(breed => !state.selectedBreeds.includes(breed.id)),
      selectedBreeds: [],
      currentPage: 1
    }));
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setSort: (key) => {
    const { sortKey, sortDirection } = get();
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    set({ sortKey: key, sortDirection: direction, currentPage: 1 });
  },
  
  toggleBreedSelection: (id) => {
    set((state) => ({
      selectedBreeds: state.selectedBreeds.includes(id)
        ? state.selectedBreeds.filter(selectedId => selectedId !== id)
        : [...state.selectedBreeds, id]
    }));
  },
  
  toggleSelectAll: (allIds) => {
    set((state) => ({
      selectedBreeds: state.selectedBreeds.length === allIds.length ? [] : allIds
    }));
  },
  
  clearSelection: () => set({ selectedBreeds: [] }),
  
  setSearchQuery: (query) => {
    set({ 
      searchQuery: query, 
      currentPage: 1 
    });
  },

  getFilteredBreeds: () => {
    const { breeds, searchQuery } = get();
    
    if (!searchQuery.trim()) {
      return breeds;
    }
    
    const query = searchQuery.toLowerCase();
    return breeds.filter(breed => 
      breed.name?.toLowerCase().includes(query) ||
      breed.breed_group?.toLowerCase().includes(query) ||
      breed.temperament?.toLowerCase().includes(query) ||
      breed.origin?.toLowerCase().includes(query)
    );
  },
}));