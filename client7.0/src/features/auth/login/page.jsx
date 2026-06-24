import { useRouter } from "next/navigation";
import { useState } from "react";


// import { useAuth } from "#root/context/AuthContext.jsx";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import style from "./page.module.css";

import login from "./loginController";

export default  function Login() {
  // const { setUser } = useAuth();

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    if (Array.isArray(res)) {
      const err = res;
      setErrors(err);
      return;
    }
    setErrors(null);
   
    // setUser(res);
    // Simulate login success and navigate to dashboard
    router.push("/users");
  };

  return (
    <form className={style.form} onSubmit={handleLogin}>
      {/* Email */}
      <div className={style.formGroup}>
        <label className={style.label}>Email</label>
        <div className={style.inputWrapper}>
          <Mail className={style.inputIcon} />
          <input
            type="email"
            placeholder="your.email@example.com"
            className={style.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className={style.formGroup}>
        <label className={style.label}>Password</label>
        <div className={style.inputWrapper}>
          <Lock className={style.inputIcon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={style.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Errors */}
      {errors && (
        <ul className={style.errors}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      {/* Options */}
      <div className={style.formOptions}>
        <label className={style.checkboxLabel}>
          <input type="checkbox" className={style.checkbox} />
          <span>Remember me</span>
        </label>

        <a href="#" className={style.forgotLink}>
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button type="submit" className={style.submitBtn}>
        Sign In
      </button>

      {/* Divider */}
      <div className={style.divider}>
        <span>Or continue with</span>
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
