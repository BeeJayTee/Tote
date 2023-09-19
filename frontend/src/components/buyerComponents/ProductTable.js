import ProductCard from "./ProductCard";

const ProductTable = ({
  products,
  productsMessage,
  hidden,
  setCartList,
  cartList,
}) => {
  return (
    <div className={`${hidden} ProductsDisplay`}>
      {productsMessage && <div>{productsMessage}</div>}
      <div className="flex flex-col lg:flex-row flex-wrap mt-4 gap-4 justify-between items-center">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            index={index}
            key={index}
            setCartList={setCartList}
            cartList={cartList}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
