import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface getUserRequest extends TweeterRequest{
    readonly alias: string,
    readonly token: string
}