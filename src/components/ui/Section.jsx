import styles from '../styles/section.module.css';

function Section({ children }) {
  return <section className={styles.section}>{children}</section>;
}

export default Section;
