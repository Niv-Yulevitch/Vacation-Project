import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <h2>Login</h2>
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
            <Button type="submit">Login</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default Login;
