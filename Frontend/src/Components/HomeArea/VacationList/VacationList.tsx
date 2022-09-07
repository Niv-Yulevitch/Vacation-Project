import { useState, useEffect } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

interface VacationListProps {
    user: UserModel;
}

function VacationList(props: VacationListProps): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationsService
            .getAllVacations(props.user.userID)
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));

    }, [vacations]);

    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}

            {vacations.map((v) => (
                <VacationCard key={v.id} vacation={v} user={props.user} />
            ))}
        </div>
    );
}

export default VacationList;
