import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form
      className="login-form container m-auto flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <h3 className="font-['Helvetica'] text-center text-3xl font-thin">
        Log In
      </h3>

      <div className="form-control w-full max-w-xs mb-4">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs mb-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button className="btn btn-primary" disabled={isLoading}>
        Log In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
