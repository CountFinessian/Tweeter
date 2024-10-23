import { AuthToken, User } from "tweeter-shared";
import { AuthPresenter, MessageView } from "./AuthPresenter";

export interface LogoutView extends MessageView {
  clearUserInfo: () => void;
}

export class LogoutPresenter extends AuthPresenter<LogoutView> {
    
    public async logOut (authToken: AuthToken | null){ {
      this.view.displayInfoMessage("Logging Out...", 0);
      this.doFailureReportingOperation(async () => {
        await this.service.logout(authToken!);

        this.view.clearLastInfoMessage();
        this.view.clearUserInfo();
      }, "log user out");
    }
  };
}