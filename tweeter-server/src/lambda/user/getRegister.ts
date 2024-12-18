import { getLoginResponse, logoutRequest, PagedStatusItemRequest, PagedStatusItemResponse, postStatusRequest, postStatusResponse, registerRequest, TweeterResponse } from "tweeter-shared"
import { StatusService } from "../../model/service/StatusService";
import { UserService } from "../../model/service/UserService";
import { DynamoFactory } from "../../model/implimentations/DynamoFactory";

export const handler = async (request: registerRequest): Promise<getLoginResponse> => {
    const userService = new UserService(new DynamoFactory());
    const [User, Token] = await userService.register(
        request.firstName,
        request.lastName,
        request.alias,
        request.password,
        request.imageStringBase64,
        request.imageFileExtension
    )

    return{
        success: true,
        message: null,
        User: User,
        Token: Token
    }
}
