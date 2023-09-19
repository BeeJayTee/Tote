import ProductTypesContext from "../../context/ProductTypesContext";
import { useContext } from "react";

const FilterForm = ({
  hidden,
  searchQuery,
  setSearchQuery,
  handleChange,
  producerNames,
  setProducerName,
  setProductType,
}) => {
  const { types } = useContext(ProductTypesContext);

  return (
    <div className="mt-4">
      <form
        className={`${
          hidden === "hidden" ? "hidden" : "form-control"
        } flex flex-row justify-center`}
      >
        <label className="label">
          Search
          <input
            className="input input-bordered mr-5 ml-2"
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleChange("query", e.target.value);
            }}
            value={searchQuery}
          />
        </label>

        {/* producer name dropdown */}
        <label className="label">
          Producer
          <select
            className="select select-bordered mr-5 ml-2"
            name="producers"
            onChange={(e) => {
              setProducerName(e.target.value);
              handleChange("producer", e.target.value);
            }}
          >
            <option value="">No Producer Selected</option>
            {producerNames.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer[producer._id]}
              </option>
            ))}
          </select>
        </label>

        {/* product type dropdown */}
        <label className="label">
          Product Type
          <select
            className="select select-bordered mr-5 ml-2"
            name="productTypes"
            onChange={(e) => {
              setProductType(e.target.value);
              handleChange("type", e.target.value);
            }}
          >
            <option value="">No Product Type Selected</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};

export default FilterForm;
