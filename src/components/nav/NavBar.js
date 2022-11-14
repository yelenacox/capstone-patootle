import { Link, useNavigate } from "react-router-dom"
import { NavBabyChoice } from "./NavBabyChoice"
import "./NavBar.css"
import PatootleLogoTransparent from '../../images/Patootle-Logo-transparent.png'
import { useEffect } from "react"


export const NavBar = ({userBabies, setUserBabies, selectedUserBaby, setSelectedUserBaby}) => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <div className="navbar__item__center">
                <li className="navbar__item active"><Link to="/"><img className="nav_logo" src={PatootleLogoTransparent} /></Link></li>
                <li className="navbar__item active navbar__create navbar__center">
                    <Link className="navbar__link" to="/create">new entry</Link>
                </li>
                <li className="navbar__item active navbar__all navbar__center">
                    <Link className="navbar__link" to="/entries">all entries</Link>
                </li>
               </div>
            <div className="navbar__right">
               <div className="nav_baby"><NavBabyChoice userBabies={userBabies} setUserBabies={setUserBabies} selectedUserBaby={selectedUserBaby} setSelectedUserBaby={setSelectedUserBaby}/></div>
                <div className="nav_div_right"><li className="navbar__item active navbar__item__right">
                    <Link className="navbar__link" to="/profile">profile</Link>
                </li>
                {
                    <li className="navbar__item active">
                        <Link className="navbar__link navbar__item__right" to="" onClick={() => {
                            setSelectedUserBaby(undefined);
                            localStorage.removeItem("app_user");
                            navigate("/", { replace: true })
                        }}>logout</Link>
                    </li>
                }</div></div>
        </ul>
    )
}