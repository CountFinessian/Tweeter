import { PagedStatusItemRequest, getIsFollowerStatusRequest, getNumFollowRequest, TweeterResponse, getNumFollowResponse, getFollowUnfollowResponse, getUserRequest, getUserResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: getUserRequest): Promise<getUserResponse> => {
    const userService = new UserService(new DynamoFactory());
    const User = await userService.getUser(request.token, request.alias,)
    if ( !User ){
        throw new Error("User is null")
    }
    return{
        success: true,
        message: null,
        User: User
    }
}
