import Joi from "joi";

interface ICredentials {
    username: string;
    password: string;
}

class CredentialsModel {
    public username: string;
    public password: string;

    constructor(credentials: ICredentials) {
        // Ensure that username and password are not undefined
        this.username = credentials.username ?? '';  // Default to empty string if undefined
        this.password = credentials.password ?? '';  // Default to empty string if undefined
    }

    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(4).max(256)
    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message || ''; // Return an empty string if no error
    }
}

export default CredentialsModel;