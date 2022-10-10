import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="Header">

            {user?.roleID === 1 &&
                <div className="MenuHeader">
                    <NavLink to="/home">Vacations</NavLink>
                    <span> | </span>
                    <NavLink to="/chart">Statistics</NavLink>
                </div>
            }
            <AuthMenu />
        </div>
    );
}

export default Header;
