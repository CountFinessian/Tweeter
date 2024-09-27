import { AuthToken, FakeData, User } from "tweeter-shared";
import useInfo from "../userInfo/userInfoHook";
import useToastListener from "../toaster/ToastListenerHook"; // Adjust the import path as needed

const useNavigationHook = () => {
  const { authToken, currentUser, setDisplayedUser } = useInfo();
  const { displayErrorMessage } = useToastListener();

  const navigateToUser = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();

    try {
      const target = event.target as HTMLElement;
      const alias = extractAlias(target.textContent || '');

      const user = await getUser(authToken!, alias);

      if (user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return index !== -1 ? value.substring(index) : value;
  };

  const getUser = async (authToken: AuthToken, alias: string): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return navigateToUser;
};

export default useNavigationHook;