"use client";
import Input from "@/component/input/inputText";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
import { useRouter } from "next/navigation";

const LoginContainer = () => {
  const router = useRouter();
  const { user, handleUserChange, loginUser } = useContext(
    AdminContext
  ) as AdminContextType;

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login in</h2>
        <div className="input-section">
          <Input
            labelName="Email"
            value={user.email}
            type="email"
            onChange={(value) => handleUserChange("email", value)}
            error={errors.email}
            arialLabel="Enter your email"
          />
          <div className="password-container">
            <Input
              labelName="Password"
              value={user.password}
              type={showPassword ? "text" : "password"}
              onChange={(value) => handleUserChange("password", value)}
              error={errors.password}
              arialLabel="Enter your password"
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button className="login-button" onClick={handleSubmit}>
          Log In
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <a onClick={() => router.push("/register")}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
