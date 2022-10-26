import { useEffect, useState } from "react";
import AddProduct from "../components/sellerComponents/AddProduct";
import ProducerProduct from "../components/sellerComponents/ProducerProduct";
import MarketSelect from "../components/sellerComponents/MarketSelect";
import { useProductsContext } from "../hooks/useProductsContext";
import "../styles/seller-dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const SellerDashboard = () => {
  const [marketID, setMarketID] = useState("");
  const [marketName, setMarketName] = useState("");

  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("checking auth");
      const response = await fetch(
        "https://tote.thebrandontucker.com/seller/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      console.log(response);
      console.log(json);
      if (!response.ok) {
        logout();
      }
    };

    checkAuth();
  });

  useEffect(() => {
    const producerID = JSON.parse(localStorage.getItem("user")).token;

    const fetchProducts = async () => {
      const response = await fetch(
        "https://tote.thebrandontucker.com/products/producer/" + producerID,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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
    <div className="SellerDashboard container">
      <MarketSelect
        user={user}
        setMarketID={setMarketID}
        marketID={marketID}
        setMarketName={setMarketName}
      />
      <div className="main">
        <div className="products">{products && <ProducerProduct />}</div>
        <AddProduct marketID={marketID} marketName={marketName} />
      </div>
    </div>
  );
};

export default SellerDashboard;
