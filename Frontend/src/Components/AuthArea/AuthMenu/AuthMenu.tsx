import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
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
    <div className="AuthMenu">      
      {!user && (
        <>
          <span>Hello Guest | </span>
          <ButtonGroup>
            <Button variant="contained">
              <NavLink to="/login">Sign in</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/register">Register</NavLink>
            </Button>
          </ButtonGroup>
        </>
      )}

      {user && (
        <>
          <span>
            {user.firstName} {user.lastName} |{" "}
          </span>
          <Button variant="contained">
            <NavLink to="/logout">Logout</NavLink>
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
