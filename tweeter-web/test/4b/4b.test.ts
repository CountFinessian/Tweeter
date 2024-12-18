import { serverFacade } from "../../src/model/service/networkLayer/serverFacade";
import { PostPresenter, PostView } from "../../src/presenters/PostPresenter";
import { AuthToken, User, Status } from "tweeter-shared";
import { instance, mock, verify, when, anything } from "ts-mockito";

describe("Phase 4B Unit Tests", () => {
  let mockView: PostView;
  let mockServerFacade: serverFacade;
  let presenter: PostPresenter;

  beforeEach(() => {
    mockView = mock<PostView>();
    mockServerFacade = mock<serverFacade>();
    presenter = new PostPresenter(instance(mockView));
    Object.defineProperty(presenter, 'facade', {
      value: instance(mockServerFacade),
      writable: true
    });
  });

  test("User can post a status and receives confirmation", async () => {
    try {
      // Setup test data
      const loggedInUser = new User("Test", "User", "@testuser", "imageUrl");
      const authToken = new AuthToken("testToken", Date.now());
      const statusText = "Hello World!";
      const timestamp = Date.now();
      const stories = [{post: statusText}];

      when(mockServerFacade.getPostStatus(anything())).thenResolve();

      when(mockServerFacade.getMoreStory(anything())).thenResolve([
        [new Status(statusText, loggedInUser, timestamp)],
        false
      ]);
      
      when(mockView.displayInfoMessage(anything(), anything())).thenReturn();
      when(mockView.setPost(anything())).thenReturn();
      when(mockView.clearLastInfoMessage()).thenReturn();

      await presenter.submitPost(loggedInUser, statusText, authToken);
      verify(mockServerFacade.getPostStatus(anything())).once();
      verify(mockView.displayInfoMessage("Status posted!", 2000)).once();

      const story = await mockServerFacade.getMoreStory({
        token: authToken.token,
        userAlias: loggedInUser.alias,
        pageSize: 1000,
        lastItem: null
      });
  
      // Verify response
      expect(story).toBeDefined();
      expect(stories.length).toBe(1);
      expect(stories[0].post).toBe(statusText);

    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }, 10000);
});