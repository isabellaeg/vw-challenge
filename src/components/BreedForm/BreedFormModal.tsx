import React from 'react';
import Modal from '@/components/Modal/Modal';
import BreedForm from '@/components/BreedForm/BreedForm';
import type { Breed } from '@/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BreedFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  breed?: Breed | null;
  mode?: 'create' | 'edit';
}

const BreedFormModal: React.FC<BreedFormModalProps> = ({ 
  isOpen, 
  onClose, 
  breed = null,
  mode = 'create'
}) => {
  const title = mode === 'edit' ? 'Edit Breed' : 'Add New Breed';
  const isTabletAndDesktop = useMediaQuery();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      title={title}
      className={`
        w-full 
        ${isTabletAndDesktop ? 'max-w-2xl' : 'max-w-sm mx-4'} 
        max-h-[90vh] 
        overflow-y-auto
        bg-white 
        rounded-lg 
        shadow-xl
      `}
    >
      <BreedForm 
        onSuccess={onClose} 
        initialData={breed}
        mode={mode}
      />
    </Modal>
  );
};

export default BreedFormModal;