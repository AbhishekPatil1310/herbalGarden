import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../Style/SignupForm.css';

const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignupForm({ switchToLogin }) {
  const { signup, authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data) => {
    const result = await signup({
      fullName: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate('/home');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <InputField
          label="Full Name"
          {...register('name')}
          error={errors.name}
        />
        <InputField label="Email" {...register('email')} error={errors.email} />
        <InputField
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />

        <button type="submit" disabled={authLoading} className="signup-button">
          {authLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="signup-switch-text">
          Already have an account?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="signup-switch-link"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

const InputField = forwardRef(
  ({ label, type = 'text', error, ...props }, ref) => {
    return (
      <div className="signup-input-field">
        <label className="signup-input-label">{label}</label>
        <input
          type={type}
          ref={ref}
          className="signup-input"
          {...props}
          placeholder={label}
        />
        {error && <p className="signup-error-message">{error.message}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
