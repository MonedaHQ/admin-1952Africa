import { useForm } from 'react-hook-form';
import AuthFormContainer from './authFormComponents/AuthFormContainer';
import Fields from './authFormComponents/Fields';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from './useResetPassword';
import { useState } from 'react';

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const formActions = { register };

  const { resetPassword } = useResetPassword();

  function onSubmit(data) {
    setIsLoading(true);
    resetPassword(data, {
      onSettled: () => setIsLoading(false),
    });
  }
  return (
    <AuthFormContainer handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Fields
        type="email"
        id="email"
        placeholder="Enter your email address"
        label="E-mail"
        errorMessage={errors?.email?.message}
        formActions={formActions}
      />
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? 'Resetting..' : 'Reset'}
      </Button>
      <Button variant="link-dark" onClick={() => navigate('/')} size="md">
        Log in?
      </Button>
    </AuthFormContainer>
  );
}

export default ForgotPasswordForm;
