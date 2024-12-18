import { TweeterResponse } from "./TweeterResponse";

export interface getNumFollowResponse extends TweeterResponse{
    readonly numFollow: number
}