import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";
import { DAOFactory } from "../DAO/DAOFactory";
import { AuthService } from "./AuthService";

export class FollowService {


  private readonly authService;

  private readonly followDao;
  private readonly userDAO;

  constructor(daoFactory: DAOFactory) {
    this.authService = new AuthService(daoFactory);
    this.followDao = daoFactory.createFollowDao();
    this.userDAO = daoFactory.createUserDao();
  }

    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
      ): Promise<[UserDto[], boolean]> {

        await this.authService.MakeSureThereIsAnAuth(token);

        const { followers, hasMore } = await this.followDao.getAllFollowersForFolloweePaginated(
          userAlias,
          pageSize,
          lastItem ? lastItem.alias : undefined
        );
    
        const followee_list = [];
    
        for (var follower of followers) {
          const user = await this.userDAO.getUser(follower.followerHandle);
          if (user == null) continue;
    
          const userDto = {
            firstName: user.firstName,
            lastName: user.lastName,
            alias: user.alias,
            imageUrl: user.imageUrl,
          };
    
          followee_list.push(userDto);
        }
    
        return [followee_list, hasMore];
      } 
  

      public async loadMoreFollowees(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
      ): Promise<[UserDto[], boolean]> {
    
        await this.authService.MakeSureThereIsAnAuth(authToken);

        const { followees, hasMore } = await this.followDao.getAllFolloweesForFollowerPaginated(
          userAlias,
          pageSize,
          lastItem ? lastItem.alias : undefined
        );
    
        const followee_list = [];
    
        for (var followee of followees) {
          const user = await this.userDAO.getUser(followee.followeeHandle);
          if (user == null) continue;
    
          const userDto = {
            firstName: user.firstName,
            lastName: user.lastName,
            alias: user.alias,
            imageUrl: user.imageUrl,
          };
    
          followee_list.push(userDto);
        }
    
        return [followee_list, hasMore];
      }
}