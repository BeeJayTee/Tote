import { useEffect, useState } from "react";
import AddProduct from "../components/sellerComponents/AddProduct";
import ProducerProduct from "../components/sellerComponents/ProducerProduct";
import MarketSelect from "../components/sellerComponents/MarketSelect";
import { useProductsContext } from "../hooks/useProductsContext";
import "../styles/seller-dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";

const SellerDashboard = () => {
  const [marketID, setMarketID] = useState("");
  const [marketName, setMarketName] = useState("");

  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const producerID = JSON.parse(localStorage.getItem("user")).token;

    const fetchProducts = async () => {
      const response = await fetch("/products/producer/" + producerID, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

  return (
    <div className="SellerDashboard container m-auto">
      <MarketSelect
        user={user}
        setMarketID={setMarketID}
        marketID={marketID}
        setMarketName={setMarketName}
      />
      <div className="main">
        <div className="products">
          {products && (
            <ProducerProduct marketID={marketID} marketName={marketName} />
          )}
        </div>
        <AddProduct marketID={marketID} marketName={marketName} />
      </div>
    </div>
  );
};

export default SellerDashboard;
