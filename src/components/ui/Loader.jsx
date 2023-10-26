import styles from './styles/loader.module.css';

function Loader({ fullScreen = true }) {
  return (
    <div>
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
