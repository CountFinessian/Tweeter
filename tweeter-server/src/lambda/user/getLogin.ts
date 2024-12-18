import { PagedStatusItemRequest, getIsFollowerStatusRequest, getNumFollowRequest, TweeterResponse, getNumFollowResponse, getFollowUnfollowResponse, getUserRequest, getUserResponse, getLoginRequest, getLoginResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: getLoginRequest): Promise<getLoginResponse> => {
    const userService = new UserService(new DynamoFactory());
    const [User, Token] = await userService.login(request.alias, request.password)
    
    return{
        success: true,
        message: null,
        User: User,
        Token: Token
    }
}
