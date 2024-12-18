import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AuthDAO } from "../DAO/AuthDAO";
import { authObject } from "../objects/authObject";


export class DynamoAuth implements AuthDAO {
  readonly tableName = "auth";

  readonly tokenColumn = "token";
  readonly aliasColumn = "alias";

  private readonly dynamoDbClient: DynamoDBDocumentClient;

  constructor(dynamoDbClient: DynamoDBDocumentClient) {
    this.dynamoDbClient = dynamoDbClient;
  }

  public async createAuth(auth: authObject) {
    console.log("Creating auth: ", auth);

    const params = {
      TableName: this.tableName,

      Item: {
        [this.tokenColumn]: auth.token,
        [this.aliasColumn]: auth.alias,
      },
    };

    console.log("Params: ", params);

    await this.dynamoDbClient.send(new PutCommand(params));
  }

  public async getAuth(token: string) {
    console.log("Getting auth by token: ", token);

    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenColumn]: token,
      },
    };

    console.log("Params: ", params);

    const { Item } = await this.dynamoDbClient.send(new GetCommand(params));

    if (Item != null) {
      return new authObject(Item[this.tokenColumn], Item[this.aliasColumn]);
    }
    return null;
  }

  public async deleteAuth(token: string) {
    console.log("Deleting auth by token: ", token);

    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenColumn]: token,
      },
    };

    console.log("Params: ", params);

    await this.dynamoDbClient.send(new DeleteCommand(params));
  }
}
