import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();

  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(send)}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <h2>Register</h2>
            </Typography>
            <Typography variant="body2">
              <label>First Name:</label>
              <input
                type="text"
                {...register("firstName", {
                  required: { value: true, message: "Missing first name" },
                  minLength: {
                    value: 2,
                    message: "First name must be inclode at least 2 chars",
                  },
                  maxLength: {
                    value: 100,
                    message: "First name can't be over 100 chars",
                  },
                })}
              />
              <span>{formState.errors.firstName?.message}</span>
            </Typography>
            <Typography variant="body2">
              <label>Last Name:</label>
              <input
                type="text"
                {...register("lastName", {
                  required: { value: true, message: "Missing last name" },
                  minLength: {
                    value: 2,
                    message: "Last name must be inclode at least 2 chars",
                  },
                  maxLength: {
                    value: 100,
                    message: "Last name can't be over 100 chars",
                  },
                })}
              />
              <span>{formState.errors.lastName?.message}</span>
            </Typography>
            <Typography variant="body2">
              <label>Username:</label>
              <input
                type="text"
                {...register("username", {
                  required: { value: true, message: "Missing username" },
                  minLength: {
                    value: 4,
                    message: "Username must be inclode at least 4 chars",
                  },
                  maxLength: {
                    value: 100,
                    message: "Username can't be over 100 chars",
                  },
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
    </div>
  );
}

export default Register;
