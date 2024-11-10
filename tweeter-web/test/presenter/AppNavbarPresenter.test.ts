import { LogoutPresenter, LogoutView } from "../../src/presenters/logoutPresenter";
import { instance, mock, spy, verify, when } from "ts-mockito";
import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";

describe("LogoutPresenter", () => {
    let mockLogoutView: LogoutView;
    let logoutPresenter: LogoutPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockLogoutView = mock<LogoutView>();
        const mockLogoutViewInstance = instance(mockLogoutView);

        const logoutPresenterSpy = spy(new LogoutPresenter(mockLogoutViewInstance));
        logoutPresenter = instance(logoutPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(logoutPresenterSpy.service).thenReturn(mockUserServiceInstance);
    }); 

    it("tells the view to display a logging out message", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockLogoutView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the user service with the correct auth token", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    });

    it("tells the view to clear the last info message, clear the user info, and navigate to the login page", async () => {
        await logoutPresenter.logOut(authToken);
        verify(mockLogoutView.clearLastInfoMessage()).once();
        verify(mockLogoutView.clearUserInfo()).once();
    });

    it("when the logout is not successful, display an error message", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await logoutPresenter.logOut(authToken);
        verify(mockLogoutView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();
        verify(mockLogoutView.clearLastInfoMessage()).never();
        verify(mockLogoutView.clearUserInfo()).never();
    });

});