import { AuthToken, Status, User } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";
import { PostView, PostPresenter } from "../../src/presenters/PostPresenter";
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito";

describe("PostPresenter", () => {
    let mockPostView: PostView;
    let postPresenter: PostPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());
    const currentUser = new User("Jacob", "Williams", "countfinessian", "www.google.com");

    beforeEach(() => {
        mockPostView = mock<PostView>();
        const mockPostViewInstance = instance(mockPostView);

        const postPresenterSpy = spy(new PostPresenter(mockPostViewInstance));
        postPresenter = instance(postPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(postPresenterSpy.service).thenReturn(mockUserServiceInstance);
    })

    it("tells the view to display a posting status message", async () => {
        await postPresenter.submitPost(currentUser, "What's up?", authToken);
        verify(mockPostView.displayInfoMessage("Posting status...", 0)).once();
    })

    it("calls postStatus on the status service with the correct status string and auth token", async () => {
        await postPresenter.submitPost(currentUser, "What's up?", authToken);
        verify(mockUserService.postStatus(authToken, anything())).once();
    })

    it("tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await postPresenter.submitPost(currentUser, "What's up?", authToken);
        verify(mockPostView.clearLastInfoMessage()).once();
        verify(mockPostView.setPost("")).once();
        verify(mockPostView.displayInfoMessage("Status posted!", 2000)).once();
    });

    it("when the post is unsuccessful, display an error message", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.postStatus(authToken, anything())).thenThrow(error);

        await postPresenter.submitPost(currentUser, "What's up?", authToken);
        verify(mockPostView.displayErrorMessage("Failed to post the status because of exception: An error occurred")).once();
        verify(mockPostView.clearLastInfoMessage()).once();
        verify(mockPostView.setPost("")).never();
        verify(mockPostView.displayInfoMessage("Status posted!", 2000)).never();
    });
});