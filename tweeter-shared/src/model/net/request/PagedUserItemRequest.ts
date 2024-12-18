import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedUserItemRequest extends TweeterRequest{
    readonly pageSize: number,
    readonly userAlias: string,
    readonly lastItem: UserDto | null,
    readonly token: string
}