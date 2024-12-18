import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

export interface registerRequest extends TweeterRequest{
    readonly firstName: string,
    readonly lastName: string,
    readonly alias: string,
    readonly password: string,
    imageStringBase64: string,
    imageFileExtension: string
}