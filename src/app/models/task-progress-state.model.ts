import { User } from './user.model';

import { TaskProgressStatesEnum } from './../enumerations/task-progress-states.enum';


export class TaskProgressState {

    progressState: TaskProgressStatesEnum;
    progressStateUpdatedBy: User = new User();
    progressStateUpdateDate: string;

}
