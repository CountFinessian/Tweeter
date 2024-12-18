import { StatusDto } from "tweeter-shared"
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";
import { feedObject } from "../../model/objects/feedObject";
import { QueueService } from "../../model/service/QueueService";

export const handler = async (event: any): Promise<void> => {
   
    const followDao = new DynamoFactory().createFollowDao();
   
    
    const feedArray: feedObject[] = [];

    for (let i = 0; i < event.Records.length; ++i) {
    
        const newStatus: StatusDto = JSON.parse(event.Records[i].body);
        console.log('Parsed StatusDto:', newStatus);

        const followEntities = await followDao.getAllFollowersForFollowee(newStatus.user.alias);

        for (const followEntity of followEntities) {
            const feedEntity = new feedObject(
                followEntity.followerHandle,
                newStatus.user.alias,
                newStatus.timestamp,
                newStatus.post
            );
            console.log('Ive got a feedObject', feedEntity);
            feedArray.push(feedEntity);
            //   await feedDao.createStory(feedEntity);
        }
    }
    const queueService = new QueueService();
    await queueService.receiveMessage(feedArray);
}



