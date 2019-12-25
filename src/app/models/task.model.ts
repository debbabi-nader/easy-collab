import { TaskProgressState } from './task-progress-state.model';
import { TaskAcceptanceState } from './task-acceptance-state.model';


export class Task {

    id: string;
    label?: string;
    description?: string;
    projectId?: string;
    dueDate?: string;
    createdBy?: string;
    creationDate?: string;
    assignedTo?: string[] = [];
    progressStates?: TaskProgressState[] = [];
    acceptanceStates?: TaskAcceptanceState[] = [];
    commentsIds?: string[] = [];

}
