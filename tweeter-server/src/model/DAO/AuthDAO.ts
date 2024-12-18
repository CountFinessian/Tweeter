import { authObject } from "../objects/authObject";

export interface AuthDAO {

  createAuth(auth: authObject): Promise<void>;

  getAuth(token: string): Promise<authObject | null>;

  deleteAuth(token: string): Promise<void>;
}
