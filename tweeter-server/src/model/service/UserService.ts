import { StatusDto, UserDto } from "tweeter-shared";
import { AuthService } from "./AuthService";
import { DAOFactory } from "../DAO/DAOFactory";
import { storyObject } from "../objects/storyObject";
import { feedObject } from "../objects/feedObject";
import { config } from "../../config";
import { userObject } from "../objects/userObject";
import { QueueService } from "./QueueService";

export class UserService {

  private readonly authService;

  private readonly storyDao;
  private readonly feedDao;
  private readonly userDao;
  private readonly followDao;
  private readonly photoDao;
  private readonly queueService;

  constructor(daoFactory: DAOFactory) {
    this.authService = new AuthService(daoFactory);
    this.storyDao = daoFactory.createStoryDao();
    this.feedDao = daoFactory.createFeedDao();
    this.userDao = daoFactory.createUserDao();
    this.followDao = daoFactory.createFollowDao();
    this.photoDao = daoFactory.createPhotoDao();
    this.queueService = new QueueService();
  }


  public async postStatus(authToken: string, newStatus: StatusDto): Promise<void> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const storyEntity = new storyObject(newStatus.user.alias, newStatus.timestamp, newStatus.post);
    await this.storyDao.createStory(storyEntity);

    await this.queueService.sendMessage(newStatus);

    return;
  }
  public async getFolloweeCount(authToken: string, user: UserDto): Promise<number> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const items = await this.followDao.getAllFolloweesForFollower(user.alias);
    return items ? items.length : 0;
  }

  public async getFollowerCount(authToken: string, user: UserDto): Promise<number> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const items = await this.followDao.getAllFollowersForFollowee(user.alias);
    return items ? items.length : 0;
  }
 
    public async follow(
      authToken: string,
      userToFollow: UserDto
    ): Promise<[followerCount: number, followeeCount: number]> {
      const currentUserAlias = await this.authService.MakeSureThereIsAnAuth(authToken);
  
      await this.followDao.createFollow(currentUserAlias, userToFollow.alias);
  
      const followerCount = await this.getFollowerCount(authToken, userToFollow);
      const followeeCount = await this.getFolloweeCount(authToken, userToFollow);
  
      return [followerCount, followeeCount];
    }
    public async unfollow(
      authToken: string,
      userToUnfollow: UserDto
    ): Promise<[followerCount: number, followeeCount: number]> {
      const currentUserAlias = await this.authService.MakeSureThereIsAnAuth(authToken);
  
      await this.followDao.deleteFollow(currentUserAlias, userToUnfollow.alias);
  
      const followerCount = await this.getFollowerCount(authToken, userToUnfollow);
      const followeeCount = await this.getFolloweeCount(authToken, userToUnfollow);
  
      return [followerCount, followeeCount];
    }

    public async getUser(authToken: string, alias: string): Promise<UserDto | null> {
      await this.authService.MakeSureThereIsAnAuth(authToken);
  
      const user = await this.userDao.getUser(alias);
      if (user == null) return null;
  
      const userDto: UserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
        imageUrl: user.imageUrl,
      };
  
      return userDto;
    }

    public async login(alias: string, password: string): Promise<[UserDto, string]> {
      const modifiedAlias = `@${alias}`.toLowerCase();
      console.log(modifiedAlias);
      
      const user = await this.userDao.getUser(modifiedAlias);
      if (user === null) {
        throw new Error(`${config.CLIENT_ERROR}: Invalid alias`);
      }
  
      const validPassword = await this.authService.doPassWordsMatch(password, user.passwordHash);
      if (!validPassword) {
        throw new Error(`${config.CLIENT_ERROR}: Invalid Password`);
      }
  
      const authToken = await this.authService.createAuth(modifiedAlias);
  
      const createdUserDto: UserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
        imageUrl: user.imageUrl,
      };
  
      return [createdUserDto, authToken];
    }
    
  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
    imageFileExtension: string
  ): Promise<[UserDto, string]> {
    const modifiedAlias = `@${alias}`.toLowerCase();
    const userThatAlreadyExists = await this.userDao.getUser(modifiedAlias);
    if (userThatAlreadyExists != null) {
      throw new Error(`${config.CLIENT_ERROR}: This user has already registered. Please login instead`);
    }

    const fileName = `${modifiedAlias}.${imageFileExtension}`;
    const imageUrl = await this.photoDao.uploadImage(fileName, userImageBytes);

    const hashedPassword = await this.authService.hashPassword(password);

    const newUserEntity = new userObject(modifiedAlias, hashedPassword, firstName, lastName, imageUrl);
    await this.userDao.createUser(newUserEntity);

    const authToken = await this.authService.createAuth(modifiedAlias);

    const createdUserDto: UserDto = {
      firstName: firstName,
      lastName: lastName,
      alias: modifiedAlias,
      imageUrl: imageUrl,
    };

    return [createdUserDto, authToken];
  }
  public async logout(authToken: string): Promise<void> {
    await this.authService.deleteAuth(authToken);
  }

  public async getIsFollowerStatus(
    authToken: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const followRow = await this.followDao.getFollow(user.alias, selectedUser.alias);
    if (followRow == null) {
      return false;
    }
    return true;
  }
    }