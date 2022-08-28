import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();

    const navigate = useNavigate();

    async function send ( user: UserModel ) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">
			<form onSubmit={handleSubmit(send)}>

                <h2>הרשמה</h2>

                <label>שם פרטי:</label>
                <input type="text" {...register("firstName", {
                    required: { value: true, message: "חסר שם פרטי"}, 
                    minLength: { value: 2, message: "שם פרטי חייב להכיל לפחות 2 תווים"}, 
                    maxLength: {value: 100, message: "שם פרטי יכול להיות מקסימום 100 תווים"}
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>שם משפחה:</label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "חסר שם משפחה"}, 
                    minLength: { value: 2, message: "שם משפחה חייב להכיל לפחות 2 תווים"}, 
                    maxLength: {value: 100, message: "שם משפחה יכול להיות מקסימום 100 תווים"}
                })} />
                <span>{formState.errors.lastName?.message}</span>

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

                <button>הירשם</button>
            </form>
        </div>
    );
}

export default Register;
