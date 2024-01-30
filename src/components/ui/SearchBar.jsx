import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PiMagnifyingGlassBold } from 'react-icons/pi';

import styles from '../styles/searchbar.module.css';

function SearchBar({ placeholder, param = 'name' }) {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(e) {
    e.preventDefault();
    if (searchParams.has('page')) {
      searchParams.set('page', '1');
    }
    if (searchParams.has('range')) {
      searchParams.set('range', '');
    }
    if (searchParams.has('sortBy')) {
      searchParams.set('sortBy', '');
    }

    searchParams.set(param, search);
    setSearchParams(searchParams);
  }
  return (
    <form className={styles.searchBar} onSubmit={(e) => onSubmit(e)}>
      <PiMagnifyingGlassBold />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
