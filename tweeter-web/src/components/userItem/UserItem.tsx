import { User } from "tweeter-shared";
import { Link } from "react-router-dom";
import userNavigationHook from "./userNavigationHook";

interface Props {
  item: User;
}
// UserItem
const UserItem = (props: Props) => {
const navigateToUser = userNavigationHook();
    
  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.item.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.item.firstName} {props.item.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={props.item.alias}
                onClick={(event) => navigateToUser(event)}
              >
                {props.item.alias}
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
