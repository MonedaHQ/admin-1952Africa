import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { usersData } from '../../../data/programsData';

import Button from '../../ui/Button';

import styles from './styles/login.module.css';

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  async function onSubmit(data) {
    const { email, password } = data;
    const currentUser = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (!currentUser) {
      alert('Email or password incorrect');
      return;
    }
    navigate('/home');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.fieldset}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="janedoe@example.com"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please specify a valid email',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="*****"
          {...register('password', {
            required: 'This field is required',
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </fieldset>
      <Button variant="primary" type="submit">
        Log in
      </Button>
    </form>
  );
}

export default LoginForm;
