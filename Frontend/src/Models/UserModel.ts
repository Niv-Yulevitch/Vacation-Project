import RoleModel from "./RoleModel";

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleID: RoleModel;
}

export default UserModel;
