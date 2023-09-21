import { useEffect, useState } from "react";
import { useShoppingCartStore } from "../../../stores/shoppingCartStore";

const ShoppingCartTotal = () => {
  const [numItems, setNumItems] = useState(null);
  const [total, setTotal] = useState(null);

  const items = useShoppingCartStore((state) => state.items);

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
      <button className="btn btn-md text-xs btn-primary w-full">
        Submit Order
      </button>
    </div>
  );
};

export default ShoppingCartTotal;
