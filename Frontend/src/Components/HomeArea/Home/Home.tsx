import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Login from "../../AuthArea/Login/Login";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./Home.css";

function Home(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    // Vacation State: 
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // AJAX Side Effect: 
    useEffect(() => {

        // Get vacations from server: 
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));


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

            {!user && <>
                <Login />
            </>
            }

            {user && <>
                <NavLink to="/vacations/new">✚</NavLink>

                {vacations.length === 0 && <Loading />}

                {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
            </>
            }

        </div>
    );
}

export default Home;