import { useProductsContext } from "../../hooks/useProductsContext";
import ProductTableItem from "./ProductTableItem";

const ProducerProduct = () => {
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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductTableItem product={product} key={product._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProducerProduct;
