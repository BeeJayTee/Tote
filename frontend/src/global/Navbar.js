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
        <Link to="/">Home</Link>
        <nav>
          {/* display options logged in users */}
          {user && (
            <div className="loggedin-container">
              {/* displays if logged in user is a buyer user type */}
              {user && user.userType === process.env.REACT_APP_BUYER_ID && (
                <div>
                  {/* this displays when the market is displayed */}
                  {buyerDisplay === "market" && (
                    <div
                      className="buyer-options hover:cursor-pointer text-primary hover:text-primary-focus text-base"
                      onClick={() => handleCartClick("cart")}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                      <span className="opacity-50 ml-[2px]">
                        {items.length}
                      </span>
                    </div>
                  )}

                  {/* this displays when the cart is displayed */}
                  {buyerDisplay === "cart" && (
                    <div
                      className="buyer-options hover:cursor-pointer text-primary hover:text-primary-focus"
                      onClick={() => handleCartClick("market")}
                    >
                      <p className="font-semibold">product select</p>
                    </div>
                  )}
                </div>
              )}
              {/* displays for admins */}
              {user && user.userType === process.env.REACT_APP_ADMIN_ID && (
                <ul className="admin-options">
                  <li>
                    <Link to="/app/market-manager">Market Manager</Link>
                  </li>
                  <li>
                    <Link to="/app/admin-manager">Admin Manager</Link>
                  </li>
                </ul>
              )}
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {/* displays for none logged in users */}
          {!user && (
            <div className="guest-options">
              <Link to="/app/login">Login</Link>
              <Link to="/app/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
