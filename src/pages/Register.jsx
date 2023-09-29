import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../redux/auth/operations';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { selectLoading } from '../redux/auth/selectors';

export const Register = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();
  const submit = data => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        toast.success('Welcome!');
        navigate('/');
      })
      .catch(() => toast.error('Data is not valid!'));
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
