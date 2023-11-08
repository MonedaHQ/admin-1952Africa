import { motion } from 'framer-motion';

import styles from '../styles/table.module.css';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function Table({ headers, tableData, paginationCount = 10 }) {
  const navigate = useNavigate();

  const tableVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
  };

  return (
    <motion.div
      className={styles.tableContainer}
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${styles.tableRow} ${styles.hovered}`}
              onClick={() => navigate(`/artists/${rowData.slug}`)}
            >
              <td>
                {rowData.first_name} {rowData.last_name}
              </td>
              <td>{rowData.medium}</td>
              <td>{rowData.program}</td>
              <td>{rowData.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <Pagination count={paginationCount} />
      </div>
    </motion.div>
  );
}

export default Table;
