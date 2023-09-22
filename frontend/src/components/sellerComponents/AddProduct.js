import { useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import productTypes from "../../data/productTypes";
import unitTypes from "../../data/unitTypes";

const AddProduct = ({ marketID, marketName }) => {
  const { dispatch } = useProductsContext();
  // producer id needs to be a dynamic value from the logged in user after auth set up
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const product = {
      name,
      type,
      amount,
      unit,
      pricePerUnit,
      description,
      marketID,
    };

    const response = await fetch("/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(product),
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName("");
      setType("");
      setUnit("");
      setPricePerUnit("");
      setAmount("");
      setDescription("");
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <form className="add-product-form form-control" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">Add a New Product</h3>
      <p className="flex items-center gap-2 mb-2">
        <span className="text-xs">for: </span>{" "}
        <span className="uppercase text-primary">{marketName}</span>
      </p>
      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Product Name</span>
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={`input input-sm w-full max-w-xs ${
            emptyFields.includes("name") ? "input-error" : "input-primary"
          }`}
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Product Type</span>
        </label>
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className={`select select-sm w-full max-w-xs mb-3 ${
            emptyFields.includes("type") ? "select-error" : "select-primary"
          }`}
        >
          <option value="">select type</option>
          {productTypes.map((productType, index) => (
            <option key={index} value={productType}>
              {productType}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Amount Available</span>
        </label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className={`input input-sm w-full max-w-xs ${
            emptyFields.includes("name") ? "input-error" : "input-primary"
          }`}
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Product Unit</span>
        </label>
        <select
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
          className={`select select-sm w-full max-w-xs mb-3 ${
            emptyFields.includes("unit") ? "select-error" : "select-primary"
          }`}
        >
          <option value="">select unit</option>
          {unitTypes.map((unitType, index) => (
            <option key={index} value={unitType}>
              {unitType}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Price Per Unit</span>
        </label>
        <input
          type="number"
          onChange={(e) => setPricePerUnit(e.target.value)}
          value={pricePerUnit}
          className={`input input-sm w-full max-w-xs ${
            emptyFields.includes("pricePerUnit")
              ? "input-error"
              : "input-primary"
          }`}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label p-0">
          <span className="label-text">Short Description</span>
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`textarea h-24 ${
            emptyFields.includes("description")
              ? "textarea-error"
              : "textarea-primary"
          }`}
        ></textarea>
      </div>

      <button className="mt-4 btn btn-primary">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddProduct;
