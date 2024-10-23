import "./App.css";
import useInfo from "./components/userInfo/userInfoHook";
import { 
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import { UserItemView } from "./presenters/UserItemPresenter";
import { FolloweePresenter } from "./presenters/FolloweePresenter";
import { FollowerPresenter } from "./presenters/FollowerPresenter";
import { StoryPresenter } from "./presenters/StoryPresenter";
import { StatusItemView } from "./presenters/StatusItemPresenter";
import  ItemScroller from "./components/mainLayout/itemScroller";
import { LoginPresenter, LoginView } from "./presenters/LoginPresenter";
import { RegisterPresenter, RegisterView } from "./presenters/RegisterPresenter";
import { PagedItemPresenter, PagedItemView } from "./presenters/PagedItemPresenter";
import StatusItem from "./components/statusItem/StatusItem";
import { Status, User } from "tweeter-shared";
import { StatusService } from "./model/service/StatusService";
import { FeedPresenter } from "./presenters/FeedPresenter";
import UserItem from "./components/userItem/UserItem";

const App = () => {

  const { currentUser, authToken } = useInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route 
          path="feed"
          element={
            <ItemScroller<Status, StatusService>
              key={1} 
              presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)}
              constructorItem={(item: Status) => (<StatusItem item={item} />)}
              />
          }
        />
        <Route 
          path="story"
          element={
            <ItemScroller
              key={2} 
              presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)}
              constructorItem={(item: Status) => (<StatusItem item={item} />)}
              />
            } 
          />
        <Route
          path="followees"
          element={
            <ItemScroller
              key={3}
              presenterGenerator={(view: PagedItemView<User>) => new FolloweePresenter(view)}
              constructorItem={(item: User) => (<UserItem item={item} />)}
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller
              key={4} 
              presenterGenerator={(view: PagedItemView<User>) => new FollowerPresenter(view)}
              constructorItem={(item: User) => (<UserItem item={item} />)}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login 
      presenterGenerator={(view: LoginView) => new LoginPresenter(view)}
      />} />
      
      <Route path="/register" element={<Register 
      presenterGenerator={(view: RegisterView) => new RegisterPresenter(view)}/>} />

      <Route path="*" element={<Login originalUrl={location.pathname} 
      presenterGenerator={(view: LoginView) => new LoginPresenter(view)}/>} />
    </Routes>
  );
};

export default App;
