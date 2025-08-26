import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
import HomePage from './HomePage';
import { useBreedStore } from '@/store/breedStore';
import { useBreedData } from '@/hooks/useBreedData';
import { useBreedSelection } from '@/utils/useBreedSelection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Breed } from '@/types';

vi.mock('@/store/breedStore');
vi.mock('@/hooks/useBreedData');
vi.mock('@/utils/useBreedSelection');
vi.mock('@/hooks/useMediaQuery');

const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  window.dispatchEvent(new Event('resize'));
};

describe('HomePage', () => {
  const mockStoreDefaults = {
    breeds: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    sortKey: null,
    sortDirection: 'asc' as const,
    selectedBreeds: [],
    searchQuery: '',
    setSearchQuery: vi.fn(),
    fetchBreeds: vi.fn(),
    createBreed: vi.fn(),
    updateBreed: vi.fn(),
    deleteBreed: vi.fn(),
    deleteSelectedBreeds: vi.fn(),
    setCurrentPage: vi.fn(),
    setSort: vi.fn(),
    toggleBreedSelection: vi.fn(),
    toggleSelectAll: vi.fn(),
    clearSelection: vi.fn(),
  };

  const mockBreedSelection = {
    selectedBreeds: [],
    toggleBreedSelection: vi.fn(),
    isAllSelected: false,
    isIndeterminate: false,
    handleSelectAll: vi.fn(),
    handleDeleteSelected: vi.fn(),
    clearSelection: vi.fn(),
  };

  const mockBreeds: Breed[] = [
    { 
      id: 1, 
      name: 'Labrador', 
      breed_group: 'Sporting', 
      temperament: 'Friendly, Outgoing', 
      life_span: '10-12 years' 
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useBreedStore as unknown as Mock).mockReturnValue(mockStoreDefaults);
    (useBreedSelection as unknown as Mock).mockReturnValue(mockBreedSelection);
    (useBreedData as unknown as Mock).mockReturnValue({
      currentBreeds: [],
      loading: false,
      error: null,
      totalCount: 0,
    });
    (useMediaQuery as unknown as Mock).mockReturnValue(true);
  });

  it('should display loading state initially', () => {
    mockWindowWidth(1024);
    (useBreedData as unknown as Mock).mockReturnValue({
      currentBreeds: [],
      loading: true,
      error: null,
      totalCount: 0,
    });
    
    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  describe('Desktop view', () => {
    beforeEach(() => {
      mockWindowWidth(1024);
      (useMediaQuery as unknown as Mock).mockReturnValue(true);
    });

    it('should display the table when data is loaded', () => {
      (useBreedData as unknown as Mock).mockReturnValue({
        currentBreeds: mockBreeds,
        loading: false,
        error: null,
        totalCount: 1,
      });
      
      (useBreedStore as unknown as Mock).mockReturnValue({
        ...mockStoreDefaults,
        breeds: mockBreeds,
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('Dog Encyclopedia')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Labrador')).toBeInTheDocument();
      expect(screen.getByText('Sporting')).toBeInTheDocument();
      expect(screen.getByText('10-12 years')).toBeInTheDocument();
      expect(screen.getByText('Friendly, Outgoing')).toBeInTheDocument();
      expect(screen.getByText('Select All (1)')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Breed Group')).toBeInTheDocument();
      expect(screen.getByText('Life Span')).toBeInTheDocument();
      expect(screen.getByText('Temperament')).toBeInTheDocument();
    });
  });

  describe('Mobile view', () => {
    beforeEach(() => {
      mockWindowWidth(375);
      (useMediaQuery as unknown as Mock).mockReturnValue(false); // Mobile view
    });

    it('should display breed cards when data is loaded', () => {
      (useBreedData as unknown as Mock).mockReturnValue({
        currentBreeds: mockBreeds,
        loading: false,
        error: null,
        totalCount: 1,
      });
      
      (useBreedStore as unknown as Mock).mockReturnValue({
        ...mockStoreDefaults,
        breeds: mockBreeds,
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('Dog Encyclopedia')).toBeInTheDocument();
      expect(screen.getByText('Labrador')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
      expect(screen.getByText('Sporting')).toBeInTheDocument();
      expect(screen.getByText('10-12 years')).toBeInTheDocument();
      expect(screen.getByText('Friendly, Outgoing')).toBeInTheDocument();
      
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });
  });

  it('should display error message when there is an error', () => {
    mockWindowWidth(1024);
    (useBreedData as unknown as Mock).mockReturnValue({
      currentBreeds: [],
      loading: false,
      error: 'Failed to fetch breeds',
      totalCount: 0,
    });
    
    render(<HomePage />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch breeds/i)).toBeInTheDocument();
  });
});