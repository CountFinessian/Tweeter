import useInfo from "../userInfo/userInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavigationHookView, UserNavigationHookPresenter } from "../../presenters/userNavigationHookPresenter";
import { useState } from "react";

interface Props {
  presenterGenerator: (view: UserNavigationHookView) => UserNavigationHookPresenter;
}

const useNavigationHook = (props: Props) => {
  const { authToken, currentUser, setDisplayedUser } = useInfo();
  const { displayErrorMessage } = useToastListener();

  const view: UserNavigationHookView = {
    setDisplayedUser: setDisplayedUser,
    displayErrorMessage: displayErrorMessage,
  }

  const [presenter] = useState(props.presenterGenerator(view));

  const navigateToUser = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    presenter.navigateToUser(authToken!, currentUser!,  event);
  };

  return navigateToUser;
};

export default useNavigationHook;