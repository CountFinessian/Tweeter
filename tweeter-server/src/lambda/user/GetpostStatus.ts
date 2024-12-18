import { PagedStatusItemRequest, PagedStatusItemResponse, postStatusRequest, postStatusResponse, TweeterResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: postStatusRequest): Promise<postStatusResponse> => {
    const userService = new UserService(new DynamoFactory());
    await userService.postStatus(request.token, request.newStatus)

    return{
        success: true,
        message: null
    }
}
