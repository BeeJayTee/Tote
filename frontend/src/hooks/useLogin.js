import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const buyerResponse = await fetch(
      "https://tote.api.thebrandontucker.com/buyer/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const buyer = await buyerResponse.json();
    if (buyerResponse.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(buyer));

      // update auth context
      await dispatch({ type: "LOGIN", payload: buyer });
    } else if (!buyerResponse.ok) {
      const sellerResponse = await fetch(
        "https://tote.api.thebrandontucker.com/seller/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const seller = await sellerResponse.json();
      if (sellerResponse.ok) {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(seller));

        // update auth context
        await dispatch({ type: "LOGIN", payload: seller });
      } else if (!sellerResponse.ok) {
        setIsLoading(false);
        setError(seller.error);
      }
    }
  };

  return { login, isLoading, error };
};
