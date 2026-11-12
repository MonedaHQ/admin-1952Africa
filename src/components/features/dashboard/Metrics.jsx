import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './styles/metrics.module.css';
import { useAnalytics } from './useAnalytics';
import Loader from '../../ui/Loader';

function Metrics() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, analytics } = useAnalytics();

  if (isLoading) return <Loader />;

  function handleMetrics(value) {
    searchParams.set('metrics', value);
    setSearchParams(searchParams);
  }

  const filterOptions = [
    'All time',
    'One month',
    'Three months',
    'Six months',
    'One year',
    'Two years',
  ];

  const metrics = [
    { name: 'Artists', totalNumber: analytics?.artist ?? 0, path: '/artists' },
    {
      name: 'Activities',
      totalNumber: analytics?.activity ?? 0,
      path: '/programs',
    },
    { name: 'Events', totalNumber: analytics?.event ?? 0, path: '/events' },
  ];
  return (
    <div className={styles.section}>
      <select
        className={styles.filter}
        onChange={(e) => handleMetrics(e.target.value)}
        defaultValue={searchParams.get('metrics') || 'All time'}
      >
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
  const navigate = useNavigate();
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
    <div className={styles.metric} onClick={() => navigate(metric.path)}>
      <motion.h3 variants={countVariant} initial="hidden" animate="visible">
        {Math.floor(count)}
      </motion.h3>
      <p>{metric.name}</p>
    </div>
  );
}

export default Metrics;
