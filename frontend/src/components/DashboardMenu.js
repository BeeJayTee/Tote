import { Link } from "react-router-dom"


const DashboardMenu = () => {
    return (
        <header>
        <div className="dashboard-menu-container">
            <Link to="/dashboard">
                Home
            </Link>
        </div>
    </header>
    )
}

export default DashboardMenu