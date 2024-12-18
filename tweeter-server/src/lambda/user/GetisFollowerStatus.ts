import { PagedStatusItemRequest, getIsFollowerStatusRequest, postStatusRequest, TweeterResponse, getIsFollowerStatusResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: getIsFollowerStatusRequest): Promise<getIsFollowerStatusResponse> => {
    const userService = new UserService(new DynamoFactory());
    const following = await userService.getIsFollowerStatus(request.token, request.user, request.selectedUser)

    return{
        following: following,
        success: true,
        message: null
    }
}
