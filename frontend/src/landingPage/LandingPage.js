import heroImg from "../assets/landingPage/hero-img.jpg";
import marketsSvg from "../assets/landingPage/markets.svg";
import producersSvg from "../assets/landingPage/producers.svg";
import shoppersSvg from "../assets/landingPage/shoppers.svg";
import marketTechImg from "../assets/landingPage/market-technology.jpg";
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
      <div className="bg-primary-focus py-32">
        <div className="flex flex-col items-center gap-y-8 container m-auto lg:flex-row lg:justify-around lg:gap-x-8">
          <div className="card w-96 bg-base-100 shadow-xl lg:self-stretch">
            <figure className="px-10 pt-10">
              <img src={shoppersSvg} alt="Shoppers" className="w-1/4" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Market Goers</h2>
              <p>
                Browse the market's online selection and pre-purchase products
                before arriving at the market.
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl lg:self-stretch">
            <figure className="px-10 pt-10">
              <img src={producersSvg} alt="Producers" className="w-1/4" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Farmers & Producers</h2>
              <p>
                Easily list your products available, bundle the items with the
                label, and we'll come and grab the orders at the market.
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl lg:self-stretch">
            <figure className="px-10 pt-10">
              <img src={marketsSvg} alt="Markets" className="w-1/4" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Market Directors</h2>
              <p>
                Learn about the benefits of using Tote and how to register your
                market.
              </p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-fit bg-base-100 py-32">
        <div className="hero-content flex-col gap-32 lg:flex-row-reverse">
          <img
            src={marketTechImg}
            alt="Farmers Market in a Digital Age"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h2 className="text-5xl font-bold max-w-lg">
              The Farmer's Market in the Digital Age
            </h2>
            <p className="py-6 max-w-lg">
              We believe Efficiency and Sustainability go hand in hand. Our
              platform allows market producers to connect with their customers
              using the simplicity of technology.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <Link to="/app/login">
            <p className="link link-hover">Login</p>
          </Link>
          <Link to="/app/signup">
            <p className="link link-hover">Sign Up</p>
          </Link>
          <Link to="/market-request">
            <p className="link link-hover">Market Request</p>
          </Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a href="http://twitter.com" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="http://youtube.com" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="http://facebook.com" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2022 - All right reserved by Tote Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
