import { followObject } from "../objects/followObject";


export interface FollowDAO {

  createFollow(followerHandle: string, followeeHandle: string): Promise<void>;

  getFollow(followerHandle: string, followeeHandle: string): Promise<followObject | null>;

  getAllFolloweesForFollower(followerHandle: string): Promise<followObject[]>;

  getAllFollowersForFollowee(followeeHandle: string): Promise<followObject[]>;

  getAllFolloweesForFollowerPaginated(
    followerHandle: string,
    pageSize: number,
    lastAlias?: string
  ): Promise<{ followees: followObject[]; hasMore: boolean }>;

  getAllFollowersForFolloweePaginated(
    followeeHandle: string,
    pageSize: number,
    lastAlias?: string
  ): Promise<{ followers: followObject[]; hasMore: boolean }>;

  deleteFollow(followerHandle: string, followeeHandle: string): Promise<void>;
}
