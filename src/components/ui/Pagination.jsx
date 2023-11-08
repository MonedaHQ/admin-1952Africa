import { PiCaretCircleLeftFill, PiCaretCircleRightFill } from 'react-icons/pi';
import styles from '../styles/pagination.module.css';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../config';

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page') ? 1 : +searchParams.get('page');
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className={styles.container}>
      <p className={styles.results}>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <PiCaretCircleLeftFill />
        </button>
        <button
          disabled={currentPage === pageCount}
          className={styles.btn}
          onClick={nextPage}
        >
          <PiCaretCircleRightFill />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
