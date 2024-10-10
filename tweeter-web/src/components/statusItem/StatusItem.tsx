import { Status } from "tweeter-shared";
import { Link } from "react-router-dom";
import Post from "../statusItem/Post";
import userNavigationHook from "../userItem/userNavigationHook";
import { UserNavigationHookView, UserNavigationHookPresenter } from "../../presenters/userNavigationHookPresenter";

export const PAGE_SIZE = 10;
interface Props {
    item: Status;
    presenterGenerator: (view: UserNavigationHookView) => UserNavigationHookPresenter
  }

const StatusItem = (props: Props) => {
  
  const navigateToUser = userNavigationHook(props);

    return (
      <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.item.user.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.item.user.firstName} {props.item.user.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={props.item.user.alias}
                onClick={(event) => navigateToUser(event)}
              >
                {props.item.user.alias}
              </Link>
            </h2>
            {props.item.formattedDate}
            <br />
            <Post status={props.item} presenterGenerator={(view: UserNavigationHookView) => new UserNavigationHookPresenter(view)} />
          </div>
        </div>
      </div>
    </div>
      );
  };

  export default StatusItem;