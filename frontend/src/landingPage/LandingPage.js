import heroImg from "../assets/landingPage/hero-img.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to <span className="text-secondary">Tote</span>
            </h1>
            <p className="mb-5">Farmers Market Pre-Ordering</p>
            <Link to="/app">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-24 gap-y-8 lg:flex-row lg:justify-around container m-auto">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Market Goers</h2>
            <p>
              Browse the market's online selection and pre-purchase products
              before arriving at the market.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Farmers & Producers</h2>
            <p>
              Easily list your products available, bundle the items with the
              label, and we'll come and grab the orders at the market.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Market Directors</h2>
            <p>
              Learn about the benefits of using Tote and how to register your
              market.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
