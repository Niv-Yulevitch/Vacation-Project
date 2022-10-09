import { Card, CardActions, CardContent, Container, Fab, Menu, Typography } from "@mui/material";
import { useState } from "react";
import "./AddVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";

function AddVacation(): JSX.Element {
    const [fromDateValue, setFromDateValue] = useState<any>();
    const [untilDateValue, setUntilDateValue] = useState<any>();

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Added!");
            navigate("/");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    const today = new Date().toISOString().split("T")[0].toString();

    return (
        <Container className="AddVacation" maxWidth="sm">
                <form onSubmit={handleSubmit(send)} className="AddVacationForm">
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Add Vacation
                            </Typography>

                            <label>Destination:</label>
                            <input type="text" required {...register("destination", {
                                required: { value: true, message: "Missing last destination" },
                                minLength: { value: 2, message: "Destination must be include at least 2 chars" },
                                maxLength: { value: 50, message: "Destination can't be over 50 chars" },
                            })} />
                            <span>{formState.errors.destination?.message}</span>

                            <label>Description:</label>
                            <textarea maxLength={550} required {...register("description", {
                                required: { value: true, message: "Missing description" },
                                minLength: { value: 2, message: "Description must be include at least 2 chars" },
                                maxLength: { value: 550, message: "Description can't be over 550 chars" },
                            })} />
                            <span>{formState.errors.description?.message}</span>

                            <label>From:</label>
                            <input type="date" required min={today} value={fromDateValue} onChange={(newValue) => { setFromDateValue(newValue); }} {...register("fromDate", {
                                required: { value: true, message: "Missing from date" },
                                valueAsDate: true,
                            })} />
                            <span>{formState.errors.fromDate?.message}</span>

                            <label>Until:</label>
                            <input type="date" required min={today} onChange={(newValue) => setUntilDateValue(newValue)} {...register("untilDate", {
                                required: { value: true, message: "Missing until date" },
                                valueAsDate: true,
                            })} />
                            <span>{formState.errors.untilDate?.message}</span>

                            <label>Price:</label>
                            <input type="number" required {...register("price", {
                                required: { value: true, message: "Missing price" },
                                min: 0,
                                max: 999999.99,
                            })} />
                            <span>{formState.errors.price?.message}</span>

                            <label>Image:</label>
                            <input type="file" required {...register("image", {
                                required: { value: true, message: "Missing image" },
                            })} />
                            <span>{formState.errors.image?.message}</span>
                        </CardContent>
                        <CardActions>
                            <button type="submit">Add</button>
                        </CardActions>
                    </Card>
                </form>
        </Container>
    );
}

export default AddVacation;
