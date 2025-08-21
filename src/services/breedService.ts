import type { Breed } from '@/types';

const API_URL = 'https://api.thedogapi.com/v1/breeds'; 

export const getBreeds = async (): Promise<Breed[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data: Breed[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch breeds:", error);
    throw error;
  }
};