import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const MarketSelect = ({ marketID, setMarketID }) => {
  const [markets, setMarkets] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMarkets = async () => {
      const response = await fetch("http://localhost:4141/markets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setMarkets(json);
    };
    fetchMarkets();
  }, [user.token]);

  return (
    <div className="MarketSelect">
      <form>
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn m-1">
            Select Market
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {markets &&
              markets.map((market, index) => (
                <li>
                  <option
                    key={index}
                    value={market.marketID}
                    onClick={(e) => setMarketID(e.target.value)}
                  >
                    {market.marketName}
                  </option>
                </li>
              ))}
          </ul>
        </div>
        {/* <select value={marketID} onChange={(e) => setMarketID(e.target.value)}>
          <option value="">Select A Market</option>
          {markets &&
            markets.map((market, index) => (
              <option key={index} value={market.marketID}>
                {market.marketName}
              </option>
            ))}
        </select> */}
      </form>
    </div>
  );
};

export default MarketSelect;
