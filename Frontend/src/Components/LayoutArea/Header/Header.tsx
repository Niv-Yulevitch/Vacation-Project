import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="MenuHeader">
                <NavLink to="/home">Vacations</NavLink>
                <span> | </span>
                <NavLink to="/chart">Statistics</NavLink>
            </div>
            <AuthMenu />
        </div>
    );
}

export default Header;
