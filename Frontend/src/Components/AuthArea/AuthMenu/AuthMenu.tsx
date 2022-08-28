import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(()=>{
        setUser(authStore.getState().user);
        
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <div className="AuthMenu">
			{!user && <>
                <span>שלום אורח | </span>
                <NavLink to="/register">הירשם</NavLink>
                <span> | </span>
                <NavLink to="/login">היכנס</NavLink>
            </>}

            {user && <>
                <span>שלום {user.firstName} {user.lastName} | </span>
                <NavLink to="/logout">התנתק</NavLink>
            </>}
        </div>
    );
}

export default AuthMenu;
