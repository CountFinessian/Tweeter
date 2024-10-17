import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LogoutView {
  clearUserInfo: () => void;
  clearLastInfoMessage: () => void;
  displayInfoMessage: (message: string, duration: number) => void;
  displayErrorMessage: (message: string) => void;
}

export class LogoutPresenter {
    private userService: UserService;
    private view: LogoutView;
    
    public constructor(view: LogoutView){
        this.userService = new UserService();
        this.view = view;
    };
    
    public async logOut (authToken: AuthToken | null){ {
      this.view.displayInfoMessage("Logging Out...", 0);

      try {
        await this.userService.logout(authToken!);

        this.view.clearLastInfoMessage();
        this.view.clearUserInfo();
      } catch (error) {
        this.view.displayErrorMessage(
          `Failed to log user out because of exception: ${error}`
        );
      }
    };
  }
}