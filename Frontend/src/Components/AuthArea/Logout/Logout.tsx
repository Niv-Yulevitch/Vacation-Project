import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(()=>{
        try {
            authService.logout();
            notifyService.success("Bye bye...");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);            
        }
    }, [])

    return null;
}

export default Logout;
