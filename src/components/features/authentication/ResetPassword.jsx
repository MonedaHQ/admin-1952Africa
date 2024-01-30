import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import AuthFormContainer from './authFormComponents/AuthFormContainer';
import Fields from './authFormComponents/Fields';
import ReusableLogInScreen from './ReusableLogInScreen';
import Button from '../../ui/Button';
import { useState } from 'react';
import { useUpdatePassword } from './useUpdatePassword';

function ResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get('token');

  return (
    <ReusableLogInScreen
      message="Enter your new password"
      element={<ResetForm token={token} status={status} />}
    />
  );
}

function ResetForm({ token, status }) {
  const [isLoading, setIsLoading] = useState();

  const { updatePassword } = useUpdatePassword();

  const { register, formState, reset, handleSubmit } = useForm();
  const { errors } = formState;
  const formActions = { register };

  function onSubmit(data) {
    setIsLoading(true);
    updatePassword({ data, token });
    setIsLoading(false);
  }
  return (
    <AuthFormContainer handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Fields
        id="password"
        type="password"
        label="Password"
        placeholder="********"
        errorMessage={errors?.password?.message || null}
        formActions={formActions}
      />
      <Fields
        id="password_confirmation"
        type="password"
        label="Confirm your Password"
        placeholder="********"
        errorMessage={errors?.password?.message || null}
        formActions={formActions}
      />
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in..' : ' Log in'}
      </Button>
    </AuthFormContainer>
  );
}

export default ResetPassword;
