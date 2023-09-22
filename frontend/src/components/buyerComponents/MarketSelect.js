import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const MarketSelect = ({ setMarketID }) => {
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
    console.log("clicked");
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
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 btn-primary">
            {marketName}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52 "
          >
            {markets &&
              markets.map((market, index) => (
                <li key={index} onClick={handleClick}>
                  <option
                    value={market.marketID}
                    className="bg-primary hover:bg-primary-focus text-white"
                  >
                    {market.marketName}
                  </option>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketSelect;
