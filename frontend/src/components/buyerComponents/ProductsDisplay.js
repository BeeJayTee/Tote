import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProductTable = ({ products, productsMessage, hidden }) => {
  const [error, setError] = useState(null);
  const [errorIDs, setErrorIDs] = useState([]);

  const { user } = useAuthContext();

  const handleSubmit = async (e, id, minPurchase) => {
    if (e.target[0].value < minPurchase) {
      e.preventDefault();
      setErrorIDs([...errorIDs, id]);
      setError(`You must order at least ${minPurchase}.`);
      return;
    }
    setError(null);
    const updateNumber = e.target[0].value;
    const response = await fetch("http://localhost:4141/products/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ updateNumber: updateNumber }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className={`${hidden} ProductsDisplay`}>
      {productsMessage && <div>{productsMessage}</div>}
      <div className="flex">
        {products.map((product, index) => (
          <div className="card w-96 bg-base-100 text-neutral border border-neutral">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p>
                ${product.pricePerUnit} / {product.unit}
              </p>
              <div className="card-actions justify-end">
                <div class="relative w-40">
                  <button class="absolute left-0 top-0 rounded-r-none btn btn-square">
                    -
                  </button>
                  <input
                    type="text"
                    class="w-full text-center px-12 input input-bordered"
                    value="5"
                  />
                  <button class="absolute right-0 top-0 rounded-l-none btn btn-square">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <div className="ProductTable">
    //   <div className={hidden}>
    //     {productsMessage && <div>{productsMessage}</div>}
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Name</th>
    //           <th>Type</th>
    //           <th>Amount</th>
    //           <th>Price per Unit</th>
    //           <th>Minimum</th>
    //           <th>Producer</th>
    //           <th>&nbsp;</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {products.map((product, index) => (
    //           <tr
    //             key={product._id}
    //             className={`${index % 2 === 0 ? "bg-base-200" : ""}`}
    //           >
    //             <td>{product.name}</td>
    //             <td>{product.type}</td>
    //             <td>
    //               {product.amount} {product.unit}
    //             </td>
    //             <td>{product.pricePerUnit}</td>
    //             <td>{product.minPurchase}</td>
    //             <td>{product.organization}</td>
    //             <td>
    //               <form
    //                 onSubmit={(e) =>
    //                   handleSubmit(e, product._id, product.minPurchase)
    //                 }
    //               >
    //                 <input type="number" name="number" />
    //                 <button>Add to cart</button>
    //                 {error && errorIDs.includes(product._id) && (
    //                   <div className="error">{error}</div>
    //                 )}
    //               </form>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default ProductTable;
