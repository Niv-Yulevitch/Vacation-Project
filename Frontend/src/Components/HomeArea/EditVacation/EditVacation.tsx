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
import { useEffect, useState } from "react";
import "./EditVacation.css";
import EditIcon from "@mui/icons-material/Edit";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

function EditVacation(): JSX.Element {
  // Use Params = for ID:
  const params = useParams();

  // Use Form = for handle the form:
  const { control, register, handleSubmit, formState, setValue } =
    useForm<VacationModel>();

  // State for Dates:
  const [fromDatevalue, setFromDateValue] = useState<Dayjs | null>(null);
  const [untilDatevalue, setUntilDateValue] = useState<Dayjs | null>(null);

  // The current Date for Dates:
  const today = new Date().toISOString().split("T")[0].toString();
  const todayDayjs = dayjs(today);

  // State for collapse:
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle for collapse:
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Use Navigate = for navigation between pages.
  const navigate = useNavigate();

  // Functions send for form handle.
  async function send(vacation: VacationModel) {
    try {
      await vacationsService.addVacation(vacation);
      notifyService.success("Added!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  useEffect(() => {
    const id = +params.id;

    vacationsService
      .getOneVacation(id)
      .then((vacation) => {
        setValue("id", vacation.id);
        setValue("destination", vacation.destination);
        setValue("description", vacation.description);
        setValue("fromDate", vacation.fromDate);
        setValue("untilDate", vacation.untilDate);
        setValue("price", vacation.price);
      })
      .catch((err) => notifyService.error(err));
  }, [setValue, anchorEl]);

  return (
    <div className="EditVacation">
      <Fab size="small" aria-label="add" onClick={handleMenu}>
        <EditIcon />
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
        <form onSubmit={handleSubmit(send)} className="EditVacationForm">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <input type="hidden" {...register("id")} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Edit Vacation
              </Typography>
              <Controller
                name="destination"
                render={() => 
                  <TextField
                    required
                    sx={{ width: 250, margin: 0.5 }}
                    label="Destination"
                    name="destination"
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
                }
                control={control}
              />

              <TextField
                required
                sx={{ width: 250, margin: 0.5 }}
                label="Description"
                name="description"
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
                      name="fromDate"
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
                      name="untilDate"
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
                name="price"
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
              <TextField
                required
                sx={{ width: 250, margin: 0.5 }}
                variant="outlined"
                size="small"
                type="file"
                {...register("image", {
                  required: { value: true, message: "Missing image" },
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

export default EditVacation;
