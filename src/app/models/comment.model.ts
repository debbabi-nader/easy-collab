import { User } from './user.model';


export class Comment {

    id: string;
    content?: string;
    postedBy?: User = new User();
    postDate?: string;

}
