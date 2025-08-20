import { Message } from "@/model/User";

export interface ApiResoponse {
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>
}