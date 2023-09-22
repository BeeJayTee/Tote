import "../../styles/market-manager.css";
import AddMarketForm from "../../components/adminComponents/AddMarketForm";
import { useState } from "react";

const MarketManager = () => {
  const [display, setDisplay] = useState("form");

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl">Market Manager</h1>
        <div className="flex gap-2 justify-center my-8">
          <button
            className={`text-lg font-bold ${
              display === "form" ? "text-primary-focus" : "text-base-300"
            } `}
            onClick={() => setDisplay("form")}
          >
            Add New Market
          </button>
          <div className="divider divider-horizontal"></div>
          <button
            className={`text-lg font-bold ${
              display === "markets" ? "text-primary-focus" : "text-base-300"
            } `}
            onClick={() => setDisplay("markets")}
          >
            View Markets
          </button>
        </div>
      </div>
      {display === "form" && <AddMarketForm />}
    </div>
  );
};

export default MarketManager;
