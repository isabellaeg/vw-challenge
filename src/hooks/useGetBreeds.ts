import { useState, useEffect } from 'react';

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useGetBreeds = <T>(apiFunc: () => Promise<T>): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunc();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};