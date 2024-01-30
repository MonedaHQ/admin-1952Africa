import { useSearchParams } from 'react-router-dom';
import styles from '../styles/operations.module.css';
import { useState } from 'react';

const alphabetPanel = ['A - E', 'F - J', 'K - P', 'Q - T', 'U - Z'];
const sortOptions = ['name', 'latest', 'earliest'];

function OperationsPanel({ title }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState('');

  function handleRangeParams(range) {
    if (searchParams.has('name')) {
      searchParams.set('name', '');
    }

    if (searchParams.has('sortBy')) {
      searchParams.set('sortBy', '');
    }

    const setRange = range?.split(' - ').join('-').toLowerCase();
    searchParams.set('range', setRange);
    setSearchParams(searchParams);
  }

  function handleSortSearchParams(value) {
    if (searchParams.has('name')) {
      searchParams.set('name', '');
    }

    if (searchParams.has('range')) {
      searchParams.set('range', '');
    }

    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  }

  const activeOperation =
    searchParams.get('range')?.split('-').join(' - ').toUpperCase() || '';

  return (
    <div className={styles.panel}>
      <h3>{title}</h3>
      <div>
        {alphabetPanel.map((alphabetRange) => (
          <button
            key={alphabetRange}
            className={`${styles.button} ${
              activeOperation === alphabetRange
                ? styles.active
                : styles.inactive
            }`}
            onClick={() => handleRangeParams(alphabetRange)}
          >
            {alphabetRange}
          </button>
        ))}
      </div>
      <select
        onChange={(e) => {
          setSelected(e.target.value);
          handleSortSearchParams(e.target.value);
        }}
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            Sort by {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OperationsPanel;
