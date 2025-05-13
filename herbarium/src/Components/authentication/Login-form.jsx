import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../Style/LoginForm.css";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm({ switchToSignup }) {
  const { login, authLoading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    await login(data);
    if (!error) {
      navigate("/Home");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <InputField label="Email" {...register("email")} error={errors.email} />
      <InputField
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password}
      />

      <button type="submit" disabled={authLoading} className="submit-button">
        {authLoading ? "Logging in..." : "Login"}
      </button>

      <p className="signup-text">
        Don't have an account?{" "}
        <button type="button" onClick={switchToSignup} className="signup-link">
          Sign up
        </button>
      </p>
    </form>
  );
}

const InputField = forwardRef(({ label, type = "text", error, ...props }, ref) => {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type={type}
        ref={ref}
        className="input-box"
        {...props}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
});

InputField.displayName = "InputField";
