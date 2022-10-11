import { Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";

function EditVacation(): JSX.Element {

    useVerifyAdmin();

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const id = +params.vId;
        
        vacationsService
            .getOneVacation(id)
            .then((v) => {
                setValue("vacationID", v.vacationID);
                setValue("destination", v.destination);
                setValue("description", v.description);
                setValue("fromDateString", v.fromDateString);
                setValue("untilDateString", v.untilDateString);
                setValue("price", v.price);
                setValue("imageName", v.imageName);
            })
            .catch((err) => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            notifyService.success("Updated!");
            navigate("/");
        } catch (err: any) {
            alert(err.message)
            await notifyService.error(err);
        }
    }

    return (
        <Container className="EditVacation" maxWidth="sm">
            <form onSubmit={handleSubmit(send)} className="EditVacationForm">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Edit Vacation
                        </Typography>
                        <input type="hidden" {...register("vacationID")} />
                        <input type="hidden" {...register("imageName")} />

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
                        <input type="date" {...register("fromDateString", {
                            required: { value: true, message: "Missing from date" },
                            valueAsDate: true,
                        })} />
                        <span>{formState.errors.fromDate?.message}</span>

                        <label>Until:</label>
                        <input type="date" {...register("untilDateString", {
                            required: { value: true, message: "Missing until date" },
                            valueAsDate: true,
                        })} />
                        <span>{formState.errors.untilDate?.message}</span>

                        <label>Price:</label>
                        <input type="number" {...register("price", {
                            required: { value: true, message: "Missing price" },
                            min: {value: 0, message: "Price can't be negative!" },
                            max: {value: 9999, message: "Price can't be over 9999!"},
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
        </Container>
    );
}

export default EditVacation;
