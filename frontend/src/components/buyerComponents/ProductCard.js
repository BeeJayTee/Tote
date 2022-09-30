import { useAuthContext } from "../../hooks/useAuthContext";

const ProductCard = ({ product, index }) => {
  const { user } = useAuthContext();

  const handleClick = (e, action, index) => {
    let input = document.querySelector(`#card-input-${index}`);
    if (action === "inc") {
      return (input.value = Number(input.value) + 1);
    }
    if (action === "dec" && input.value > 0) {
      return (input.value = Number(input.value) - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4141");
  };

  return (
    <div className="ProductCard">
      <div className="card w-96 bg-base-100 text-neutral border border-neutral shadow-xl pb-2">
        <div className="badge badge-outline badge-primary py-3 ml-5 mt-5 hover:bg-primary hover:text-white cursor-pointer">
          {product.type}
        </div>
        <div className="card-body items-center text-center">
          <p>{product.organization}</p>
          <h2 className="card-title text-4xl">{product.name}</h2>
          <p>
            ${product.pricePerUnit} / {product.unit}
          </p>
          <div className="relative w-40">
            <button
              className="absolute left-0 top-0 rounded-r-none btn btn-square"
              onClick={(e) => handleClick(e, "dec", index)}
            >
              -
            </button>
            <input
              type="text"
              className="w-full text-center px-12 input input-bordered"
              id={`card-input-${index}`}
              placeholder="0"
            />
            <button
              className="absolute right-0 top-0 rounded-l-none btn btn-square"
              onClick={(e) => handleClick(e, "inc", index)}
            >
              +
            </button>
          </div>
          <div className="card-actions justify-end">
            <div>
              <button className={`btn`}>add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
