import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { FeedDAO } from "../DAO/FeedDAO";
import { feedObject } from "../objects/feedObject";

export class DynamoFeed implements FeedDAO {
  readonly tableName = "feed";

  readonly followerAliasColumn = "followerAlias";
  readonly influencerAliasColumn = "influencerAlias";
  readonly timestampColumn = "timestamp";
  readonly postColumn = "post";

  private readonly dynamoDbClient: DynamoDBDocumentClient;

  constructor(dynamoDbClient: DynamoDBDocumentClient) {
    this.dynamoDbClient = dynamoDbClient;
  }

  public async createStory(feed: feedObject) {
    console.log("Creating feed: ", feed);

    const params = {
      TableName: this.tableName,

      Item: {
        [this.followerAliasColumn]: feed.followerAlias,
        [this.influencerAliasColumn]: feed.influencerAlias,
        [this.timestampColumn]: feed.timestamp,
        [this.postColumn]: feed.post,
      },
    };

    console.log("Params: ", params);

    await this.dynamoDbClient.send(new PutCommand(params));
  }

  public async getFeedByAliasPaginated(
    followerAlias: string,
    pageSize: number,
    lastTimestamp?: number
  ): Promise<{ feeds: feedObject[]; hasMore: boolean }> {
    console.log("Getting feed by followerAlias:", followerAlias, "with lastTimestamp:", lastTimestamp);

    const lastEvaluatedKey = lastTimestamp
      ? { [this.followerAliasColumn]: followerAlias, [this.timestampColumn]: lastTimestamp }
      : undefined;

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.followerAliasColumn} = :followerAlias`,
      ExpressionAttributeValues: {
        ":followerAlias": followerAlias,
      },
      Limit: pageSize,
      ExclusiveStartKey: lastEvaluatedKey,
      ScanIndexForward: false,
    };

    console.log("Params:", params);

    const { Items, LastEvaluatedKey } = await this.dynamoDbClient.send(new QueryCommand(params));

    const feeds =
      Items?.map(
        (item) =>
          new feedObject(
            item[this.followerAliasColumn],
            item[this.influencerAliasColumn],
            item[this.timestampColumn],
            item[this.postColumn]
          )
      ) ?? [];

    const hasMore = !!LastEvaluatedKey;

    return { feeds, hasMore };
  }
}
