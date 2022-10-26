import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useBuyerSignup = () => {
  const [buyerError, setBuyerError] = useState(null);
  const [isBuyerLoading, setIsBuyerLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const buyerSignup = async (email, password, retypePassword) => {
    setIsBuyerLoading(true);
    setBuyerError(null);

    const response = await fetch(
      "https://tote.api.thebrandontucker.com/buyer/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, retypePassword }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsBuyerLoading(false);
      setBuyerError(json.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { buyerSignup, isBuyerLoading, buyerError };
};
