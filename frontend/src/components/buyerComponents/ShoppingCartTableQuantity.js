import { useEffect, useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

const ShoppingCartTableQuantity = ({ productQuantity, _id }) => {
  const [localProductQuantity, setLocalProductQuantity] =
    useState(productQuantity);
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    if (localProductQuantity !== productQuantity) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [localProductQuantity, productQuantity]);

  const handleClick = (action) => {
    if (action === "inc") {
      return setLocalProductQuantity(localProductQuantity + 1);
    }
    if (action === "dec" && localProductQuantity > 0) {
      return setLocalProductQuantity(localProductQuantity - 1);
    }
  };

  const handleSubmit = async (_id) => {
    console.log("handleSubmit");
    console.log(_id);

    const response = await fetch("/buyer/cart/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ newAmount: localProductQuantity, _id: _id }),
    });
    // eslint-disable-next-line no-unused-vars
    const json = await response.json();
    if (response.ok) {
      setIsEdit(false);
    }
  };

  return (
    <div className="relative">
      {isEdit && (
        <div className="absolute ml-[100px] mt-[2px]">
          <p
            onClick={() => handleSubmit(_id)}
            className="text-xs cursor-pointer text-accent-focus hover:text-accent-content"
          >
            update
          </p>
        </div>
      )}
      <div className="relative w-24">
        <button
          className="absolute left-0 top-0 rounded-r-none btn btn-sm btn-square bg-primary-focus"
          onClick={(e) => handleClick("dec")}
        >
          -
        </button>
        <input
          type="text"
          className={`
          w-full text-center px-2 input input-sm input-bordered
          ${!isEdit ? "inherit" : "text-accent-focus"}
          `}
          value={localProductQuantity}
          readOnly
        />
        <button
          className="absolute right-0 top-0 rounded-l-none btn btn-sm btn-square bg-primary"
          onClick={() => handleClick("inc")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartTableQuantity;
