import { useState } from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    IconButtonProps,
    styled,
    Collapse,
    Fab
} from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FollowVacation from "../FollowVacation/FollowVacation";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface VacationCardProps {
    vacation: VacationModel;
}

// Expand More Props: --------------------------------------------
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
// ---------------------------------------------------------------

function VacationCard(props: VacationCardProps): JSX.Element {
    const userRoleId = authStore.getState().user.roleID

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const navigate = useNavigate();

    async function deleteVacation() {
        try {
            const iAmSure = window.confirm(`Are you sure you want to delete "${props.vacation.destination}" vacation?`);
            if (!iAmSure) return;
            await vacationsService.deleteVacation(props.vacation.vacationID);
            notifyService.success("Deleted!");
            navigate("/")
        } catch (err: any) {
            notifyService.error(err)
        }
    } 

    return (
        <div className="VacationCard">
            {props.vacation && <>
                <Card>
                <CardHeader title={props.vacation.destination} subheader={props.vacation.fromDateString + " ➡️ " + props.vacation.untilDateString} />
                <CardMedia
                    component="img"
                    height="160"
                    image={`http://localhost:3001/api/vacations/images/${props.vacation.imageName}`}
                    alt="Paella dish"
                />
                <CardActions disableSpacing>
                    {userRoleId === 2 && <FollowVacation vacation={props.vacation} />}
                    {userRoleId === 1 && (<>
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationID}>
                            <Fab color="primary" size="small" aria-label="edit" className="EditButton">
                                <EditIcon />
                            </Fab>
                        </NavLink>
                        <Fab color="error" size="small" className="DeleteButton" onClick={deleteVacation}>
                            <DeleteIcon />
                        </Fab>
                    </>)}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="text.secendery">
                            <b>Description:</b> {props.vacation.description}
                        </Typography>
                        <Typography variant="body2" color="text.secendery">
                            <b>Price:</b> {props.vacation.price}$
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            </>}
        </div>
    );
}

export default VacationCard;
