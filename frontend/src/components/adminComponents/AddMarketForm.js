import { useState } from "react";
import { useAddMarket } from "../../hooks/useAddMarket";
import { Countries } from "country-and-province";

const AddMarketForm = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [marketName, setMarketName] = useState("");

  const [marketStreetAddress, setMarketStreetAddress] = useState("");
  const [marketStreetAddressSec, setMarketStreetAddressSec] = useState("");
  const [marketCity, setMarketCity] = useState("");
  const [marketProv, setMarketProv] = useState("");
  const [marketDisplayProv, setMarketDisplayProv] = useState([]);
  const [marketPostal, setMarketPostal] = useState("");
  const [marketCountry, setMarketCountry] = useState("");
  const [marketProvDisabled, setMarketProvDisabled] = useState(true);

  const [mailingHidden, setMailingHidden] = useState("");
  const [mailingStreetAddress, setMailingStreetAddress] = useState("");
  const [mailingStreetAddressSec, setMailingStreetAddressSec] = useState("");
  const [mailingCity, setMailingCity] = useState("");
  const [mailingProv, setMailingProv] = useState("");
  const [mailingDisplayProv, setMailingDisplayProv] = useState([]);
  const [mailingPostal, setMailingPostal] = useState("");
  const [mailingCountry, setMailingCountry] = useState("");
  const [mailingProvDisabled, setMailingProvDisabled] = useState(true);

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);

  const { addMarket, isLoading, error } = useAddMarket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const marketAddressObj = {
      street: marketStreetAddress,
      streetSec: marketStreetAddressSec,
      city: marketCity,
      province: marketProv,
      country: marketCountry,
      postalCode: marketPostal,
    };
    if (mailingHidden.length > 0) {
      const data = await addMarket(
        adminName,
        adminEmail,
        marketName,
        marketAddressObj,
        marketAddressObj,
        phone
      );
      if (data.adminName) {
        marketAdded();
      }
    } else {
      const mailingAddressObj = {
        street: marketStreetAddress,
        streetSec: marketStreetAddressSec,
        city: marketCity,
        province: marketProv,
        country: marketCountry,
        postalCode: marketPostal,
      };
      const data = await addMarket(
        adminName,
        adminEmail,
        marketName,
        marketAddressObj,
        mailingAddressObj,
        phone
      );
      if (data.adminName) {
        marketAdded();
      }
    }
  };

  const marketAdded = () => {
    setMessage("Market Added");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setAdminName("");
    setAdminEmail("");
    setMarketName("");
    setPhone("");

    setMarketProv("");
    setMarketCity("");
    setMarketCountry("");
    setMarketDisplayProv([]);
    setMarketStreetAddress("");
    setMarketStreetAddressSec("");
    setMarketPostal("");

    setMailingProv("");
    setMailingCity("");
    setMailingCountry("");
    setMailingDisplayProv([]);
    setMailingStreetAddress("");
    setMailingStreetAddressSec("");
    setMailingPostal("");
  };

  const handleMarketCountryChange = (e) => {
    setMarketCountry(e.target.value);
    if (!e.target.value.length) {
      setMarketProvDisabled(true);
      setMarketDisplayProv([]);
      return;
    }
    setMarketProvDisabled(false);
    const provObjs = Countries.byName(e.target.value).provinces.data;
    const arr = [];
    for (let i = 0; i < provObjs.length; i++) {
      arr.push(provObjs[i].name);
    }
    const finalArr = arr.map((prov, index) => (
      <option key={index} value={prov}>
        {prov}
      </option>
    ));
    setMarketDisplayProv(finalArr);
  };

  const handleMailingCountryChange = (e) => {
    setMailingCountry(e.target.value);
    if (!e.target.value.length) {
      setMailingProvDisabled(true);
      setMailingDisplayProv([]);
      return;
    }
    setMailingProvDisabled(false);
    const provObjs = Countries.byName(e.target.value).provinces.data;
    const arr = [];
    for (let i = 0; i < provObjs.length; i++) {
      arr.push(provObjs[i].name);
    }
    const finalArr = arr.map((prov, index) => (
      <option key={index} value={prov}>
        {prov}
      </option>
    ));
    setMailingDisplayProv(finalArr);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setMailingHidden("hidden");
    } else if (!e.target.checked) {
      setMailingHidden("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control w-fit items-center m-auto"
    >
      <div className="form-control flex flex-row gap-10">
        <div className="form-control w-full max-w-xs gap-1.5">
          <legend className="font-bold">Contact Info</legend>
          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Market Director Name</span>
            </label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Market Director Email</span>
            </label>
            <input
              type="text"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Market Name</span>
            </label>
            <input
              type="text"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>
        </div>

        <div className="form-control w-full max-w-xs gap-1.5">
          <legend className="font-bold">Market Address</legend>
          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Street Address</span>
            </label>
            <input
              type="text"
              value={marketStreetAddress}
              onChange={(e) => setMarketStreetAddress(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Street Address Cont'd</span>
            </label>
            <input
              type="text"
              value={marketStreetAddressSec}
              onChange={(e) => setMarketStreetAddressSec(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Country</span>
            </label>
            <select
              onChange={handleMarketCountryChange}
              value={marketCountry}
              className="select select-sm select-primary"
            >
              <option selected>Country</option>
              <option value="canada">Canada</option>
              <option value="united states">United States</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              value={marketCity}
              onChange={(e) => setMarketCity(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">State / Province</span>
            </label>
            <select
              disabled={marketProvDisabled}
              onChange={(e) => setMarketProv(e.target.value)}
              value={marketProv}
              className="select select-sm select-primary"
            >
              <option disabled selected>
                Select State / Province
              </option>
              {marketDisplayProv}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Postal Code</span>
            </label>
            <input
              type="text"
              value={marketPostal}
              onChange={(e) => setMarketPostal(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Same As Mailing Address</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </div>

        <div
          className={`${mailingHidden} form-control w-full max-w-xs gap-1.5`}
        >
          <legend className="font-bold">Mailing Address</legend>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Street Address</span>
            </label>
            <input
              type="text"
              value={mailingStreetAddress}
              onChange={(e) => setMailingStreetAddress(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Street Address Cont'd</span>
            </label>
            <input
              type="text"
              value={mailingStreetAddressSec}
              onChange={(e) => setMailingStreetAddressSec(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Country</span>
            </label>
            <select
              onChange={handleMailingCountryChange}
              value={mailingCountry}
              className="select select-sm select-primary"
            >
              <option selected>Country</option>
              <option value="canada">Canada</option>
              <option value="united states">United States</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              value={mailingCity}
              onChange={(e) => setMailingCity(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">State / Province</span>
            </label>
            <select
              disabled={mailingProvDisabled}
              onChange={(e) => setMailingProv(e.target.value)}
              value={mailingProv}
              className="select select-sm select-primary"
            >
              <option disabled selected>
                Select State / Province
              </option>
              {mailingDisplayProv}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label p-0">
              <span className="label-text">Postal Code</span>
            </label>
            <input
              type="text"
              value={mailingPostal}
              onChange={(e) => setMailingPostal(e.target.value)}
              className="input input-sm input-primary w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      <button disabled={isLoading} class="btn btn-primary w-fit">
        Add New Market
      </button>
      {error && <div className="error">{error}</div>}
      {message && <div>{message}</div>}
    </form>
  );
};

export default AddMarketForm;
