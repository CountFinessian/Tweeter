import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE, PagedItemView } from "./PagedItemPresenter";
import { serverFacade } from "./../model/service/networkLayer/serverFacade";

export class FollowerPresenter extends UserItemPresenter{

    private facade: serverFacade;
    
    constructor(view: PagedItemView<User>) {
      super(view);
      this.facade = new serverFacade(); // Initialize serverFacade instance
    }
    
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {

      return this.facade.getMoreFollowers({
        token: authToken.token,
        userAlias,
        pageSize: PAGE_SIZE,
        lastItem: this.lastItem?.dto || null,
      });
    }
    protected getItemDescription(): string {
      return "load followers";
    }
} 