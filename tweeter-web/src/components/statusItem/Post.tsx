import { Status, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import userNavigationHook from "../userItem/userNavigationHook";
import { UserNavigationHookView, UserNavigationHookPresenter } from "../../presenters/userNavigationHookPresenter";

interface Props {
  status: Status;
  presenterGenerator: (view: UserNavigationHookView) => UserNavigationHookPresenter
}

const Post = (props: Props) => {
  const navigateToUser = userNavigationHook(props);
  
  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => navigateToUser(event)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;