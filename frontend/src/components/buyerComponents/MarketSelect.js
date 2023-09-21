import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const MarketSelect = ({ marketID, setMarketID }) => {
  const [markets, setMarkets] = useState([]);
  const [marketName, setMarketName] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMarkets = async () => {
      const response = await fetch("/markets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setMarkets(json);
      setMarketName(json[0].marketName);
      setMarketID(json[0].marketID);
    };
    fetchMarkets();
  }, [setMarketID, user.token]);

  const handleClick = (e) => {
    setMarketID(e.target.value);
    const market = markets.filter((market) => {
      return market.marketID === e.target.value;
    });
    setMarketName(market[0].marketName);
  };

  return (
    <div className="MarketSelect">
      <div className="absolute mt-[-15px] ml-[5px] text-xs text-stone-700">
        select market
      </div>
      <div className="dropdown-container text-center">
        <details className="dropdown">
          <summary className="m-1 btn bg-primary hover:bg-primary-focus text-xs md:text-sm">
            {marketName}
          </summary>
          <ul className="shadow menu dropdown-content z-[1] rounded-box w-fit bg-secondary-500 text-primary">
            {markets &&
              markets.map((market, index) => (
                <li key={index}>
                  <option
                    value={market.marketID}
                    onClick={handleClick}
                    className="hover:text-primary-focus hover:bg-base-100"
                  >
                    {market.marketName}
                  </option>
                </li>
              ))}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default MarketSelect;
