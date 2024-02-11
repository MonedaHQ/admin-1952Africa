import ReusableLogInScreen from '../features/authentication/ReusableLogInScreen';
import styles from '../styles/errorcomponent.module.css';
import Button from './Button';

function ErrorComponent({ resetErrorBoundary }) {
  return (
    <ReusableLogInScreen
      message={'Oops! Something went wrong'}
      element={
        <div className={styles.container}>
          <Button onClick={() => resetErrorBoundary()} variant="primary">
            Back home
          </Button>
        </div>
      }
    />
  );
}

export default ErrorComponent;
