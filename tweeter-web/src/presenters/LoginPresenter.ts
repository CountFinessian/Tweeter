import { AuthToken, Status, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";


export interface LoginView {
    displayErrorMessage: (message: string) => void;
    navigate: (url: string) => void;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
}

export class LoginPresenter {
    private userService: UserService;
    private view: LoginView;
    
    public constructor(view: LoginView){
        this.userService = new UserService();
        this.view = view;
    };
        
    public async doLogin (
        rememberMe: boolean,
        alias: string,
        password: string,
        originalUrl?: string
    ) {
    try {
        const [user, authToken] = await this.userService.login(alias, password);

        this.view.updateUserInfo(user, user, authToken, rememberMe);

        if (!!originalUrl) {
        this.view.navigate(originalUrl);
        } else {
        this.view.navigate("/");
        }
    } catch (error) {
        this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
        );
    }
    };
}