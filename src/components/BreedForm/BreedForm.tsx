import React, { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import { useBreedStore } from '@/store/breedStore';
import type { Breed } from '@/types';

interface BreedFormProps {
  onSuccess: () => void;
  initialData?: Breed | null;
  mode?: 'create' | 'edit';
}

const initialFormState = {
  name: '',
  breed_group: '',
  life_span: '',
  temperament: '',
  origin: '',
  weight: '',
  height: '',
  bred_for: '',
};

const BreedForm: React.FC<BreedFormProps> = ({ 
  onSuccess, 
  initialData = null,
  mode = 'create'
}) => {
  const { createBreed, updateBreed } = useBreedStore();
  const [formData, setFormData] = useState(initialFormState);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        breed_group: initialData.breed_group || '',
        life_span: initialData.life_span || '',
        temperament: initialData.temperament || '',
        origin: initialData.origin || '',
        bred_for: initialData.bred_for || '',
        weight: initialData.weight?.metric || '',
        height: initialData.height?.metric || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const breedData = {
      name: formData.name.trim(),
      breed_group: formData.breed_group.trim() || undefined,
      life_span: formData.life_span.trim() || undefined,
      temperament: formData.temperament.trim() || undefined,
      origin: formData.origin.trim() || undefined,
      bred_for: formData.bred_for.trim() || undefined,
      weight: formData.weight.trim() ? { metric: formData.weight.trim() } : undefined,
      height: formData.height.trim() ? { metric: formData.height.trim() } : undefined,
    };

    if (mode === 'edit' && initialData) {
      updateBreed(initialData.id, breedData);
    } else {
      createBreed(breedData);
    }
    
    onSuccess();
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500";

  return (
    <>
      <h2 className="text-xl font-bold mb-6 text-pink-500">
        {mode === 'edit' ? 'Edit Breed' : 'Add New Dog Breed'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="breed_group" className="block text-sm font-medium text-gray-700 mb-1">
              Breed Group
            </label>
            <input
              type="text"
              id="breed_group"
              name="breed_group"
              value={formData.breed_group}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="life_span" className="block text-sm font-medium text-gray-700 mb-1">
              Life Span
            </label>
            <input
              type="text"
              id="life_span"
              name="life_span"
              value={formData.life_span}
              onChange={handleChange}
              placeholder="e.g., 10-12 years"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="temperament" className="block text-sm font-medium text-gray-700 mb-1">
            Temperament
          </label>
          <textarea
            id="temperament"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., Friendly, Outgoing, Active"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
              Origin
            </label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="bred_for" className="block text-sm font-medium text-gray-700 mb-1">
              Bred For
            </label>
            <input
              type="text"
              id="bred_for"
              name="bred_for"
              value={formData.bred_for}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 25-32 kg"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g., 55-62 cm"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {mode === 'edit' ? 'Update Breed' : 'Create Breed'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BreedForm;
