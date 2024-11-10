import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/service/UserService";

export interface AuthView extends View {
    navigate: (url: string) => void;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
}

export interface MessageView extends View {
    clearLastInfoMessage: () => void;
    displayInfoMessage: (message: string, duration: number) => void;
}

export abstract class AuthPresenter<V extends AuthView | MessageView> extends Presenter<V> {
    private userService: UserService;

    public constructor(view: V) {
        super(view);
        this.userService = new UserService();
    }

    public get service(){
        return this.userService;
    };

}