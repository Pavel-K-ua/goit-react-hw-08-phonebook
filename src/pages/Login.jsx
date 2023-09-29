import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, registerThunk } from '../redux/auth/operations';
import { toast } from 'react-toastify';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectLoading } from '../redux/auth/selectors';

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { handleSubmit, register } = useForm();
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const submit = data => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(res => {
        toast.success(`Welcome!${res.user.name}`);
        navigate(location.state?.from ?? '/');
      })
      .catch(() => toast.error('Data is not valid!'));
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Login</h2>

      <label>
        Email
        <input {...register('email')} />
      </label>
      <label>
        Password
        <input {...register('password')} />
      </label>
      <button>Login</button>

      <span>
        You haven't account? Let's{' '}
        <Link to="/register" className="underline text-teal-500">
          create it
        </Link>
      </span>
    </form>
  );
};
