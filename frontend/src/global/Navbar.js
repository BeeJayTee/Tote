import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import { useShoppingCartStore } from "../stores/shoppingCartStore";

const Navbar = ({ setBuyerDisplay, buyerDisplay }) => {
  const items = useShoppingCartStore((state) => state.items);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const handleCartClick = (display) => {
    setBuyerDisplay(display);
  };

  return (
    <header className="px-10 text-xs lg:text-sm">
      <div className="main-header">
        <Link to="/">
          <p className="text-2xl font-['Helvetica'] text-primary-focus hover:text-primary">
            Tote
          </p>
        </Link>
        <nav>
          {/* display options logged in users */}
          {user && (
            <div className="loggedin-container">
              {/* displays if logged in user is a buyer user type */}
              {user && user.userType === process.env.REACT_APP_BUYER_ID && (
                <div>
                  {/* this displays when the market is displayed */}
                  {buyerDisplay === "market" && (
                    <button
                      className="btn btn-primary btn-sm buyer-options hover:cursor-pointer text-primary hover:text-primary-focus text-base"
                      onClick={() => handleCartClick("cart")}
                    >
                      <div className="text-primary-content">
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className="text-xs ml-2">{items.length}</span>
                      </div>
                    </button>
                  )}

                  {/* this displays when the cart is displayed */}
                  {buyerDisplay === "cart" && (
                    <div
                      className="buyer-options hover:cursor-pointer text-primary hover:text-primary-focus"
                      onClick={() => handleCartClick("market")}
                    >
                      <button className="btn btn-sm btn-primary text-xs">
                        product select
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* displays for admins */}
              {user && user.userType === process.env.REACT_APP_ADMIN_ID && (
                <ul className="admin-options">
                  <li>
                    <Link to="/app/market-manager">
                      <span className="text-primary-focus hover:text-primary text-base">
                        Market Manager
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/app/admin-manager">
                      <span className="text-primary-focus hover:text-primary text-base">
                        Admin Manager
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
              <span className="font-extralight">{user.email}</span>
              <button
                onClick={handleClick}
                className="font-bold text-primary hover:text-primary-focus"
              >
                Logout
              </button>
            </div>
          )}
          {/* displays for none logged in users */}
          {!user && (
            <div className="guest-options">
              <Link to="/app/login">
                <p className="text-primary hover:text-primary-focus">Login</p>
              </Link>
              <Link to="/app/signup">
                <p className="text-primary hover:text-primary-focus">Signup</p>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
