import React from 'react';
import type { Breed } from '../../types';

interface TableProps {
  data: Breed[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Something</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Origin</th>
          <th>Temperament</th>
          <th>Life Span</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.origin}</td>
            <td>{item.temperament}</td>
            <td>{item.life_span}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;