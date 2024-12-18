import { DynamoAuth as DynamoAuth } from "./DynamoAuth";
import { DynamoFeed as DynamoFeed } from "./DynamoFeed";
import { DynamoFollow as DynamoFollow } from "./DynamoFollow";
import { DynamoS3 } from "./DynamoS3";
import { DynamoStory } from "./DynamoStory";
import { DynamoUser } from "./DynamoUser";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { config } from "../../config";
import { DAOFactory } from "../DAO/DAOFactory";
import { FollowDAO } from "../DAO/FollowDAO";
import { UserDAO } from "../DAO/UserDAO";
import { FeedDAO } from "../DAO/FeedDAO";
import { StoryDAO } from "../DAO/StoryDAO";
import { AuthDAO } from "../DAO/AuthDAO";
import { S3DAO } from "../DAO/S3DAO";

export class DynamoFactory implements DAOFactory {
    private readonly dynamoDbClient: DynamoDBDocumentClient;
    private readonly s3Client: S3Client;
  
    constructor() {
      this.dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: config.AWS_REGION }));
      this.s3Client = new S3Client({ region: config.AWS_REGION });
    }
  
    createFollowDao(): FollowDAO {
      return new DynamoFollow(this.dynamoDbClient);
    }
  
    createUserDao(): UserDAO {
      return new DynamoUser(this.dynamoDbClient);
    }
  
    createFeedDao(): FeedDAO {
      return new DynamoFeed(this.dynamoDbClient);
    }
  
    createStoryDao(): StoryDAO {
      return new DynamoStory(this.dynamoDbClient);
    }
  
    createAuthDao(): AuthDAO {
      return new DynamoAuth(this.dynamoDbClient);
    }
  
    createPhotoDao(): S3DAO {
      return new DynamoS3(this.s3Client);
    }
  }
  