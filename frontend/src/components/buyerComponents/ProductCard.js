import { useEffect, useState } from "react";
import { useShoppingCartStore } from "../../stores/shoppingCartStore";

const ProductCard = ({ product, index, setCartList, cartList }) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [productUnit, setProductUnit] = useState(null);

  const items = useShoppingCartStore((state) => state.items);
  const setItems = useShoppingCartStore((state) => state.setItems);

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
    console.log(items);
    if (productQuantity > 0) {
      // initialize a reference to cart items
      const currentCart = [...items];

      // get the current product id
      const id = product._id;

      // create an object for the current product the user wants to add to cart
      const currentItem = {
        amount: productQuantity,
        product: product,
      };

      // check to see if the item is already in the cart
      const itemExists = currentCart.find((item, i) => {
        if (item.product._id === id) {
          item.amount += productQuantity;
          return true;
        }
        return false;
      });

      // if item is not in the cart add the whole product object to the cart
      // else modify the amount on the item in the cart
      if (!itemExists) {
        currentCart.push(currentItem);
      }

      setProductQuantity(0);
      setItems(currentCart);
    }
  };

  return (
    <div className="ProductCard">
      <div className="card min-w-[400px] lg:min-w-none bg-base-100 text-neutral border border-neutral shadow-xl py-3 px-3">
        {/* product type badge */}
        <div className="badge badge-outline badge-primary py-3 mb-3 hover:bg-primary hover:text-white cursor-pointer">
          {product.type}
        </div>
        <div className="flex flex-row items-center justify-between gap-8">
          <div>
            {/* organization name */}
            <p className="text-xs">{product.organization}</p>
            {/* product name */}
            <h2 className="card-title text-xl">{product.name}</h2>
          </div>
          <div>
            <p>
              ${product.pricePerUnit} / {productUnit}
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
