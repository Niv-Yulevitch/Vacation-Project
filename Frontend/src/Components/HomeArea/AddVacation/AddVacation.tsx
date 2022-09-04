import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./AddVacation.css";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

function AddVacation(): JSX.Element {
  const [fromDatevalue, setFromDateValue] = useState<Dayjs | null>(null);
  const [untilDatevalue, setUntilDateValue] = useState<Dayjs | null>(null);
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

  const today = new Date().toISOString().split("T")[0].toString();
  const todayDayjs = dayjs(today);

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
        <form onSubmit={handleSubmit(send)} className="AddVacationForm">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Add Vacation
              </Typography>
              <TextField
                error
                required
                sx={{ width: 250, margin: 0.5 }}
                label="Destination"
                variant="outlined"
                size="small"
                {...register("destination", {
                  required: {
                    value: true,
                    message: "Missing last destination",
                  },
                  minLength: {
                    value: 2,
                    message: "Destination must be include at least 2 chars",
                  },
                  maxLength: {
                    value: 50,
                    message: "Destination can't be over 50 chars",
                  },
                })}
                helperText={formState.errors.description?.message}
              />
              <TextField
                required
                sx={{ width: 250, margin: 0.5 }}
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
                })}
                helperText={formState.errors.description?.message}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  minDate={todayDayjs}
                  value={fromDatevalue}
                  onChange={(newValue) => {
                    setFromDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{ width: 250, margin: 0.5 }}
                      {...params}
                      {...register("fromDate", {
                        required: { value: true, message: "Missing from date" },
                        valueAsDate: true,
                      })}
                      helperText={formState.errors.fromDate?.message}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Until"
                  minDate={fromDatevalue}
                  value={untilDatevalue}
                  onChange={(newValue) => {
                    setUntilDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{ width: 250, margin: 0.5 }}
                      {...params}
                      {...register("untilDate", {
                        required: {
                          value: true,
                          message: "Missing until date",
                        },
                        valueAsDate: true,
                      })}
                      helperText={formState.errors.untilDate?.message}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                required
                sx={{ width: 250, margin: 0.5 }}
                label="Price"
                variant="outlined"
                size="small"
                type="number"
                {...register("price", {
                  required: { value: true, message: "Missing price" },
                  min: 0,
                  max: 999999.99,
                })}
                helperText={formState.errors.price?.message}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </CardActions>
          </Card>
        </form>
      </Menu>
    </div>
  );
}

export default AddVacation;
