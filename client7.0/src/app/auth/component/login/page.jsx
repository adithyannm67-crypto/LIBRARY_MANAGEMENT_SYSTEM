"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./page.css";

import login from "./loginController";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();

    const err = await login(email, password);
    if (err.length > 0) {
      setErrors(err);
      return;
    }
    // Simulate login success and navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      {/* Email */}
      <div className="form-group">
        <label className="label">Email</label>
        <div className="input-wrapper">
          <Mail className="input-icon" />
          <input
            type="email"
            placeholder="your.email@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="label">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Errors */}
      {errors && (
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      {/* Options */}
      <div className="form-options">
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox" />
          <span>Remember me</span>
        </label>

        <a href="#" className="forgot-link">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button type="submit" className="submit-btn">
        Sign In
      </button>

      {/* Divider */}
      <div className="divider">
        <span>Or continue with</span>
      </div>

      {/* Social */}
      <div className="social-buttons">
        <button type="button" className="social-btn">
          Google
        </button>
        <button type="button" className="social-btn">
          Microsoft
        </button>
      </div>
    </form>
  );
}
