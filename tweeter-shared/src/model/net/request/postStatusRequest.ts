import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface postStatusRequest extends TweeterRequest{
    readonly newStatus: StatusDto,
    readonly token: string
}