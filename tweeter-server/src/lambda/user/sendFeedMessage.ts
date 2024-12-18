import { DynamoFactory } from "../../model/implimentations/DynamoFactory";
import { feedObject } from "../../model/objects/feedObject";

export const handler = async (event: any): Promise<void> => {
   
    const feedDao = new DynamoFactory().createFeedDao();

    for (let i = 0; i < event.Records.length; ++i) {
    
        const feedObject: feedObject = JSON.parse(event.Records[i].body);
        console.log('Parsed StatusDto:', feedObject);


        
        try {
            const data = await feedDao.createStory(feedObject);
            console.log("Success, feeds are updated. Result:", data);
        } catch (err) {
            throw err;
        }
        
        }
    }
// add feed entity object to the second qeue so ti can be added to the feed table.



