import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import "./Home.css";
import VacationList from "../VacationList/VacationList";

function Home(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    // AJAX Side Effect:
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
        <div className="Home">
            {!user && (
                <>
                    <Login />
                </>
            )}

            {user && <>
                <VacationList />
            </>}


        </div>
    );
}

export default Home;
