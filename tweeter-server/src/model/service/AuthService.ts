import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { DAOFactory } from "../DAO/DAOFactory";
import { config } from "../../config";
import { authObject } from "../objects/authObject";

export class AuthService {
  // To make it faster, use lower salt round count (default is 10)
  private readonly SALT_ROUNDS = 3;

  // 10000 Minutes
  private readonly EXPIRATION_TIME_SECONDS = 10000 * 60;

  private readonly authDao;

  constructor(DAOFactory: DAOFactory) {
    this.authDao = DAOFactory.createAuthDao();
  }

  public async createAuth(alias: string): Promise<string> {
    const token = this.makeToken();

    const newAuth = new authObject(token, alias);
    await this.authDao.createAuth(newAuth);
    return token;
  }

  public makeToken(): string {
    const random = randomBytes(12);
    return random.toString("base64").substring(0, 16).toLowerCase();
  }

  public async deleteAuth(token: string) {
    await this.authDao.deleteAuth(token);
  }

  public async hashPassword(password: string) {
    const hashed = await bcrypt.hash(password, this.SALT_ROUNDS);
    return hashed;
  }

  public async doPassWordsMatch(enteredPassword: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
  }

  public async MakeSureThereIsAnAuth(token: string): Promise<string> {
    const authEntity = await this.authDao.getAuth(token);

    if (!authEntity) {
      throw new Error(`${config.AUTH_ERROR}: No such token found. Please log in.`);
    }

    return authEntity.alias;
  }
}
