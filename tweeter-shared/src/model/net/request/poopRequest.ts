import { StatusDto } from "../../dto/StatusDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface getNumFollowRequest extends TweeterRequest{
    readonly user: UserDto,
    readonly token: string
}