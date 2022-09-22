import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    return (
        <header>
            <div className="dashboard-menu-container">
                <Link to="/">
                    Home
                </Link>
                <nav>
                    {/* displays for all logged in users */}
                    {user && (
                        <div>
                            {/* displays if logged in user is a buyer user type */}
                            {user && user.userType === process.env.REACT_APP_BUYER_ID && (
                                <div>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span>0</span>
                                </div>
                            )}
                            {/* displays for admins */}
                            {user && user.userType === process.env.REACT_APP_ADMIN_ID && (
                                <ul>
                                    <li><Link to="/market-manager">Market Manager</Link></li>
                                    <li><Link to="/admin-manager">Admin Manager</Link></li>
                                </ul>
                            )}
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
    </header>
    )
}

export default Navbar