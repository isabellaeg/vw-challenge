import React, { useState, useEffect } from 'react';
import type { Breed } from '@/types';
import BreedTable from '@/components/BreedTable/BreedTable';
import BreedFormModal from '@/components/BreedForm/BreedFormModal';
import SearchBar from '@/components/SearchBar/SearchBar';
import Pagination from '@/components/Pagination/Pagination';
import { useBreedData } from '@/hooks/useBreedData';
import { useBreedStore } from '@/store/breedStore';
import { useBreedSelection } from '@/utils/useBreedSelection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useFilteredBreeds } from '@/hooks/useFilteredBreeds';
import BreedDetailModal from '@/components/BreedDetail/BreedDetailModal';
import MobileBreedTable from '@/components/MobileBreedTable/MobileBreedTable';

const HomePage: React.FC = () => {
  const { currentBreeds, loading, error, totalCount } = useBreedData();
  const {
    breeds,
    sortKey,
    sortDirection,
    setSort,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
  } = useBreedStore();

  const { filteredBreeds, filteredTotalCount } = useFilteredBreeds(
    breeds,
    currentBreeds,
    searchQuery,
    currentPage,
    itemsPerPage,
    totalCount
  );

  const selection = useBreedSelection(filteredBreeds);
  const isTabletAndDesktop = useMediaQuery();
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleRowClick = (breed: Breed) => {
    setSelectedBreed(breed);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    if (selectedBreed && !breeds.find(breed => breed.id === selectedBreed.id)) {
      setSelectedBreed(null);
    }
  }, [breeds, selectedBreed]);

  if (loading) {
    return <p className="text-center text-lg mt-8">Loading...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 mb-8">
        Dog Encyclopedia
      </h1>
      
      <SearchBar 
        value={searchQuery || ''} 
        onChange={handleSearch}
        placeholder="Search breeds..." 
      />
      
      {filteredBreeds.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No breeds found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {filteredBreeds.length > 0 && (
        <>
          {isTabletAndDesktop ? (
            <BreedTable
              currentBreeds={filteredBreeds}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'breed_group', header: 'Breed Group' },
                { key: 'life_span', header: 'Life Span' },
                { key: 'temperament', header: 'Temperament' },
              ]}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={setSort}
              selectedIds={selection.selectedBreeds || []}
              onToggleSelection={selection.toggleBreedSelection}
              onRowClick={handleRowClick}
              isAllSelected={selection.isAllSelected}
              isIndeterminate={selection.isIndeterminate}
              onSelectAll={selection.handleSelectAll}
              onDeleteSelected={selection.handleDeleteSelected}
              onClearSelection={selection.clearSelection}
              onAddBreed={() => setShowAddForm(true)}
            />
          ) : (
            <MobileBreedTable
              currentBreeds={filteredBreeds}
              selection={selection}
              handleRowClick={handleRowClick}
              handleAddNew={() => setShowAddForm(true)}
            />
          )}

          <Pagination
            totalCount={filteredTotalCount}
            pageSize={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <BreedDetailModal
        isOpen={!!selectedBreed}
        onClose={() => setSelectedBreed(null)}
        breed={selectedBreed}
      />
      
      <BreedFormModal 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />
    </div>
  );
};

export default HomePage;