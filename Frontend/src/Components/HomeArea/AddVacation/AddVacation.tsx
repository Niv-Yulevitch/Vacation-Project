import { Button, Card, CardActions, CardContent, IconButton, Menu, Typography } from "@mui/material";
import { useState } from "react";
import "./AddVacation.css";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
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
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AddIcon color="primary" fontSize="large" />
      </IconButton>
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
          <Card sx={{ minWidth: 275, }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <h2>Add Vacation</h2>
              </Typography>
              <Typography variant="body2">
                <label>Destination:</label>
                <input
                  type="text"
                  {...register("destination", {
                    required: { value: true, message: "Missing last destination" },
                    minLength: {
                      value: 2,
                      message: "Destination must be inclode at least 2 chars",
                    },
                    maxLength: {
                      value: 50,
                      message: "Destination can't be over 50 chars",
                    },
                  })}
                />
                <span>{formState.errors.description?.message}</span>
              </Typography>
              <Typography variant="body2">
                <label>Description:</label>
                <input
                  type="text"
                  {...register("description", {
                    required: { value: true, message: "Missing description" },
                    minLength: {
                      value: 2,
                      message: "Description must be inclode at least 2 chars",
                    },
                    maxLength: {
                      value: 550,
                      message: "Description can't be over 550 chars",
                    },
                  })}
                />
                <span>{formState.errors.description?.message}</span>
              </Typography>
              <Typography variant="body2">
                <label>From:</label>
                <input
                  type="date"
                  {...register("fromDate", {
                    required: { value: true, message: "Missing from date" },
                    a
                  })}
                />
                <span>{formState.errors.username?.message}</span>
              </Typography>
              <Typography variant="body2">
                <label>Password:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: {
                      value: 4,
                      message: "Password must be inclode at least 4 chars",
                    },
                    maxLength: {
                      value: 100,
                      message: "Password can't be over 100 chars",
                    },
                  })}
                />
                <span>{formState.errors.password?.message}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button type="submit">Register</Button>
            </CardActions>
          </Card>
        </form>
      </Menu>
    </div>
  );
}

export default AddVacation;
