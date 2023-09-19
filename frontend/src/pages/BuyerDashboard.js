import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductTable from "../components/buyerComponents/ProductTable";
import MarketSelect from "../components/buyerComponents/MarketSelect";
import FilterForm from "../components/buyerComponents/FilterForm";
import { useLogout } from "../hooks/useLogout";
import { useShoppingCartStore } from "../stores/shoppingCartStore";

const BuyerDashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [producerNames, setProducerNames] = useState([]);
  const [producerName, setProducerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [productType, setProductType] = useState("");
  const [productsMessage, setProductsMessage] = useState(null);
  const [marketID, setMarketID] = useState("");
  const [hidden, setHidden] = useState("");

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const getDbItems = useShoppingCartStore((state) => state.getDbItems);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("checking auth");
      const response = await fetch("/buyer", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(response);
      console.log(json);
      if (!response.ok) {
        logout();
      }
    };

    checkAuth();
  }, [logout, user.token]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      const filteredProducts = json.filter((product) => {
        return product.marketID === marketID;
      });
      setAllProducts(filteredProducts);
      setDisplayProducts(filteredProducts);
    };

    const fetchProducers = async () => {
      const response = await fetch("/products/producers", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setProducerNames(json);
    };

    ////// fetch cart here
    getDbItems(user.token);

    if (user) {
      fetchProducts();
      fetchProducers();
    }
  }, [user, marketID, getDbItems]);

  useEffect(() => {
    if (displayProducts.length === 0) {
      return setProductsMessage("There are no products to display.");
    }
    setProductsMessage(null);
  }, [displayProducts]);

  // changes when marketID is changed
  useEffect(() => {
    if (!marketID) {
      return setHidden("hidden");
    }
    setTimeout(() => {
      setHidden("");
    }, 100);
  }, [marketID]);

  const handleChange = (type, input) => {
    const setDisplayProductsReducer = (
      query = null,
      producer = null,
      type = null
    ) => {
      let products = allProducts;
      if (query.length) {
        products = products.filter((product) => {
          return product.name.startsWith(query);
        });
        setProductsMessage(null);
      }
      if (producer) {
        products = products.filter((product) => {
          return product.producerID === producer;
        });
        setProductsMessage(null);
      }
      if (type) {
        products = products.filter((product) => {
          return product.type === type;
        });
        setProductsMessage(null);
      }

      setDisplayProducts(products);
    };

    switch (type) {
      case "query":
        if (input === "") {
          setDisplayProducts(allProducts);
          break;
        }
        setDisplayProductsReducer(input, producerName, productType);
        break;
      case "producer":
        setDisplayProductsReducer(searchQuery, input, productType);
        break;
      case "type":
        setDisplayProductsReducer(searchQuery, producerName, input);
        break;
      default:
        break;
    }
  };

  return (
    <div className="BuyerDashboard container m-auto">
      <MarketSelect marketID={marketID} setMarketID={setMarketID} />

      {/* filter form */}
      <FilterForm
        hidden={hidden}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleChange={handleChange}
        producerNames={producerNames}
        setProducerName={setProducerName}
        setProductType={setProductType}
      />
      <ProductTable
        hidden={hidden}
        products={displayProducts}
        productsMessage={productsMessage}
      />
    </div>
  );
};

export default BuyerDashboard;
