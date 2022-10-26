import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/create">Add New Entry</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/entries">All Entries</Link>
            </li>
            <li className="navbar__item active navbar__right">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                <li className="navbar__item navbar__right">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("app_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
            }
        </ul>
    )
}