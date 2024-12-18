import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface logoutRequest extends TweeterRequest{
    readonly token: string
}