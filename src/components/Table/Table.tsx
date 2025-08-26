import { useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { ColumnDefinition } from '@/types';

interface TableProps<T extends { id: number }> {
  data: T[];
  columns: ColumnDefinition<T>[];
  sortKey?: keyof T | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: keyof T) => void;
  selectedIds?: number[];
  onToggleSelection?: (id: number) => void;
  onRowClick?: (item: T) => void;
}

const Table = <T extends { id: number }>({
  data,
  columns,
  sortKey,
  sortDirection,
  onSort,
  selectedIds,
  onToggleSelection,
  onRowClick
}: TableProps<T>) => {
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  if (!data?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data to display.
      </div>
    );
  }

  const hasCheckbox = !!(selectedIds && onToggleSelection);
  const isClickable = !!onRowClick;

  const getSortIcon = (columnKey: keyof T) => {
    if (sortKey !== columnKey) return <ChevronsUpDown className="w-4 h-4 ml-1 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1" /> : 
      <ChevronDown className="w-4 h-4 ml-1" />;
  };

  const handleRowInteraction = (item: T, event: React.MouseEvent | React.KeyboardEvent) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      event.stopPropagation();
      return;
    }

    if ('key' in event && event.key !== 'Enter' && event.key !== ' ') return;
    
    event.preventDefault();
    onRowClick?.(item);
  };

  return (
    <div className="w-full shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {hasCheckbox && <th className="w-12 px-3 py-3" />}
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {onSort ? (
                  <button 
                    onClick={() => onSort(column.key)} 
                    className="hover:text-gray-700 flex items-center justify-center w-full"
                  >
                    {column.header}
                    {getSortIcon(column.key)}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => {
            const isSelected = selectedIds?.includes(item.id) || false;
            
            return (
              <tr 
                key={item.id} 
                ref={(el) => (rowRefs.current[index] = el)}
                onClick={(e) => handleRowInteraction(item, e)}
                onKeyDown={(e) => handleRowInteraction(item, e)}
                tabIndex={isClickable ? 0 : -1}
                role={isClickable ? 'button' : undefined}
                aria-label={isClickable ? `View details for ${item.id}` : undefined}
                className={`
                  hover:bg-gray-50 transition-colors
                  ${isSelected ? 'bg-blue-50' : ''} 
                  ${isClickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset' : ''}
                `}
              >
                {hasCheckbox && (
                  <td className="w-12 px-3 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelection!(item.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                )}
                
                {columns.map((column) => (
                  <td 
                    key={String(column.key)} 
                    className="px-3 md:px-6 py-4 text-sm text-gray-700"
                  >
                    <div className="break-words">
                      {item[column.key] ? String(item[column.key]) : '-'}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;