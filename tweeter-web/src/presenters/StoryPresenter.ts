import { AuthToken, Status, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE, PagedItemView } from "./PagedItemPresenter";
import { serverFacade } from "./../model/service/networkLayer/serverFacade";
import { StatusItemPresenter } from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter{

    private facade: serverFacade;
    
    constructor(view: PagedItemView<Status>) {
      super(view);
      this.facade = new serverFacade(); // Initialize serverFacade instance
    }
    
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {

      return this.facade.getMoreStory({
        token: authToken.token,
        userAlias,
        pageSize: PAGE_SIZE,
        lastItem: this.lastItem?.dto || null,
      });
    }
    protected getItemDescription(): string {
      return "load story";
    }
} 