import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      const response = await fetch("/admin/markets", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setMarkets(json);
      } else {
        console.error(json.error);
      }
    };

    fetchMarkets();
  }, [user.token]);

  return (
    <div className="container m-auto max-h-[400px] w-fit px-8 py-4 border-4 border-primary-focus overflow-y-scroll">
      <div className="m-auto w-fit">
        {isLoading && <div>Loading Markets</div>}
        {markets.map((market, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-bold">{market.marketName}</h4>
            <p className="text-xs">
              Market ID:{" "}
              <span className="font-semibold">{market.marketID}</span>
            </p>
            <p className="text-xs">
              Contact Name:{" "}
              <span className="font-semibold">{market.adminName}</span>
            </p>
            <p className="text-xs">
              Contact Email:{" "}
              <span className="font-semibold">{market.adminEmail}</span>
            </p>
            <button className="text-xs text-primary hover:text-primary-focus font-bold">
              Edit Market
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMarkets;
