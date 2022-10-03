import { Card, CardActions, CardContent, Fab, Menu, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./EditVacation.css";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";

interface EditVacationProps {
    vacation: VacationModel;
}

function EditVacation(props: EditVacationProps): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const id = props.vacation.vacationID;
    
        vacationsService
          .getOneVacation(id)
          .then((v) => {
            setValue("vacationID", v.vacationID);
            setValue("destination", v.destination);
            setValue("description", v.description);
            setValue("fromDate", new Date(v.fromDate));
            setValue("untilDate", new Date(v.untilDate));
            setValue("price", v.price);
          })
          .catch((err) => notifyService.error(err));
      }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            notifyService.success("Updated!");
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation">
            <Fab size="small" aria-label="add" className="EditButton" onClick={handleMenu}>
              <EditIcon />
            </Fab>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: "top", horizontal: "left" }} keepMounted transformOrigin={{ vertical: "top", horizontal: "left", }} open={Boolean(anchorEl)} onClose={handleClose}>
                <form onSubmit={handleSubmit(send)} className="EditVacationForm">
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Edit Vacation
                            </Typography>
                            <input type="hidden" {...register("vacationID")} />

                            <label>Destination:</label>
                            <input type="text" {...register("destination", {
                                required: { value: true, message: "Missing last destination" },
                                minLength: { value: 2, message: "Destination must be include at least 2 chars" },
                                maxLength: { value: 50, message: "Destination can't be over 50 chars" },
                            })} />
                            <span>{formState.errors.destination?.message}</span>

                            <label>Description:</label>
                            <textarea maxLength={550} {...register("description", {
                                required: { value: true, message: "Missing description" },
                                minLength: { value: 2, message: "Description must be include at least 2 chars" },
                                maxLength: { value: 550, message: "Description can't be over 550 chars" },
                            })} />
                            <span>{formState.errors.description?.message}</span>

                            <label>From:</label>
                            <input type="date" {...register("fromDate", {
                                required: { value: true, message: "Missing from date" },
                                // valueAsDate: true,
                            })} />
                            <span>{formState.errors.fromDate?.message}</span>

                            <label>Until:</label>
                            <input type="date" {...register("untilDate", {
                                required: { value: true, message: "Missing until date" },
                                // valueAsDate: true,
                            })} />
                            <span>{formState.errors.untilDate?.message}</span>

                            <label>Price:</label>
                            <input type="number" {...register("price", {
                                required: { value: true, message: "Missing price" },
                                min: 0,
                                max: 999999.99,
                            })} />
                            <span>{formState.errors.price?.message}</span>

                            <label>Image:</label>
                            <input type="file" accept="image/*" {...register("image")} />
                            <span>{formState.errors.image?.message}</span>
                        </CardContent>
                        <CardActions>
                            <button type="submit">Update</button>
                        </CardActions>
                    </Card>
                </form>
            </Menu>
        </div>
    );
}

export default EditVacation;
