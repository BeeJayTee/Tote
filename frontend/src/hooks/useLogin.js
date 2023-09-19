import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log("loggin in");

    try {
      const buyerResponse = await fetch("/buyer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const buyer = await buyerResponse.json();
      if (buyerResponse.ok) {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(buyer));

        // update auth context
        dispatch({ type: "LOGIN", payload: buyer });
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const sellerResponse = await fetch("/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const seller = await sellerResponse.json();
      if (sellerResponse.ok) {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(seller));

        // update auth context
        dispatch({ type: "LOGIN", payload: seller });
      } else if (!sellerResponse.ok) {
        setIsLoading(false);
        setError(seller.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { login, isLoading, error };
};
