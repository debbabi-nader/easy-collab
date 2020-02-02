import { Message } from './message.model';


export class Conversation {

    id: string;
    name?: string;
    partiesIds?: string[] = [];
    createdBy?: string;
    creationDate?: string;
    lastMessage?: Message = undefined;

}
