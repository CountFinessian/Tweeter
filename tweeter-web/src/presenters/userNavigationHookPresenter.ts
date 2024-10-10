import { AuthToken, Status, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface UserNavigationHookView {
    setDisplayedUser: (user: User) => void;
    displayErrorMessage(message: string): void;
}

export class UserNavigationHookPresenter {
    private userService: UserService;
    private view: UserNavigationHookView;
    
    public constructor(view: UserNavigationHookView){
        this.userService = new UserService();
        this.view = view;
    };

    public async navigateToUser (
        authToken: AuthToken,
        currentUser: User,
        event: React.MouseEvent<HTMLElement>
      ) {
        try {
            const target = event.target as HTMLElement;
            const alias = this.extractAlias(target.textContent || '');
            const user = await this.userService.getUser(authToken!, alias);
      
            if (user) {
              if (currentUser!.equals(user)) {
                this.view.setDisplayedUser(currentUser!);
              } else {
                this.view.setDisplayedUser(user);
              }
            }
          } catch (error) {
            this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
          }
      }
    public extractAlias (value: string): string {
        const index = value.indexOf("@");
        return index !== -1 ? value.substring(index) : value;
      };
    
    
}