import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const MarketSelect = ({ user, marketID, setMarketID, setMarketName }) => {
  // const [sellerMarkets, setSellerMarkets] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [addMarketID, setAddMarketID] = useState("");
  const [addMarketDisplayClass, setAddMarketDisplayClass] = useState("hidden");
  const [icon, setIcon] = useState(faPlus);
  const [addMarketError, setAddMarketError] = useState(null);

  const inputEl = useRef(null);

  useEffect(() => {
    const fetchSellerMarkets = async () => {
      const response = await fetch("/seller/markets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setMarketID(json.markets[0].id);
      setMarketName(json.markets[0].name);
      setMarkets(json.markets);
    };
    // const fetchAllMarkets = async () => {
    //   const response = await fetch("/markets", {
    //     headers: { Authorization: `Bearer ${user.token}` },
    //   });
    //   const json = await response.json();
    //   // console.log(json);
    //   setMarkets(json);
    //   setMarketID(json[0].marketID);
    //   setMarketName(json[0].marketName);
    // };
    fetchSellerMarkets();
    // fetchAllMarkets();
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
      const response = await fetch("/seller/markets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ marketID: addMarketID }),
      });
      const json = await response.json();
      if (!response.ok) {
        setAddMarketError(json.error);
      }
      if (response.ok) {
        setAddMarketError(null);
        setMarkets([
          ...markets,
          { id: json.id, name: json.name, _id: json._id },
        ]);
        setAddMarketID("");
      }
    };
    addUserMarket();
  };

  const handleChange = (e) => {
    setMarketID(e.target.value);
    console.log(markets);
    const currentMarket = markets.filter(
      (market) => market.id === e.target.value
    )[0];
    console.log(currentMarket);
    setMarketName(currentMarket.name);
    setMarketID(currentMarket.id);
  };

  return (
    <div className="marketSelect">
      <div className="w-fit m-auto">
        <form className="select-market-form ">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select Market</span>
            </label>
            <select
              onChange={handleChange}
              value={marketID}
              className="select select-sm w-full max-w-xs mb-3 select-primary"
            >
              {markets.map((market, index) => {
                return (
                  <option key={index} value={market.id}>
                    {market.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className="text-primary">
          <button
            className="btn btn-sm text-xs btn-primary"
            onClick={handleMarketClick}
          >
            <FontAwesomeIcon icon={faShop} />
            <FontAwesomeIcon icon={icon} />
            <span className="ml-2">
              {icon === faPlus ? "add market" : "close"}
            </span>
          </button>
          <form className={addMarketDisplayClass} onSubmit={handleMarketSubmit}>
            <input
              className="input input-xs input-primary mt-2 mr-2"
              type="text"
              value={addMarketID}
              onChange={(e) => setAddMarketID(e.target.value)}
              ref={inputEl}
            />
            <button className="text-primary hover:text-primary-content border border-primary hover:bg-primary px-2 py-1 rounded-md">
              Add Market
            </button>
            {addMarketError && <div className="error">{addMarketError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketSelect;
