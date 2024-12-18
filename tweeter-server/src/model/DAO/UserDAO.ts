import { userObject } from "../objects/userObject";

export interface UserDAO {

  createUser(user: userObject): Promise<void>;

  getUser(alias: string): Promise<userObject | null>;
}
