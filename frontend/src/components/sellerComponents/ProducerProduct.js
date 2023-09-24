import { useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import ProductTableItem from "./ProductTableItem";

const ProducerProduct = ({ marketID, marketName }) => {
  const [isItemEdit, setIsItemEdit] = useState(false);

  const { products } = useProductsContext();

  return (
    <div
      className={`producer-products overflow-x-auto w-full ${
        isItemEdit
          ? "absolute w-[95vw] left-[2.5%] drop-shadow-md border-2 border-primary-focus rounded-2xl"
          : ""
      }`}
    >
      <table className="table table-compact table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Price per Unit</th>
            <th className="w-fit">Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            if (marketID === product.marketID) {
              return (
                <ProductTableItem
                  product={product}
                  key={product._id}
                  setIsItemEdit={setIsItemEdit}
                />
              );
            } else return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProducerProduct;
