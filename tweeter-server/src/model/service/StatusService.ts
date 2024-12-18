import { AuthToken, FakeData, Status, StatusDto, UserDto } from "tweeter-shared";
import { AuthService } from "./AuthService";
import { DAOFactory } from "../DAO/DAOFactory";

export class StatusService {
  private readonly authService;

  private readonly storyDao;
  private readonly feedDao;
  private readonly userDao;

  constructor(daoFactory: DAOFactory) {
    this.authService = new AuthService(daoFactory);
    this.storyDao = daoFactory.createStoryDao();
    this.feedDao = daoFactory.createFeedDao();
    this.userDao = daoFactory.createUserDao();
  }
    
  public async loadMoreFeedItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const { feeds, hasMore } = await this.feedDao.getFeedByAliasPaginated(
      userAlias,
      pageSize,
      lastItem ? lastItem.timestamp : undefined
    );

    const status_list = [];

    for (var feed of feeds) {
      const user = await this.userDao.getUser(feed.influencerAlias);
      if (user == null) continue;

      const userDto: UserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
        imageUrl: user.imageUrl,
      };

      const statusDto: StatusDto = {
        user: userDto,
        timestamp: feed.timestamp,
        post: feed.post,
      };

      status_list.push(statusDto);
    }

    return [status_list, hasMore];
  }

  public async loadMoreStoryItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    await this.authService.MakeSureThereIsAnAuth(authToken);

    const { stories, hasMore } = await this.storyDao.getStoriesByAliasPaginated(
      userAlias,
      pageSize,
      lastItem ? lastItem.timestamp : undefined
    );

    const user = await this.userDao.getUser(userAlias);

    const status_list = [];

    for (var story of stories) {
      if (user == null) continue;

      const userDto: UserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        alias: user.alias,
        imageUrl: user.imageUrl,
      };

      const statusDto: StatusDto = {
        user: userDto,
        timestamp: story.timestamp,
        post: story.post,
      };

      status_list.push(statusDto);
    }

    return [status_list, hasMore];
  }

}