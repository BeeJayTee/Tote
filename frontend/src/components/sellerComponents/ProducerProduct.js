import { useProductsContext } from "../../hooks/useProductsContext";
import ProductTableItem from "./ProductTableItem";

const ProducerProduct = ({ marketID, marketName }) => {
  const { products } = useProductsContext();

  return (
    <div className="producer-products overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Price per Unit</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            if (marketID === product.marketID) {
              return <ProductTableItem product={product} key={product._id} />;
            } else return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProducerProduct;
