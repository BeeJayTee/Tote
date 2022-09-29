import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const MarketSelect = ({ marketID, setMarketID }) => {
  const [markets, setMarkets] = useState([]);
  const [marketName, setMarketName] = useState(null);
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

  const handleClick = (e) => {
    setMarketID(e.target.value);
    const market = markets.filter((market) => {
      return market.marketID === e.target.value;
    });
    setMarketName(market[0].marketName);
  };

  return (
    <div className="MarketSelect">
      <div className="dropdown-container text-center mb-50">
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="btn m-1 bg-primary hover:bg-primary-focus"
          >
            Select Market
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {markets &&
              markets.map((market, index) => (
                <li key={index}>
                  <option value={market.marketID} onClick={handleClick}>
                    {market.marketName}
                  </option>
                </li>
              ))}
          </ul>
        </div>
        <div className="market-viewing-container w-fit border-2 border-primary px-10 py-10 m-auto my-5 rounded">
          {marketName && (
            <p className="text-xl">You are currently viewing products for: </p>
          )}
          <h2 className="text-xl font-bold text-neutral">{marketName}</h2>
        </div>
      </div>
    </div>
  );
};

export default MarketSelect;
