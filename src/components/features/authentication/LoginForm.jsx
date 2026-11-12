import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';

import { useLogIn } from './useLogIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormContainer from './authFormComponents/AuthFormContainer';
import Fields from './authFormComponents/Fields';

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const formActions = { register };

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useLogIn();

  async function onSubmit(data) {
    setIsLoading(true);
    login(data, { onSettled: () => setIsLoading(false) });
  }

  return (
    <AuthFormContainer onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <Fields
        id="email"
        type="email"
        label="Email"
        placeholder="j.doe@1952africa.art"
        errorMessage={errors?.email?.message || null}
        formActions={formActions}
      />
      <Fields
        id="password"
        type="password"
        label="Password"
        placeholder="********"
        errorMessage={errors?.password?.message || null}
        formActions={formActions}
      />

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in..' : ' Log in'}
      </Button>
      <Button
        variant="link-dark"
        size="md"
        onClick={() => navigate('/reset-password')}
      >
        Forgot password?
      </Button>
    </AuthFormContainer>
  );
}

export default LoginForm;
