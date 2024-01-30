import { useNavigate, useSearchParams } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import ReusableLogInScreen from './ReusableLogInScreen';
import styles from './styles/forgotpassword.module.css';
import Button from '../../ui/Button';

function ForgotPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');

  if (status) {
    return (
      <ReusableLogInScreen
        message={
          status === 'success'
            ? 'Go to your mailbox to complete the process!'
            : 'Failed to reset'
        }
        element={<BackHome />}
      />
    );
  } else
    return (
      <ReusableLogInScreen
        message="Please enter your email to reset password"
        element={<ForgotPasswordForm />}
      />
    );
}

function BackHome() {
  const navigate = useNavigate();
  return (
    <div className={styles.btn}>
      <Button variant="primary" onClick={() => navigate('/')}>
        Back to log in
      </Button>
    </div>
  );
}
export default ForgotPassword;
