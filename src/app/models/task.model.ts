import { Project } from './project.model';
import { User } from './user.model';
import { TaskProgressState } from './task-progress-state.model';
import { TaskAcceptanceState } from './task-acceptance-state.model';
import { Comment } from './comment.model';


export class Task {

    id: string;
    label?: string;
    description?: string;
    project?: Project = new Project();
    workload?: number;
    dueDate?: string;
    createdBy?: User = new User();
    creationDate?: string;
    assignedTo?: User[] = [];
    progressStates?: TaskProgressState[] = [];
    acceptanceStates?: TaskAcceptanceState[] = [];
    comments?: Comment[] = [];

}
