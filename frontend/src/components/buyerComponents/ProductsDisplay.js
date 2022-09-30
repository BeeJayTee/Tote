import ProductCard from "./ProductCard";

const ProductTable = ({ products, productsMessage, hidden }) => {
  return (
    <div className={`${hidden} ProductsDisplay`}>
      {productsMessage && <div>{productsMessage}</div>}
      <div className="flex">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
