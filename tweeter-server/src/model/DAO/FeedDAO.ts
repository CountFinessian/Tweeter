import { feedObject } from "../objects/feedObject";


export interface FeedDAO {
  // Create + Paged Read

  createStory(feed: feedObject): Promise<void>;

  getFeedByAliasPaginated(
    followerAlias: string,
    pageSize: number,
    lastTimestamp?: number
  ): Promise<{ feeds: feedObject[]; hasMore: boolean }>;
}
