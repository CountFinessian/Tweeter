import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useInfo from "../../userInfo/userInfoHook";
import { LoginPresenter, LoginView } from "../../../presenters/LoginPresenter";

interface Props {
  originalUrl?: string;
  presenter?: LoginPresenter;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useInfo();;
  const { displayErrorMessage } = useToastListener();

  const view: LoginView = {
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
    updateUserInfo: updateUserInfo
  }
  const [presenter] = useState(props.presenter?? new LoginPresenter(view));

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && checkSubmitButtonStatus()) {
      doLogin(rememberMe, alias, password, props.originalUrl);
    }
  };

  const doLogin = (
    rememberMe : boolean,
    alias : string, 
    password : string, 
    originalUrl : string | undefined) => {
    
    setIsLoading(true);
    presenter.doLogin(rememberMe, alias, password, originalUrl);
    setIsLoading(false);
    };

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };
  
  const inputFieldGenerator = () => {
    return (
      <AuthenticationFields 
      onSomeAction={loginOnEnter}
      setPassword={setPassword}
      password={password}
      setAlias={setAlias}
      alias={alias}
       />
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() => checkSubmitButtonStatus()}
      isLoading={isLoading}
      submit={() => doLogin(rememberMe, alias, password, props.originalUrl)}
    />
  );
};

export default Login;
