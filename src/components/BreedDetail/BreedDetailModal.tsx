import React, { useState, useEffect } from 'react';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import Button from '../Button/Button';
import Modal from '@/components/Modal/Modal';
import BreedDetail from '@/components/BreedDetail/BreedDetail';
import BreedForm from '@/components/BreedForm/BreedForm';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useBreedStore } from '@/store/breedStore';
import type { Breed } from '@/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BreedDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  breed: Breed | null;
  triggerRef?: React.RefObject<HTMLElement>;
}

type ViewMode = 'detail' | 'edit';

const BreedDetailModal: React.FC<BreedDetailModalProps> = ({
  isOpen,
  onClose,
  breed,
  triggerRef,
}) => {
  const { deleteBreed } = useBreedStore();
  const isTabletAndDesktop = useMediaQuery();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('detail');

  useEffect(() => {
    if (!isOpen || !breed) {
      setShowDeleteConfirm(false);
      setViewMode('detail');
    }
  }, [isOpen, breed]);

  if (!breed) return null;

  const handleEdit = () => {
    setViewMode('edit');
  };

  const handleBackToDetail = () => {
    setViewMode('detail');
  };

  const handleEditSuccess = () => {
    setViewMode('detail'); 
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    
    try {
      deleteBreed(breed.id);
      
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete breed:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const handleModalClose = () => {
    setViewMode('detail');
    setShowDeleteConfirm(false);
    onClose();
  };

  const getHeaderActions = () => {
    if (viewMode === 'edit') {
      return (
        <Button
          icon={ArrowLeft}
          onClick={handleBackToDetail}
          variant="ghost"
          size="md"
          aria-label="Back to details"
          className="p-2 text-gray-600 hover:bg-gray-50"
        />
      );
    }

    return (
      <>
        <Button
          icon={Edit}
          onClick={handleEdit}
          variant="secondary"
          size="md"
          aria-label="Edit breed"
          className="p-2"
        />
        <Button
          icon={Trash2}
          onClick={handleDeleteClick}
          variant="danger"
          size="md"
          aria-label="Delete breed"
          className="p-2"
        />
      </>
    );
  };

  const getModalTitle = () => {
    return viewMode === 'edit' ? 'Edit Breed' : breed.name;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        position="right"
        headerActions={getHeaderActions()}
        title={getModalTitle()}
        triggerRef={triggerRef}
        className={`${isTabletAndDesktop ? 'w-[500px]' : 'w-full'} animate-slide-in-right justify-end`}
      >
        {viewMode === 'detail' ? (
          <BreedDetail breed={breed} />
        ) : (
          <div className="p-6">
            <BreedForm 
              onSuccess={handleEditSuccess}
              initialData={breed}
              mode="edit"
            />
          </div>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Breed"
        message={`Are you sure you want to delete "${breed.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default BreedDetailModal;