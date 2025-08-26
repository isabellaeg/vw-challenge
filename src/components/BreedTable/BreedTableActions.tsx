import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { CirclePlus, Trash2, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BreedTableActionsProps {
  currentBreedsCount: number;
  selectedCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  onAddBreed: () => void;
}

const BreedTableActions: React.FC<BreedTableActionsProps> = ({
  currentBreedsCount,
  selectedCount,
  isAllSelected,
  isIndeterminate,
  onSelectAll,
  onDeleteSelected,
  onClearSelection,
  onAddBreed
}) => {
  const isTabletAndDesktop = useMediaQuery();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteSelected();
    setShowDeleteConfirm(false);
  };
  
  return (
    <>
      <div className="px-1 py-1 border-b border-gray-200 flex items-center justify-between md:py-4 md:px-6">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onChange={onSelectAll}
              className="h-3 w-3 md:h-4 md:w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="text-xs md:text-sm font-medium text-gray-700">
              Select All ({currentBreedsCount})
            </span>
          </label>
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2 text-xs text-gray-600 md:text-sm">
              <span>{selectedCount} selected</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <>
              <Button
                icon={Trash2}
                onClick={handleDeleteClick}
                variant="danger"
                size={isTabletAndDesktop ? 'md' : 'sm'}
                aria-label={`Delete ${selectedCount} selected breeds`}
              >
                {isTabletAndDesktop && `Delete (${selectedCount})`}
              </Button>
              <Button
                icon={X}
                onClick={onClearSelection}
                variant="secondary"
                size={isTabletAndDesktop ? 'md' : 'sm'}
                aria-label={`Clear ${selectedCount} selected breeds`}
              >
                {isTabletAndDesktop && `Clear (${selectedCount})`}
              </Button>
            </>
          )}
          
          <Button
            icon={CirclePlus}
            onClick={onAddBreed}
            variant="secondary"
            size={isTabletAndDesktop ? 'md' : 'sm'}
            aria-label="Add new breed"
          >
            {isTabletAndDesktop && 'Add Breed'}
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Selected Breeds"
        message={`Are you sure you want to delete ${selectedCount} selected breed(s)? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default BreedTableActions;