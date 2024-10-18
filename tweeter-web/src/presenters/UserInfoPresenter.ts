import { AuthToken, User } from "tweeter-shared";
import { AuthPresenter, MessageView } from "./AuthPresenter";

export interface UserInfoView extends MessageView {
    setIsFollower(isFollower: boolean): void;
    setFolloweeCount(count: number): void;
    setFollowerCount(count: number): void;
}

export class UserInfoPresenter extends AuthPresenter<UserInfoView> {

    public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ) {
        this.doFailureReportingOperation(async () => {if (currentUser === displayedUser) {
          this.view.setIsFollower(false);
        } else {
          this.view.setIsFollower(
            await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
          );
        } }, "determine follower status");
      };

    public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        this.doFailureReportingOperation(async () => {
          this.view.setFolloweeCount(await this.service.getFolloweeCount(authToken, displayedUser));
        }, "get followees count");
      };
    
    public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User
    ) {
      this.doFailureReportingOperation(async () => {
        this.view.setFollowerCount(await this.service.getFollowerCount(authToken, displayedUser));
      }, "get followers count");
    };

    public async followDisplayedUser (
        displayedUser: User, authToken: AuthToken
      ): Promise<void> {
        this.doFailureReportingOperation(async () => {
          this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.service.follow(
            authToken!,
            displayedUser!
          );
    
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

      const [followerCount, followeeCount] = await this.service.unfollow(
        authToken!,
        displayedUser!
      );

      this.view.setIsFollower(false);
      this.view.setFollowerCount(followerCount);
      this.view.setFolloweeCount(followeeCount);
    }, "unfollow user");
  };
}