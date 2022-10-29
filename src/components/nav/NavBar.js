import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = ({logout}) => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <div className="navbar__item__center">
            <li className="navbar__item active"><img className="nav_logo" src="https://i.ibb.co/gW6PVmb/Patootle-Logo-transparent.png"/></li>
            <li className="navbar__item active navbar__create navbar__center">
                <Link className="navbar__link" to="/create">new entry</Link>
            </li>
            <li className="navbar__item active navbar__all navbar__center">
                <Link className="navbar__link" to="/entries">all entries</Link>
            </li>
            <li className="navbar__item active navbar__add__baby navbar__center">
                <Link className="navbar__link" to="/add_baby">add baby</Link>
            </li></div>
            <div className="navbar__right">
            <li className="navbar__item active navbar__item__right">
                <Link className="navbar__link" to="/profile">profile</Link>
            </li>
            {
                <li className="navbar__item active">
                    <Link className="navbar__link navbar__item__right" to="" onClick={() => {
                        console.log("clearing")
                        logout(undefined)
                        localStorage.removeItem("app_user");
                        navigate("/", { replace: true })
                    }}>logout</Link>
                </li>
            }</div>
        </ul>
    )
}