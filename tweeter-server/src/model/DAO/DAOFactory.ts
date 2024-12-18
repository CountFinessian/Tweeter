import { AuthDAO } from "./AuthDAO";
import { FeedDAO } from "./FeedDAO";
import { FollowDAO } from "./FollowDAO";
import { S3DAO } from "./S3DAO";
import { StoryDAO } from "./StoryDAO";
import { UserDAO } from "./UserDAO";


export interface DAOFactory {
  createFollowDao(): FollowDAO;
  createUserDao(): UserDAO;
  createFeedDao(): FeedDAO;
  createStoryDao(): StoryDAO;
  createAuthDao(): AuthDAO;
  createPhotoDao(): S3DAO;
}
