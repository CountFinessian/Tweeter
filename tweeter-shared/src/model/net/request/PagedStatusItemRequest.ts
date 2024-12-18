import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedStatusItemRequest extends TweeterRequest{
    readonly pageSize: number,
    readonly userAlias: string,
    readonly lastItem: StatusDto | null,
    readonly token: string
}