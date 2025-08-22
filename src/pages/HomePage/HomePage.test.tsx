import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import HomePage from './HomePage';
import { useBreedStore } from '@/store/breedStore';
import type { Breed } from '@/types';

vi.mock('@/store/breedStore');

describe('HomePage', () => {
  it('should display loading state initially', () => {
    (useBreedStore as unknown as Mock).mockReturnValue({
      breeds: [],
      loading: true,
      error: null,
      fetchBreeds: vi.fn(),
    });
    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display the table when data is loaded', () => {
    const mockBreeds: Breed[] = [
      { id: 1, name: 'Labrador', origin: 'UK', temperament: 'Friendly', life_span: '10-12' }
    ];
    (useBreedStore as unknown as Mock).mockReturnValue({
      breeds: mockBreeds,
      loading: false,
      error: null,
      fetchBreeds: vi.fn(),
    });
    render(<HomePage />);
    expect(screen.getByText('Labrador')).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});