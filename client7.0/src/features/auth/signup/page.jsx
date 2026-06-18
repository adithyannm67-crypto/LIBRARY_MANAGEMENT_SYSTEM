import style from "./page.module.css";
import {useRouter} from "next/navigation";
import { Lock, Mail, Phone, User } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup success and navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <form className={style.form} onSubmit={handleSignup}>
      {/* Full Name */}
      <div className={style.formGroup}>
        <label className={style.label}>Full Name</label>
        <div className={style.inputWrapper}>
          <User className={style.inputIcon} />
          <input type="text" placeholder="John Doe" className={style.input} />
        </div>
      </div>

      {/* Email */}
      <div className={style.formGroup}>
        <label className={style.label}>Email</label>
        <div className={style.inputWrapper}>
          <Mail className={style.inputIcon} />
          <input
            type="email"
            placeholder="your.email@example.com"
            className={style.input}
          />
        </div>
      </div>

      {/* Phone */}
      <div className={style.formGroup}>
        <label className={style.label}>Phone Number</label>
        <div className={style.inputWrapper}>
          <Phone className={style.inputIcon} />
          <input type="tel" placeholder="+1 (555) 000-0000" className={style.input} />
        </div>
      </div>

      {/* Password */}
      <div className={style.formGroup}>
        <label className={style.label}>Password</label>
        <div className={style.inputWrapper}>
          <Lock className={style.inputIcon} />
          <input
            type="password"
            placeholder="Create a strong password"
            className={style.input}
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className={style.formGroup}>
        <label className={style.label}>Confirm Password</label>
        <div className={style.inputWrapper}>
          <Lock className={style.inputIcon} />
          <input
            type="password"
            placeholder="Re-enter your password"
            className={style.input}
          />
        </div>
      </div>

      {/* Terms */}
      <label className={style.terms}>
        <input type="checkbox" className={style.checkbox + " " + style.checkboxTop} />
        <span>
          I agree to the{" "}
          <a href="#" className={style.link}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className={style.link}>
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit */}
      <button type="submit" className={style.submitBtn}>
        Create Account
      </button>

      {/* Divider */}
      <div className={style.divider}>
        <span>Or sign up with</span>
      </div>

      {/* Social */}
      <div className={style.socialButtons}>
        <button type="button" className={style.socialBtn}>
          Google
        </button>
        <button type="button" className={style.socialBtn}>
          Microsoft
        </button>
      </div>
    </form>
  );
}
