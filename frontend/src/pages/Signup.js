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
    <div className="flex flex-col-reverse md:flex-row items-center container m-auto">
      <form
        className="signup-form container m-auto flex flex-col items-center md:items-start basis-1/2 md:pl-24"
        onSubmit={handleSubmit}
      >
        <h3 className="font-['Helvetica'] text-center text-3xl font-thin mb-8">
          Sign Up
        </h3>

        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@email.com"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          <label>
            <div className="flex mb-4">
              <input
                className="radio radio-primary mr-1"
                type="radio"
                name="org-type"
                value="isBuyer"
                id="isBuyer"
                onChange={handleChange}
                checked={isBuyer === true}
              />
              <span>Shopper</span>
            </div>
          </label>
        </div>
        <div>
          <label>
            <div className="flex mb-4">
              <input
                className="radio radio-primary mr-1"
                type="radio"
                name="org-type"
                value="isSeller"
                id="isSeller"
                onChange={handleChange}
                checked={isSeller === true}
              />
              <span>Grower / Producer</span>
            </div>
          </label>
        </div>
        {isSeller && (
          <div>
            <div className="form-control w-full max-w-xs mb-4">
              <label className="label">
                <span className="label-text">Business / Organization Name</span>
              </label>
              <input
                type="text"
                onChange={(e) => setOrganization(e.target.value)}
                value={organization}
                placeholder="e.g. Tote Farm"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs mb-4">
              <label className="label">
                <span className="label-text">Market ID Code</span>
              </label>
              <input
                type="text"
                onChange={(e) => setMarketID(e.target.value)}
                value={marketID}
                placeholder="this is given to you by the market"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
        )}
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Retype Password</span>
          </label>
          <input
            type="password"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
            placeholder="type your password again"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {sellerError && <div className="error">{sellerError}</div>}
        {buyerError && <div className="error">{buyerError}</div>}
        <button
          disabled={isBuyerLoading || isSellerLoading}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>

      <div className="divider lg:divider-horizontal"></div>

      <div className="basis-1/2">
        <p className="text-xl font-light md:text-2xl mx-4 mt-8 md:mx-0 md:pl-24">
          <span className="text-primary font-['Helvetica'] font-bold">
            Tote
          </span>{" "}
          is a state of the art platform that allows farmers market attendees to
          reserve items that their favorite producers have available for
          purchase. It saves time and energy that we are always in need of. This
          comes with <span className="font-bold">no hidden fees</span> to you or
          the producer.
        </p>
      </div>
    </div>
  );
};

export default Signup;
