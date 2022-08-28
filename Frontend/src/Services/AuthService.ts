import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";

class AuthService {
    public async register ( user: UserModel ): Promise<void> {

        const response = await axios.post<string>(`http://localhost:3001/api/auth/register`, user);

        const token = response.data;

        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    public async login ( credentials: CredentialsModel ): Promise<void> {
        
        const response = await axios.post<string>(`http://localhost:3001/api/auth/login`, credentials);
        
        const token = response.data;

        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    public logout(): void {

        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;