import { useState } from "react";
import { useSellerSignup } from "../hooks/useSellerSignup";
import { useBuyerSignup } from "../hooks/useBuyerSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [marketID, setMarketID] = useState("");
  const { sellerSignup, sellerError, isSellerLoading } = useSellerSignup();
  const { buyerSignup, buyerError, isBuyerLoading } = useBuyerSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSeller) {
      await sellerSignup(
        email,
        password,
        retypePassword,
        organization,
        marketID
      );
    }
    if (isBuyer) {
      await buyerSignup(email, password, retypePassword);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "isSeller") {
      setIsSeller(true);
      setIsBuyer(false);
    }
    if (e.target.value === "isBuyer") {
      setIsSeller(false);
      setIsBuyer(true);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <div>
        <label>
          <input
            type="radio"
            name="org-type"
            value="isBuyer"
            id="isBuyer"
            onChange={handleChange}
            checked={isBuyer === true}
          />
          Shopper
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="org-type"
            value="isSeller"
            id="isSeller"
            onChange={handleChange}
            checked={isSeller === true}
          />
          Seller
        </label>
      </div>
      {isSeller && (
        <div>
          <label>
            Business/Organization Name:
            <input
              type="text"
              onChange={(e) => setOrganization(e.target.value)}
              value={organization}
            />
          </label>
          <label>
            Market ID Code:
            <input
              type="text"
              onChange={(e) => setMarketID(e.target.value)}
              value={marketID}
            />
          </label>
        </div>
      )}
      <label>
        Password:
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        Retype Password:
        <input
          type="password"
          onChange={(e) => setRetypePassword(e.target.value)}
          value={retypePassword}
        />
      </label>
      {sellerError && <div className="error">{sellerError}</div>}
      {buyerError && <div className="error">{buyerError}</div>}
      <button disabled={isBuyerLoading || isSellerLoading}>Submit</button>
    </form>
  );
};

export default Signup;
