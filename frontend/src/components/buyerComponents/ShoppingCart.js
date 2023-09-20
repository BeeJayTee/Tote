import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import ShoppingCartTableQuantity from "./ShoppingCartTableQuantity";

const ShoppingCart = () => {
  const items = useShoppingCartStore((state) => state.items);

  return (
    <div className="ShoppingCart w-[65%] mt-24">
      <div className="overflow-x-auto">
        <table className="table w-full">
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
                  />
                </td>
                <td>
                  ${(Math.round(item.pricePerUnit * 100) / 100).toFixed(2)}
                </td>
                <td>x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
