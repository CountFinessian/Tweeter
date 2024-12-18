import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { FollowDAO } from "../DAO/FollowDAO";
import { followObject } from "../objects/followObject";

export class DynamoFollow implements FollowDAO {
  readonly tableName = "follow";

  readonly followerHandleColumn = "followerHandle";
  readonly followeeHandleColumn = "followeeHandle";
  readonly secondaryIndexName = "followeeHandle-followerHandle-index";

  private readonly dynamoDbClient: DynamoDBDocumentClient;

  constructor(dynamoDbClient: DynamoDBDocumentClient) {
    this.dynamoDbClient = dynamoDbClient;
  }

  public async createFollow(followerHandle: string, followeeHandle: string) {
    console.log("Creating follow: ", followerHandle, followeeHandle);

    const params = {
      TableName: this.tableName,

      Item: {
        [this.followerHandleColumn]: followerHandle,
        [this.followeeHandleColumn]: followeeHandle,
      },
    };

    console.log("Params: ", params);

    await this.dynamoDbClient.send(new PutCommand(params));
  }

  public async getFollow(followerHandle: string, followeeHandle: string) {
    console.log("Getting follow by followerHandle and followeeHandle: ", followerHandle, followeeHandle);

    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleColumn]: followerHandle,
        [this.followeeHandleColumn]: followeeHandle,
      },
    };

    console.log("Params: ", params);

    const { Item } = await this.dynamoDbClient.send(new GetCommand(params));

    if (Item != null) {
      return new followObject(Item[this.followerHandleColumn], Item[this.followeeHandleColumn]);
    }
    return null;
  }

  public async getAllFollowersForFollowee(followeeHandle: string): Promise<followObject[]> {
    const params = {
      TableName: this.tableName,
      IndexName: this.secondaryIndexName,
      KeyConditionExpression: `${this.followeeHandleColumn} = :followeeHandle`,
      ExpressionAttributeValues: {
        ":followeeHandle": followeeHandle,
      },
    };

    console.log("Params go here: ", params);
    const { Items } = await this.dynamoDbClient.send(new QueryCommand(params));
    console.log("Items: ", Items);

    return (
      Items?.map(
        (item) => new followObject(item[this.followerHandleColumn], item[this.followeeHandleColumn])
      ) ?? []
    );
  }

  public async getAllFolloweesForFollower(followerHandle: string): Promise<followObject[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.followerHandleColumn} = :followerHandle`,
      ExpressionAttributeValues: {
        ":followerHandle": followerHandle,
      },
    };

    const { Items } = await this.dynamoDbClient.send(new QueryCommand(params));

    return (
      Items?.map(
        (item) => new followObject(item[this.followerHandleColumn], item[this.followeeHandleColumn])
      ) ?? []
    );
  }

  public async getAllFollowersForFolloweePaginated(
    followeeHandle: string,
    pageSize: number,
    lastAlias?: string
  ): Promise<{ followers: followObject[]; hasMore: boolean }> {
    console.log("Getting all followers for followee and lastAlias: ", followeeHandle, lastAlias);

    const lastEvaluatedKey = lastAlias
      ? { [this.followeeHandleColumn]: followeeHandle, [this.followerHandleColumn]: lastAlias }
      : undefined;

    const params = {
      TableName: this.tableName,
      IndexName: this.secondaryIndexName,
      KeyConditionExpression: `${this.followeeHandleColumn} = :followeeHandle`,
      ExpressionAttributeValues: {
        ":followeeHandle": followeeHandle,
      },
      Limit: pageSize,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    const { Items, LastEvaluatedKey } = await this.dynamoDbClient.send(new QueryCommand(params));

    const followers =
      Items?.map(
        (item) => new followObject(item[this.followerHandleColumn], item[this.followeeHandleColumn])
      ) ?? [];

    const hasMore = !!LastEvaluatedKey;

    return { followers, hasMore };
  }

  public async getAllFolloweesForFollowerPaginated(
    followerHandle: string,
    pageSize: number,
    lastAlias?: string
  ): Promise<{ followees: followObject[]; hasMore: boolean }> {
    console.log("Getting all followees for follower and lastAlias: ", followerHandle, lastAlias);

    const lastEvaluatedKey = lastAlias
      ? { [this.followerHandleColumn]: followerHandle, [this.followeeHandleColumn]: lastAlias }
      : undefined;

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.followerHandleColumn} = :followerHandle`,
      ExpressionAttributeValues: {
        ":followerHandle": followerHandle,
      },
      Limit: pageSize,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    const { Items, LastEvaluatedKey } = await this.dynamoDbClient.send(new QueryCommand(params));

    const followees =
      Items?.map(
        (item) => new followObject(item[this.followerHandleColumn], item[this.followeeHandleColumn])
      ) ?? [];

    const hasMore = !!LastEvaluatedKey;

    return { followees, hasMore: hasMore };
  }

  public async deleteFollow(followerHandle: string, followeeHandle: string) {
    console.log("Deleting follow by followerHandle and followeeHandle: ", followerHandle, followeeHandle);

    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleColumn]: followerHandle,
        [this.followeeHandleColumn]: followeeHandle,
      },
    };

    console.log("Params: ", params);

    await this.dynamoDbClient.send(new DeleteCommand(params));
  }
}
