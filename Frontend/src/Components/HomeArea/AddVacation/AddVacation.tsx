import { Button, Card, CardActions, CardContent, Fab, IconButton, Menu, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./AddVacation.css";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";

function AddVacation(): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Added!");
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <Fab color="primary" aria-label="add" onClick={handleMenu}>
                <AddIcon />
            </Fab>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit(send)}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                gutterBottom
                            >
                                Add Vacation
                            </Typography>
                            <TextField
                                required
                                label="Destination"
                                variant="outlined"
                                size="small"
                                {...register("destination", {
                                    required: { value: true, message: "Missing last destination" },
                                    minLength: {
                                        value: 2,
                                        message: "Destination must be include at least 2 chars",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Destination can't be over 50 chars",
                                    },
                                })}
                            />
                            <br /><span>{formState.errors.description?.message}</span>
                            <TextField
                                required
                                label="Description"
                                variant="outlined"
                                size="small"
                                {...register("description", {
                                    required: { value: true, message: "Missing description" },
                                    minLength: {
                                        value: 2,
                                        message: "Description must be include at least 2 chars",
                                    },
                                    maxLength: {
                                        value: 550,
                                        message: "Description can't be over 550 chars",
                                    },
                                })} />
                            <span>{formState.errors.description?.message}</span>
                            <TextField
                                id="date"
                                label="From"
                                type="date"
                                defaultValue={new Date().getDate}
                                size="small"
                                {...register("fromDate", {
                                    required: { value: true, message: "Missing from date" },
                                    valueAsDate: true
                                })}
                            />
                            <span>{formState.errors.fromDate?.message}</span>
                            <Typography variant="body2">
                                <label>Until: </label>
                                <input
                                    type="date"
                                    {...register("untilDate", {
                                        required: { value: true, message: "Missing until date" },
                                        valueAsDate: true
                                    })}
                                />
                                <span>{formState.errors.untilDate?.message}</span>
                            </Typography>
                            <Typography variant="body2">
                                <label>Price: </label>
                                <input
                                    type="price"
                                    {...register("price", {
                                        required: { value: true, message: "Missing price" },
                                        min: 0,
                                        max: 999999.99
                                    })}
                                />
                                <span>{formState.errors.price?.message}</span>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button type="submit">Add</Button>
                        </CardActions>
                    </Card>
                </form>
            </Menu>
        </div>
    );
}

export default AddVacation;
