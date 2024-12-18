import { StatusDto } from "../../dto/StatusDto";
import { TweeterResponse } from "./TweeterResponse";

export interface getFollowUnfollowResponse extends TweeterResponse {
    readonly followerCount: number,
    readonly followeeCount: number 
}