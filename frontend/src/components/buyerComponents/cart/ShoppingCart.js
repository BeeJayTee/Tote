import ShoppingCartTableQuantity from "./ShoppingCartTableQuantity";
import ShoppingCartTotal from "./ShoppingCartTotal";

import { useShoppingCartStore } from "../../../stores/shoppingCartStore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from "react";

const ShoppingCart = ({ setBuyerDisplay }) => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const items = useShoppingCartStore((state) => state.items);
  const getDbItems = useShoppingCartStore((state) => state.getDbItems);
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    console.log("handleDelete");

    const response = await fetch("/buyer/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const json = await response.json();
    if (json.message) {
      console.log(json);
      getDbItems(user.token);
    } else {
      console.log(json.error);
    }
  };

  const handleClick = () => {
    setBuyerDisplay("market");
    setOrderSubmitted(false);
  };

  return (
    <div className="ShoppingCart mt-8 mx-2 lg:mx-0">
      <button
        className="mb-4 text-primary hover:text-primary-focus"
        onClick={() => setBuyerDisplay("market")}
      >
        ← back to market
      </button>
      {/* renders if there are items in the shopping cart */}
      {items.length > 0 && (
        <div className="flex flex-col-reverse gap-8 lg:flex-row justify-between">
          <div className="lg:w-[65%]">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th className="flex flex-col">
                      <span>Product Name</span>
                      <span className="text-primary lowercase font-normal">
                        Seller Name
                      </span>
                    </th>
                    <th>Quantity</th>
                    <th className="flex flex-col">
                      <span>Price</span>
                      <span className="text-primary lowercase font-normal">
                        per unit
                      </span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td className="flex flex-col">
                        <span>{item.productName}</span>
                        <span className="text-xs">{item.sellerName}</span>
                      </td>
                      <td>
                        <ShoppingCartTableQuantity
                          productQuantity={item.productQuantity}
                          _id={item._id}
                          storeItems={items}
                        />
                      </td>
                      <td>
                        $
                        {(Math.round(item.pricePerUnit * 100) / 100).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="p-2"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <ShoppingCartTotal setOrderSubmitted={setOrderSubmitted} />
          </div>
        </div>
      )}

      {/* renders if there are no items in the shopping cart */}
      {items.length === 0 && (
        <div className="text-center border-4 border-stone-300 w-fit m-auto px-12 py-12">
          <h4 className="text-2xl">
            {orderSubmitted
              ? "Thank you! Your order has been submitted."
              : "There are no items in your shopping cart!"}
          </h4>
          <button
            className="text-primary hover:text-primary-focus font-bold"
            onClick={handleClick}
          >
            {orderSubmitted ? "Back To The Market" : "Add Some Items"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
