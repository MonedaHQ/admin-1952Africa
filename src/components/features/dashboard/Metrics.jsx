import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles/metrics.module.css';

function Metrics() {
  const filterOptions = [
    'This year',
    'Last 6 months',
    'Last quarter',
    'In 2 years',
    'All time',
  ];

  const metrics = [
    { name: 'Artists', totalNumber: 8 },
    { name: 'Activities', totalNumber: 50 },
    { name: 'Events', totalNumber: 10 },
  ];
  return (
    <div className={styles.section}>
      <select className={styles.filter}>
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <Metric metric={metric} key={metric.name} />
        ))}
      </div>
    </div>
  );
}

function Metric({ metric }) {
  const [count, setCount] = useState(0);
  const increment = metric.totalNumber / (0.1 * 1000);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + increment < metric.totalNumber) {
          return prevCount + increment;
        } else {
          clearInterval(timer);
          return metric.totalNumber;
        }
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [increment, metric.totalNumber]);

  const countVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.1 },
    },
  };

  return (
    <div className={styles.metric}>
      <motion.h3 variants={countVariant} initial="hidden" animate="visible">
        {Math.floor(count)}
      </motion.h3>
      <p>{metric.name}</p>
    </div>
  );
}

export default Metrics;
