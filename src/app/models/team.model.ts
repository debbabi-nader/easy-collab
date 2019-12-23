import { Project } from './project.model';
import { User } from './user.model';


export class Team {

    id: string;
    project?: Project = new Project();
    members?: User[] = [];

}
