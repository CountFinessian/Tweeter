import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface getIsFollowerStatusRequest extends TweeterRequest{
    readonly user: UserDto,
    readonly selectedUser: UserDto,
    readonly token: string
}