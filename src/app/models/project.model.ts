import { User } from './user.model';


export class Project {

    id: string;
    label?: string;
    abstract?: string;
    description?: string;
    owner?: User = new User();
    creationDate?: string;

}
