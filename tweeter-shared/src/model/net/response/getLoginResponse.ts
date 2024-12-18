import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface getLoginResponse extends TweeterResponse{
    readonly User: UserDto,
    readonly Token: string
}