import { motion } from 'framer-motion';

import styles from '../artists/styles/artists.module.css';
import { IoMdAddCircle } from 'react-icons/io';
import { headerVariant } from '../../../data/animationVariants';
import SearchBar from './SearchBar';
import OperationsPanel from './OperationsPanel';
import Table from '../../ui/Table';
import { artists } from '../../../data/programsData';
import { useNavigate } from 'react-router-dom';

function Artists() {
  const tableHeaders = ['Name', 'Medium', 'Program', 'Activity'];
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h1 variants={headerVariant} initial="hidden" animate="visible">
          Artists
        </motion.h1>
        <AddButton />
      </div>
      <SearchBar />
      <OperationsPanel />
      <Table headers={tableHeaders} tableData={artists} paginationCount={15} />
    </section>
  );
}

function AddButton() {
  const navigate = useNavigate();
  return (
    <button className={styles.btn} onClick={() => navigate('/artists/add')}>
      <p>
        <span>
          <IoMdAddCircle />
        </span>
        Add artist
      </p>
    </button>
  );
}

export default Artists;
