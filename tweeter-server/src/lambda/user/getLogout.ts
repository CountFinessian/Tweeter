import { logoutRequest, PagedStatusItemRequest, PagedStatusItemResponse, postStatusRequest, postStatusResponse, TweeterResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: logoutRequest): Promise<postStatusResponse> => {
    const userService = new UserService(new DynamoFactory());
    await userService.logout(request.token)

    return{
        success: true,
        message: null
    }
}
