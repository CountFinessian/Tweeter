import { StatusDto } from "../../dto/StatusDto";
import { TweeterResponse } from "./TweeterResponse";

export interface getIsFollowerStatusResponse extends TweeterResponse {
    readonly following: boolean 
}