import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PiMagnifyingGlassBold } from 'react-icons/pi';

import styles from './styles/artists.module.css';

function SearchBar() {
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
    searchParams.set('name', search);
    setSearchParams(searchParams);
  }
  return (
    <form className={styles.searchBar} onSubmit={onSubmit}>
      <PiMagnifyingGlassBold />
      <input
        type="text"
        placeholder="Search Artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
