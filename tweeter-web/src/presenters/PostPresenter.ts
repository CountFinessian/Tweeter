import { AuthToken, Status, User } from "tweeter-shared";
import { AuthPresenter, MessageView } from "./AuthPresenter";
import Post from "../components/statusItem/Post";
import { serverFacade } from "../model/service/networkLayer/serverFacade";

export interface PostView extends MessageView {
    setPost(value: string): void;
}

export class PostPresenter extends AuthPresenter<PostView> {
    private facade: serverFacade;

    constructor(view: PostView) {
      super(view);
      this.facade = new serverFacade(); // Initialize serverFacade instance
    }

    public async submitPost (currentUser: User | null, post: string, authToken: AuthToken | null){
        this.doFailureReportingOperation(async () => {
            
            this.view.displayInfoMessage("Posting status...", 0);
    
            const status = new Status(post, currentUser!, Date.now());

            if (authToken == null){
                throw new Error("Authtoken doesn't exist")
            }
      
            await this.facade.getPostStatus({ token: authToken.token, newStatus: status.dto });
      
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);}, 
            "post the status");
            this.view.clearLastInfoMessage();
        }
    };   