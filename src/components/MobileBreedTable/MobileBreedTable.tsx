import React from 'react'; // Add this import
import BreedCard from "../BreedCard/BreedCard";
import BreedTableActions from "../BreedTable/BreedTableActions";
import type { Breed } from '@/types';

interface SelectionHandlers {
  selectedBreeds: number[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  handleSelectAll: () => void;
  handleDeleteSelected: () => void;
  clearSelection: () => void;
}

interface MobileBreedTableProps {
  currentBreeds: Breed[];
  selection: SelectionHandlers;
  handleRowClick: (breed: Breed) => void;
  handleAddNew: () => void;
}

const MobileBreedTable: React.FC<MobileBreedTableProps> = ({
  currentBreeds,
  selection,
  handleRowClick,
  handleAddNew,
}) => (
  <>
    <BreedTableActions
      currentBreedsCount={currentBreeds?.length}
      selectedCount={selection?.selectedBreeds.length}
      isAllSelected={selection?.isAllSelected}
      isIndeterminate={selection?.isIndeterminate}
      onSelectAll={selection?.handleSelectAll}
      onDeleteSelected={selection?.handleDeleteSelected}
      onClearSelection={selection?.clearSelection}
      onAddBreed={handleAddNew}
    />
    <div className="space-y-4 mt-4">
      {currentBreeds?.map((breed) => (
        <BreedCard
          key={breed.id}
          breed={breed}
          onClick={() => handleRowClick(breed)}
        />
      ))}
    </div>
  </>
);

export default MobileBreedTable;