import { PagedStatusItemRequest, getIsFollowerStatusRequest, getNumFollowRequest, TweeterResponse, getNumFollowResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: getNumFollowRequest): Promise<getNumFollowResponse> => {
    const userService = new UserService(new DynamoFactory());
    const following = await userService.getFolloweeCount(request.token, request.user)

    return{
        numFollow: following,
        success: true,
        message: null
    }
}
