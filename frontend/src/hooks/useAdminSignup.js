import { useState } from "react";

export const useAdminSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const adminSignup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    return json;
  };

  return { adminSignup, isLoading, error };
};
