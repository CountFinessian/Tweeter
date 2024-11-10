import { MemoryRouter } from "react-router-dom";
import { PostPresenter } from "../../../src/presenters/PostPresenter";
import { render, screen } from "@testing-library/react";
import React from "react";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { Presenter } from "../../../src/presenters/Presenter";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import useUserInfo from "../../../src/components/userInfo/userInfoHook";
import { AuthToken, User } from "tweeter-shared";
import { instance, mock, verify } from "ts-mockito";

jest.mock("../../../src/components/userInfo/userInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/userInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));

const authToken = new AuthToken("abc123", Date.now());
const currentUser = new User("Jacob", "Williams", "countfinessian", "www.google.com");

beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({ currentUser: currentUser, authToken: authToken });
})
describe("PostStatus Component", () => {
    let mockPresenter : PostPresenter;

    it("start with post and clear button disabled", () => {
        const { postButton, clearButton } = renderLoginAndGetElement();
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
        });
    it("enables the post and clear button if box has text", async () => {
        const { postButton, clearButton, statusField, user } = renderLoginAndGetElement();

        await user.type(statusField, "j");

        expect(postButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    });
    it("both buttons are disabled when the text field is cleared", async () => {
        const { postButton, clearButton, statusField, user } = renderLoginAndGetElement();

        await user.type(statusField, "a");
        expect(postButton).toBeEnabled();
        expect(clearButton).toBeEnabled();

        await user.click(clearButton);
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it("calls the presenters post method with correct parameters", async () => {
        mockPresenter = mock<PostPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const blurb = "I'm doing fine";
        const { postButton, clearButton, statusField, user  } = renderLoginAndGetElement(mockPresenterInstance);
        
        await user.type(statusField, blurb);
        await user.click(postButton);

        verify(mockPresenter.submitPost(currentUser, blurb, authToken)).once();
    });
    
});

const renderPostStatus = (presenter?: PostPresenter) => {
    return render(
        <MemoryRouter>
            {!!Presenter ? ( <PostStatus presenter={presenter} /> ) : ( <PostStatus /> )}
        </MemoryRouter>
    );
}

const renderLoginAndGetElement = (presenter?: PostPresenter) => {
    const user = userEvent.setup();
    renderPostStatus(presenter);
    const postButton = screen.getByLabelText("button");
    const clearButton = screen.getByLabelText("clear");
    const statusField = screen.getByLabelText("information-TextArea");
    return { postButton, clearButton, statusField, user };
}