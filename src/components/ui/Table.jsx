import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Pagination from './Pagination';

import styles from '../styles/table.module.css';
import { useRef } from 'react';
import { truncateString } from '../../utilities/helpers';

/**
 * Table component for rendering a dynamic table with headers, data, and pagination.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.headers - Array of header labels for the table columns.
 * @param {Object} props.operationData - Object containing data, keys, and navigation information.
 * @param {Array} props.operationData.data - Array containing the data for each column.
 * @param {string} props.operationData.keys - Key specifying what data should be collected from the operationData.data object.
 * @param {string} props.operationData.navigation - A string to point to where the user navigates to when a row is clicked.
 * @param {number} props.paginationCount - Number of items to display per page in pagination. Defaults to 10.
 *
 * @returns {JSX.Element} - React component for rendering the table.
 */

function Table({ headers, operationData, paginationCount = 10, gridNo = 4 }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  const { data, keys, navigation } = operationData;
  const tableVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
  };

  return (
    <motion.div
      className={styles.tableContainer}
      variants={tableVariants}
      ref={ref}
      initial="hidden"
      animate={`${inView ? 'visible' : 'hidden'}`}
    >
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={`${styles.tableRow} ${styles[`gridCols-${gridNo}`]}`}>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, rowIndex) => (
            <RowPreview
              rowData={rowData}
              rowIndex={rowIndex}
              key={rowIndex}
              gridNo={gridNo}
              keys={keys}
              navigation={navigation}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <Pagination count={paginationCount} />
      </div>
    </motion.div>
  );
}

function RowPreview({ rowData, rowIndex, gridNo, keys, navigation }) {
  const navigate = useNavigate();
  return (
    <tr
      className={`${styles.tableRow}  ${styles[`gridCols-${gridNo}`]} ${
        styles.hovered
      }`}
      onClick={() => navigate(navigation[rowIndex])}
    >
      {keys.map((key) => (
        <PreviewContent keyData={key} rowData={rowData} key={key} />
      ))}
    </tr>
  );
}

function PreviewContent({ keyData, rowData }) {
  const content = rowData[keyData];
  const value = content === undefined || content === null || content === '' ? '—' : content;
  const displayValue = typeof value === 'string' ? truncateString(value.replace(/<[^>]*>/g, ''), 8) : value;

  return <td><div>{displayValue}</div></td>;
}

export default Table;
