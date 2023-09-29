import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../redux/auth/operations';
import { Link, useNavigate } from 'react-router-dom';
// import { selectLoading } from '../redux/auth/selectors';

export const Register = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();
  const submit = data => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Register</h2>
      <label>
        Name
        <input {...register('name')} />
      </label>
      <label>
        Email
        <input {...register('email')} />
      </label>
      <label>
        Password
        <input {...register('password')} />
      </label>
      <button>Register</button>
      <span>
        You already have account? Let's
        <Link to="/login">sign in!</Link>
      </span>
    </form>
  );
};
