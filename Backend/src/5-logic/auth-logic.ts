import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

//* Add New User:
async function register(user: UserModel): Promise<string> {
  // <-- "string" because returning a new token

  // Validate:
  const error = user.validate();
  if (error) throw new ValidationError(error);

  // Create minimum role:
  user.roleID = RoleModel.User;

  const sql = `INSERT INTO
                users(
                    firstName,
                    lastName,
                    username,
                    password,
                    roleID)
                VALUES(
                    '${user.firstName}',
                    '${user.lastName}',
                    '${user.username}',
                    '${user.password}',
                    ${user.roleID + 1})`;

  const result: OkPacket = await dal.execute(sql);

  user.id = result.insertId;

  //Delete password:
  delete user.password;

  // Generate new token:
  const token = auth.generateNewToken(user);

  return token;
}

//* Login:
async function login(credentials: CredentialsModel): Promise<string> {
  // Validate:
  const error = credentials.validate();
  if (error) throw new ValidationError(error);

  const sql = `SELECT
                userID AS id,
                firstName,
                lastName,
                username,
                password,
                roleID
                FROM users
                WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

                // JOIN roles ON
                // users.roleID = roles.roleID

  // Get users from file:
  const users = await dal.execute(sql);

  const user = users[0];

  // If no such user exists:
  if (!user) throw new UnauthorizedError("Incorrect username or password");

  //Delete password:
  delete user.password;

  // Generate new token:
  const token = auth.generateNewToken(user);

  return token;
}

export default {
  register,
  login,
};
