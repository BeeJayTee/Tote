import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminLogin = () => {
  const [password, setPassword] = useState("ABCabc123!");
  const [email, setEmail] = useState("admin@email.com");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <div>
      <h3 className="text-3xl text-center font-thin mb-10 font-['Helvetica']">
        Admin Login
      </h3>
      <form onSubmit={handleSubmit} className="m-auto form-control w-fit">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="input input-primary w-full max-w-xs"
          />
        </div>
        <button className="btn btn-primary mt-10" disabled={isLoading}>
          go
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
