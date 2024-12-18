import { storyObject } from "../objects/storyObject";

export interface StoryDAO {

  createStory(story: storyObject): Promise<void>;

  getStoriesByAliasPaginated(
    alias: string,
    pageSize: number,
    lastTimestamp?: number
  ): Promise<{ stories: storyObject[]; hasMore: boolean }>;
}
