import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface getLoginRequest extends TweeterRequest{
    readonly alias: string,
    readonly password: string
}