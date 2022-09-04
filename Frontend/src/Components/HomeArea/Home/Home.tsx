import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Login from "../../AuthArea/Login/Login";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./Home.css";
import AddVacation from "../AddVacation/AddVacation";
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

    let userRole = user?.roleID;

    return (
        <div className="Home">
            {!user && (
                <>
                    <Login />
                </>
            )}

            {userRole == 1 && (
                <>
                    <AddVacation />

                    <VacationList userID={user.userID}/>

                </>
            )}

            {userRole == 2 && (
                <>
                    <VacationList userID={user.userID}/>
                </>
            )}
        </div>
    );
}

export default Home;
