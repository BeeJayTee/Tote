import ProductCard from "./ProductCard";

const ProductTable = ({ products, productsMessage, hidden }) => {
  return (
    <div className={`${hidden} ProductsDisplay`}>
      {productsMessage && <div>{productsMessage}</div>}
      <div className="grid mx-8 lg:mx-0 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
