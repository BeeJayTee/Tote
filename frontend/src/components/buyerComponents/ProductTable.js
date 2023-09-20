import ProductCard from "./ProductCard";

const ProductTable = ({ products, productsMessage, hidden }) => {
  return (
    <div className={`${hidden} ProductsDisplay`}>
      {productsMessage && <div>{productsMessage}</div>}
      <div className="flex flex-col lg:flex-row flex-wrap mt-4 gap-4 lg:w-[80%] m-auto xl:w-full justify-between items-center">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
