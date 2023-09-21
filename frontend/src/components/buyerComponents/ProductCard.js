import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";
import { useCapitalize } from "../../hooks/useCapitalize";

const ProductCard = ({ product, index }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [productUnit, setProductUnit] = useState(null);

  const { user } = useAuthContext();
  const getDbItems = useShoppingCartStore((state) => state.getDbItems);
  const { capitalize } = useCapitalize();

  useEffect(() => {
    // sets the proper unit for the product card display
    switch (product.unit) {
      case "pounds":
        setProductUnit("pound");
        break;
      case "bags":
        setProductUnit("bag");
        break;
      case "each":
        setProductUnit("each");
        break;
      case "kilograms":
        setProductUnit("kg");
        break;
      case "gallons":
        setProductUnit("gallon");
        break;
      case "quarts":
        setProductUnit("qt");
        break;
      case "pints":
        setProductUnit("pint");
        break;
      case "cups":
        setProductUnit("cup");
        break;
      default:
        break;
    }
  }, [product.unit]);

  const handleClick = (e, action, index) => {
    let input = document.querySelector(`#card-input-${index}`);
    if (action === "inc") {
      return setProductQuantity(productQuantity + 1);
    }
    if (action === "dec" && input.value > 0) {
      return setProductQuantity(productQuantity - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (productQuantity > 0) {
      const item = { product, productQuantity };
      const response = await fetch("/buyer/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(item),
      });
      const json = await response.json();
      if (response.ok) {
        getDbItems(user.token);
        setProductQuantity(0);
        console.log("cart updated");
      } else {
        console.log(json);
      }
    }
  };

  return (
    <div className="ProductCard">
      <div className="card min-w-[400px] lg:min-w-none bg-base-100 text-neutral border border-neutral shadow-xl py-3 px-3 border-4 border-primary-focus">
        {/* product type badge */}
        <div className="badge badge-xs badge-outline badge-primary py-3 mb-3 hover:bg-primary hover:text-white cursor-pointer">
          {product.type}
        </div>
        <div className="flex flex-row items-center justify-between gap-8">
          <div>
            {/* organization name */}
            <p className="text-xs">{product.organization}</p>
            {/* product name */}
            <h2 className="card-title text-xl font-extrabold">
              {capitalize(product.name)}
            </h2>
          </div>
          <div>
            <p className="text-sm">
              ${(Math.round(product.pricePerUnit * 100) / 100).toFixed(2)} /{" "}
              {productUnit}
            </p>
          </div>

          {/* prouduct amount selectors */}
          <div className="flex flex-col items-center">
            <div className="relative w-24">
              <button
                className="absolute left-0 top-0 rounded-r-none btn btn-sm btn-square"
                onClick={(e) => handleClick(e, "dec", index)}
              >
                -
              </button>
              <input
                type="text"
                className="w-full text-center px-2 input input-sm input-bordered"
                id={`card-input-${index}`}
                placeholder="0"
                value={productQuantity}
                readOnly
              />
              <button
                className="absolute right-0 top-0 rounded-l-none btn btn-sm btn-square"
                onClick={(e) => handleClick(e, "inc", index)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* add to cart button */}
        <div className="card-actions justify-center">
          <div>
            <button
              className="btn btn-sm text-xs text-white bg-primary"
              onClick={handleSubmit}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
