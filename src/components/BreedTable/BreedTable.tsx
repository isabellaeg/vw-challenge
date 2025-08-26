import React from 'react';
import Table from '@/components/Table/Table';
import BreedTableActions from "./BreedTableActions"
import type { Breed, ColumnDefinition } from '@/types';

interface BreedTableViewProps {
  currentBreeds: Breed[];
  columns: ColumnDefinition<Breed>[];
  sortKey: keyof Breed | null;
  sortDirection: 'asc' | 'desc';
  onSort: (key: keyof Breed) => void;
  selectedIds: number[];
  onToggleSelection: (id: number) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  onRowClick?: (breed: Breed, triggerRef?: React.RefObject<HTMLElement>) => void; // Add ref param
  onAddBreed: () => void;
}

const BreedTable: React.FC<BreedTableViewProps> = ({
  currentBreeds,
  columns,
  sortKey,
  sortDirection,
  onSort,
  selectedIds,
  onToggleSelection,
  isAllSelected,
  isIndeterminate,
  onSelectAll,
  onDeleteSelected,
  onClearSelection,
  onRowClick,
  onAddBreed
}) => {

  // const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  return (
    <div className="bg-white rounded-lg shadow">
      <BreedTableActions
        currentBreedsCount={currentBreeds.length}
        selectedCount={selectedIds.length}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectAll={onSelectAll}
        onDeleteSelected={onDeleteSelected}
        onClearSelection={onClearSelection}
        onAddBreed={onAddBreed}
      />
      
      <Table 
        data={currentBreeds} 
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
        selectedIds={selectedIds}
        onToggleSelection={onToggleSelection}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default BreedTable;