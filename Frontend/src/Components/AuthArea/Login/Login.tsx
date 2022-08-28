import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState} = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send ( credentials: CredentialsModel ) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">
			<form onSubmit={handleSubmit(send)}>

                <h2>התחברות</h2>

                <label>שם משתמש:</label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "חסר שם משתמש"}, 
                    minLength: { value: 4, message: "שם משתמש חייב להכיל לפחות 4 תווים"}, 
                    maxLength: {value: 100, message: "שם משתמש יכול להיות מקסימום 100 תווים"}
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>סיסמא:</label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "חסר סיסמא"}, 
                    minLength: { value: 4, message: "סיסמא חייבת להכיל לפחות 4 תווים"}, 
                    maxLength: {value: 100, message: "סיסמא יכולה להיות מקסימום 100 תווים"}
                })} />
                <span>{formState.errors.password?.message}</span>

                <button>התחבר</button>

            </form>
        </div>
    );
}

export default Login;
