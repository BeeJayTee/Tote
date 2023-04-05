import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const MarketSelect = ({ user, marketID, setMarketID, setMarketName }) => {
  const [sellerMarkets, setSellerMarkets] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [addMarketID, setAddMarketID] = useState("");
  const [addMarketDisplayClass, setAddMarketDisplayClass] = useState("hidden");
  const [icon, setIcon] = useState(faPlus);
  const [addMarketError, setAddMarketError] = useState(null);

  const inputEl = useRef(null);

  useEffect(() => {
    const fetchSellerMarkets = async () => {
      const response = await fetch("https://toteapi.onrender.com/markets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setSellerMarkets(json.markets);
    };
    const fetchAllMarkets = async () => {
      const response = await fetch("https://toteapi.onrender.com/markets/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setMarkets(json);
      setMarketID(json[0].marketID);
      setMarketName(json[0].marketName);
    };
    fetchSellerMarkets();
    fetchAllMarkets();
  }, [user.token, setMarketID, setMarketName]);

  const handleMarketClick = () => {
    setAddMarketError(null);
    setAddMarketID("");
    if (icon === faPlus) {
      setAddMarketDisplayClass("");
      setIcon(faXmark);
      setTimeout(() => {
        inputEl.current.focus();
      }, 0);
      return;
    }
    setAddMarketDisplayClass("hidden");
    setIcon(faPlus);
  };

  const handleMarketSubmit = (e) => {
    e.preventDefault();
    const addUserMarket = async () => {
      const response = await fetch(
        "https://toteapi.onrender.com/seller/markets",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ marketID: addMarketID }),
        }
      );
      const json = await response.json();
      console.log("poop", json);
      if (!response.ok) {
        setAddMarketError(json.error);
      }
      if (response.ok) {
        setAddMarketError(null);
        setSellerMarkets([...sellerMarkets, addMarketID]);
        setAddMarketID("");
      }
    };
    addUserMarket();
  };

  const handleChange = (e) => {
    setMarketID(e.target.value);
    const currentMarket = markets.filter(
      (market) => market.marketID === e.target.value
    )[0];
    setMarketName(currentMarket.marketName);
  };

  return (
    <div className="marketSelect">
      <form className="select-market-form">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Market</span>
          </label>
          <select
            onChange={handleChange}
            value={marketID}
            className="select select-sm w-full max-w-xs mb-3 select-primary"
          >
            {markets.map((market, index) => (
              <option key={index} value={market.marketID}>
                {market.marketName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="add-new-market">
        <div className="add-market-icon-container" onClick={handleMarketClick}>
          <FontAwesomeIcon icon={faShop} />
          <FontAwesomeIcon icon={icon} />
          <span> add market</span>
        </div>
        <form className={addMarketDisplayClass} onSubmit={handleMarketSubmit}>
          <input
            type="text"
            value={addMarketID}
            onChange={(e) => setAddMarketID(e.target.value)}
            ref={inputEl}
          />
          <button>Add Market</button>
          {addMarketError && <div className="error">{addMarketError}</div>}
        </form>
      </div>
    </div>
  );
};

export default MarketSelect;
