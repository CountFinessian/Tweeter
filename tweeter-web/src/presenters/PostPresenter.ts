import { AuthToken, Status, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface PostView {
    displayInfoMessage(message: string, duration: number): void;
    displayErrorMessage(message: string): void;
    clearLastInfoMessage(): void;
    setPost(value: string): void;
}

export class PostPresenter {
    private userService: UserService;
    private view: PostView;
    
    public constructor(view: PostView){
        this.userService = new UserService();
        this.view = view;
    };

    public async submitPost (currentUser: User | null, post: string, authToken: AuthToken | null){
    
        try {
            this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.userService.postStatus(authToken!, status);
    
          this.view.setPost("");
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
            this.view.clearLastInfoMessage();
        }
    };   
}