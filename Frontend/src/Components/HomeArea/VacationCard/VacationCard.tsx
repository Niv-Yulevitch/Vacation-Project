import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard" style={{ backgroundImage: `url(http://localhost:3001/api/vacations/images/${props.vacation.imageName})`, backgroundSize: "cover" }}>
            <div>
                <h2>{props.vacation.destination}</h2><br />
                <div>
                    <b><u>Description:</u></b> {props.vacation.description} <br />
                    <b><u>Price:</u></b> {props.vacation.price}$<br />
                </div>
            </div>
            <div>
                <NavLink to={"/vacations/details/" + props.vacation.id}>
                </NavLink>
            </div>
        </div>
    );
}

export default VacationCard;