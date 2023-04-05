import { useAuthContext } from "../../hooks/useAuthContext";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useState, useEffect } from "react";
import productTypes from "../../data/productTypes";

const ProductTableItem = ({ product, index }) => {
  const { user } = useAuthContext();
  const { dispatch } = useProductsContext();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [description, setDescription] = useState("");

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newPricePerUnit, setNewPricePerUnit] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setName(product.name);
    setType(product.type);
    setAmount(product.amount);
    setUnit(product.unit);
    setPricePerUnit(product.pricePerUnit);
    setDescription(product.description);

    setNewName(product.name);
    setNewType(product.type);
    setNewAmount(product.amount);
    setNewUnit(product.unit);
    setNewPricePerUnit(product.pricePerUnit);
    setNewDescription(product.description);
  }, [
    product.name,
    product.type,
    product.amount,
    product.unit,
    product.pricePerUnit,
    product.description,
  ]);

  const handleEditClick = async () => {
    setIsEdit(true);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(
      "https://toteapi.onrender.com/products/" + product._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  const handleSubmitClick = async () => {
    const response = await fetch(
      "http://localhost:4141/products/" + product._id,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newType,
          newAmount,
          newUnit,
          newPricePerUnit,
          newDescription,
        }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      setIsEdit(false);
      setEmptyFields([]);
      setError(false);
      setName(newName);
      setType(newType);
      setAmount(newAmount);
      setUnit(newUnit);
      setPricePerUnit(newPricePerUnit);
      setDescription(newDescription);
      return;
    }

    if (!response.ok) {
      if (json.emptyFields) {
        setEmptyFields(json.emptyFields);
        setError(json.error);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEdit(false);
    setError(null);
    setEmptyFields([]);
    setNewName(name);
    setNewType(type);
    setNewAmount(amount);
    setNewAmount(amount);
    setNewUnit(unit);
    setNewPricePerUnit(pricePerUnit);
    setNewPricePerUnit(pricePerUnit);
    setNewDescription(description);
  };

  return (
    <tr key={product._id}>
      {/* name section */}
      {!isEdit && <td>{name}</td>}
      {isEdit && (
        <td>
          <input
            type="text"
            value={newName}
            placeholder={name}
            onChange={(e) => setNewName(e.target.value)}
            className={`input input-xs ${
              emptyFields.includes("name") ? "input-error" : "input-primary"
            }`}
          />
        </td>
      )}
      {/* type section */}
      {!isEdit && <td>{type}</td>}
      {isEdit && (
        <td>
          <select
            className={`select select-xs ${
              emptyFields.includes("type") ? "select-error" : "select-primary"
            }`}
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            {productTypes.map((productType, index) => (
              <option key={index} value={productType}>
                {productType}
              </option>
            ))}
          </select>
        </td>
      )}
      {/* amount & unit section */}
      {!isEdit && (
        <td>
          {amount} {unit}
        </td>
      )}
      {isEdit && (
        <td>
          <input
            type="number"
            value={newAmount}
            placeholder={amount}
            onChange={(e) => setNewAmount(e.target.value)}
            className={`input input-xs ${
              emptyFields.includes("amount") ? "input-error" : "input-primary"
            }`}
          />
          <select
            className="select select-primary select-xs"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
          >
            <option value="lbs">lbs</option>
            <option value="bunches">bunches</option>
            <option value="kg">kg</option>
            <option value="each">each</option>
          </select>
        </td>
      )}
      {/* price per unit section */}
      {!isEdit && <td>{pricePerUnit}</td>}
      {isEdit && (
        <td>
          <input
            type="number"
            value={newPricePerUnit}
            placeholder={pricePerUnit}
            onChange={(e) => setNewPricePerUnit(e.target.value)}
            className={`input input-xs ${
              emptyFields.includes("pricePerUnit")
                ? "input-error"
                : "input-primary"
            }`}
          />
        </td>
      )}
      {/* description section */}
      {!isEdit && <td>{description}</td>}
      {isEdit && (
        <td>
          <textarea
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            placeholder={description}
            className={`textarea h-24 ${
              emptyFields.includes("description")
                ? "textarea-error"
                : "textarea-primary"
            }`}
          ></textarea>
        </td>
      )}
      {/* edit and delete buttons section */}
      {!isEdit && (
        <td>
          <button onClick={handleEditClick}>Edit</button> |{" "}
          <button onClick={handleDeleteClick}>Delete</button>
        </td>
      )}
      {isEdit && (
        <td>
          <button onClick={handleSubmitClick}>Submit</button> |{" "}
          <button onClick={handleCancelClick}>X</button>
          {error && <p className="text-error">{error}</p>}
        </td>
      )}
    </tr>
  );
};

export default ProductTableItem;
