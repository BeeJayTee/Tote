import { useAuthContext } from "../../hooks/useAuthContext";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useState } from "react";
import productTypes from "../../data/productTypes";

const ProductTableItem = ({ product, index }) => {
  const { user } = useAuthContext();
  const { dispatch } = useProductsContext();

  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [amount, setAmount] = useState(product.amount);
  const [unit, setUnit] = useState(product.unit);
  const [pricePerUnit, setPricePerUnit] = useState(product.pricePerUnit);

  const [newName, setNewName] = useState(product.name);
  const [newType, setNewType] = useState(product.type);
  const [newAmount, setNewAmount] = useState(product.amount);
  const [newUnit, setNewUnit] = useState(product.unit);
  const [newPricePerUnit, setNewPricePerUnit] = useState(product.pricePerUnit);

  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = async () => {
    setIsEdit(true);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(
      "http://localhost:4141/products/" + product._id,
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
              emptyFields.includes("name") ? "input-warning" : "input-primary"
            }`}
          />
        </td>
      )}
      {/* type section */}
      {!isEdit && <td>{type}</td>}
      {isEdit && (
        <td>
          <select
            className="select select-primary select-xs"
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
              emptyFields.includes("amount") ? "input-warning" : "input-primary"
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
                ? "input-warning"
                : "input-primary"
            }`}
          />
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
