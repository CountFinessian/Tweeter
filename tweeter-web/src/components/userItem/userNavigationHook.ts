import useInfo from "../userInfo/userInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavigationHookView, UserNavigationHookPresenter } from "../../presenters/userNavigationHookPresenter";
import { useState } from "react";


const useNavigationHook = () => {
  const { authToken, currentUser, setDisplayedUser } = useInfo();
  const { displayErrorMessage } = useToastListener();

  const view: UserNavigationHookView = {
    setDisplayedUser: setDisplayedUser,
    displayErrorMessage: displayErrorMessage,
  }

  const [presenter] = useState(new UserNavigationHookPresenter(view));

  const navigateToUser = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    presenter.navigateToUser(authToken!, currentUser!,  event);
  };

  return navigateToUser;
};

export default useNavigationHook;