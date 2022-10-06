import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddMarket = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const addMarket = async (
    adminName,
    adminEmail,
    marketName,
    marketAddress,
    mailingAddress,
    phone
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4141/markets/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        adminName,
        adminEmail,
        marketName,
        marketAddress,
        mailingAddress,
        phone,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    return json;
  };

  return { addMarket, isLoading, error };
};
