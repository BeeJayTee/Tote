import { useEffect, useState } from "react";
import { useShoppingCartStore } from "../../../stores/shoppingCartStore";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ShoppingCartTotal = ({ setOrderSubmitted }) => {
  const [numItems, setNumItems] = useState(null);
  const [total, setTotal] = useState(null);

  const items = useShoppingCartStore((state) => state.items);
  const getDbItems = useShoppingCartStore((state) => state.getDbItems);
  const { user } = useAuthContext();

  useEffect(() => {
    const totalNumItems = items.reduce((prev, curr) => {
      return prev + curr.productQuantity;
    }, 0);
    setNumItems(totalNumItems);

    const totalValue = items.reduce((prev, curr) => {
      const currentTotal = curr.productQuantity * curr.pricePerUnit;
      return prev + currentTotal;
    }, 0);
    setTotal((Math.round(totalValue * 100) / 100).toFixed(2));
  }, [items]);

  const handleSubmit = async () => {
    const response = await fetch("/buyer/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json.message);
      getDbItems();
      setOrderSubmitted(true);
    }
  };

  return (
    <div className="border-4 border-primary-focus rounded-md px-8 md:px-32 lg:px-8 py-4 text-secondary-content xl:mr-32">
      <h4 className="font-bold text-lg mb-8">Order Summary</h4>
      <div className="flex gap-12 text-sm justify-between mb-4">
        <span className="font-extralight">Number of Items</span>
        <span className="font-bold">{numItems}</span>
      </div>
      <div className="flex gap-12 text-sm justify-between mb-4">
        <span className="font-extralight">Total</span>
        <span className="font-bold">${total}</span>
      </div>
      <button
        className="btn btn-md text-xs btn-primary w-full"
        onClick={handleSubmit}
      >
        Submit Order
      </button>
    </div>
  );
};

export default ShoppingCartTotal;
