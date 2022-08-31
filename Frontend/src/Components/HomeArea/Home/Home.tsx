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
import AddIcon from '@mui/icons-material/Add';
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

    let userRole = user?.roleID;

    return (
        <div className="Home">

            {!user && <>
                <Login />
            </>
            }

            {userRole == 1 && <>
                <NavLink to="/vacations/new"><AddIcon color="primary" fontSize="medium"/></NavLink>

                {vacations.length === 0 && <Loading />}

                {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
            </>
            }

            {userRole == 2 && <>

                {vacations.length === 0 && <Loading />}

                {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
            </>
            }

        </div>
    );
}

export default Home;