import { PagedStatusItemRequest, getIsFollowerStatusRequest, getNumFollowRequest, TweeterResponse, getNumFollowResponse, getFollowUnfollowResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: getNumFollowRequest): Promise<getFollowUnfollowResponse> => {
    const userService = new UserService(new DynamoFactory());
    const [followerCount, followeeCount] = await userService.follow(request.token, request.user)

    return{
        followerCount: followerCount,
        followeeCount: followeeCount,
        success: true,
        message: null
    }
}
