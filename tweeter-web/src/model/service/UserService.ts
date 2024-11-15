import { Buffer } from "buffer";
import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { serverFacade } from "./networkLayer/serverFacade";

export class UserService {

    private facade: serverFacade;

    constructor() {
      this.facade = new serverFacade(); // Initialize serverFacade instance
    }

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status
      ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };

    public async getIsFollowerStatus (
    authToken: AuthToken,
    user: User,
    selectedUser: User
    ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
    };    

    public async getFolloweeCount (
    authToken: AuthToken,
    user: User
    ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
    };

    public async getFollowerCount (
    authToken: AuthToken,
    user: User
    ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
    };

    public async follow (
    authToken: AuthToken,
    userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
    };
    
    public async unfollow (
    authToken: AuthToken,
    userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToUnfollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToUnfollow);

    return [followerCount, followeeCount];
    };

    public async getUser (authToken: AuthToken, alias: string): Promise<User | null> {
    // TODO: Replace with the result of calling server
    return this.facade.getUser({token: authToken.token, alias: alias});
    };

    public async login (
    alias: string,
    password: string
    ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const [user, token] = await this.facade.login({alias, password});

    if (user === null) {
        throw new Error("Invalid alias or password");
    }

    const newAuthToken = new AuthToken(token, Date.now());

    return [user, newAuthToken];
    };

    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
      ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
          Buffer.from(userImageBytes).toString("base64");

          //change registerRequest to take a string for UserImageBytes.
    
        // TODO: Replace with the result of calling the server
        const [user, token] = await this.facade.register({
          firstName,
          lastName,
          alias,
          password,
          imageStringBase64,
          imageFileExtension
        });

        if (user === null) {
            throw new Error("Invalid alias or password");
        }
    
        const newAuthToken = new AuthToken(token, Date.now());

        return [user, newAuthToken];
      };

      public async logout (authToken: AuthToken): Promise<void> {
        this.facade.logout({token: authToken.token})
      };
    
    }