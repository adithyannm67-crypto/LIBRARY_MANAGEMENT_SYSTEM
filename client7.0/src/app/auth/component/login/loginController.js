import { isEmailValid, isPasswordValid } from "../validator";

export default async function login(email, password) {
  let err = [];
  email = email.trim().toLowerCase();
  password = password.trim();
  if(!email || !password) {
    err.push("Email and password are required");
    return err;
  }
  if (!isEmailValid(email)) {
    err.push("Email is not valid");
  }
  if (!isPasswordValid(password)) {
    err.push("Password is not valid");
  }

  if (err.length > 0) return err;
  return await userVerfy(email, password);
}

async function userVerfy(email, password) {
  try {
    const res = await fetch("http://localhost:5000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const body = await res.json();

    console.log(res.ok, body);

    if (!res.ok || !body.success) {
      return [body?.message || "Login failed"];
    }
    localStorage.setItem("token", body.data.token);

    return [];
  } catch (e) {
    
    return [e.message || "An error occurred during login"];
  }
}
