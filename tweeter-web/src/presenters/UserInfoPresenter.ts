import { AuthToken, User } from "tweeter-shared";
import { AuthPresenter, MessageView } from "./AuthPresenter";
import { serverFacade } from "../model/service/networkLayer/serverFacade";
import { PagedItemView } from "./PagedItemPresenter";

export interface UserInfoView extends MessageView {
    setIsFollower(isFollower: boolean): void;
    setFolloweeCount(count: number): void;
    setFollowerCount(count: number): void;
}

export class UserInfoPresenter extends AuthPresenter<UserInfoView> {

    private facade: serverFacade;

    constructor(view: UserInfoView) {
      super(view);
      this.facade = new serverFacade(); // Initialize serverFacade instance
    }
    
    public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ) {
        this.doFailureReportingOperation(async () => {if (currentUser === displayedUser) {
          this.view.setIsFollower(false);
        } else {
          this.view.setIsFollower(
            await this.facade.getFollowerStatus({ token: authToken.token!, user: currentUser.dto!, selectedUser : displayedUser.dto! })
          );
        } }, "determine follower status");
      };

    public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        this.doFailureReportingOperation(async () => {
          this.view.setFolloweeCount(await this.facade.getFolloweeCount( { token: authToken.token, user: displayedUser.dto }));
        }, "get followees count");
      };
    
    public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User
    ) {
      this.doFailureReportingOperation(async () => {
        this.view.setFollowerCount(await this.facade.getFollowerCount( { token: authToken.token, user: displayedUser.dto }));
      }, "get followers count");
    };

    public async followDisplayedUser (
        displayedUser: User, authToken: AuthToken
      ): Promise<void> {
        this.doFailureReportingOperation(async () => {
          this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.facade.follow({
            token: authToken.token!,
            user: displayedUser.dto!
        });
    
          this.view.setIsFollower(true);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        }, "follow user");
      };
    
    public async unfollowDisplayedUser (
    displayedUser: User, authToken: AuthToken
  ): Promise<void> {

    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage(
        `Unfollowing ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await this.facade.unfollow({
        token: authToken.token!,
        user: displayedUser!
    }
      );

      this.view.setIsFollower(false);
      this.view.setFollowerCount(followerCount);
      this.view.setFolloweeCount(followeeCount);
    }, "unfollow user");
  };
}