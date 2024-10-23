import { AuthToken, Status, User } from "tweeter-shared";
import { AuthPresenter, MessageView } from "./AuthPresenter";
import Post from "../components/statusItem/Post";

export interface PostView extends MessageView {
    setPost(value: string): void;
}

export class PostPresenter extends AuthPresenter<PostView> {


    public async submitPost (currentUser: User | null, post: string, authToken: AuthToken | null){
        this.doFailureReportingOperation(async () => {
            
            this.view.displayInfoMessage("Posting status...", 0);
    
            const status = new Status(post, currentUser!, Date.now());
      
            await this.service.postStatus(authToken!, status);
      
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);}, 
            "post the status");
            this.view.clearLastInfoMessage();
        }
    };   