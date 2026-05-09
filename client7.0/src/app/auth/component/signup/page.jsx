import "./page.css";
import { Lock, Mail, Phone, User } from "lucide-react";

export default function Signup({ router }) {
  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup success and navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <form className="form" onSubmit={handleSignup}>
      {/* Full Name */}
      <div className="form-group">
        <label className="label">Full Name</label>
        <div className="input-wrapper">
          <User className="input-icon" />
          <input type="text" placeholder="John Doe" className="input" />
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label className="label">Email</label>
        <div className="input-wrapper">
          <Mail className="input-icon" />
          <input
            type="email"
            placeholder="your.email@example.com"
            className="input"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="form-group">
        <label className="label">Phone Number</label>
        <div className="input-wrapper">
          <Phone className="input-icon" />
          <input type="tel" placeholder="+1 (555) 000-0000" className="input" />
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="label">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            type="password"
            placeholder="Create a strong password"
            className="input"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label className="label">Confirm Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            type="password"
            placeholder="Re-enter your password"
            className="input"
          />
        </div>
      </div>

      {/* Terms */}
      <label className="terms">
        <input type="checkbox" className="checkbox checkbox-top" />
        <span>
          I agree to the{" "}
          <a href="#" className="link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit */}
      <button type="submit" className="submit-btn">
        Create Account
      </button>

      {/* Divider */}
      <div className="divider">
        <span>Or sign up with</span>
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
