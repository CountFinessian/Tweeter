import { SQSClient, SendMessageCommand, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import { StatusDto } from "tweeter-shared";
import { feedObject } from "../objects/feedObject";

export class QueueService {
    
    private sqsClient: SQSClient;

    constructor() {
        this.sqsClient = new SQSClient({ region: "us-east-1" });
    }

    async sendMessage(message: StatusDto): Promise<void> {
    const sqs_url1 = "https://sqs.us-east-1.amazonaws.com/474668429127/Q1";

    const status = JSON.stringify(message);
    const params = {
    // DelaySeconds: 10,
    MessageBody: status,
    QueueUrl: sqs_url1,
    };

    try {
    const data = await this.sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
    } catch (err) {
    throw err;
    }
    }

    async receiveMessage(feedtoPost: feedObject[]): Promise<void> {
        const sqs_url2 = "https://sqs.us-east-1.amazonaws.com/474668429127/Q2";

        for (let i = 0; i < feedtoPost.length; i += 10) {
            const batch = feedtoPost.slice(i, i + 10);
            const entries = batch.map((feed, index) => ({
                Id: index.toString(),
                MessageBody: JSON.stringify(feed),
            }));

            const params = {
                QueueUrl: sqs_url2,
                Entries: entries,
            };

            try {
                const data = await this.sqsClient.send(new SendMessageBatchCommand(params));
                console.log("Success, messages sent. Result:", data);
            } catch (err) {
                throw err;
            }
        }
    }
}
