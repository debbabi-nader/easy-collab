import { User } from './user.model';

import { TaskAcceptanceStatesEnum } from './../enumerations/task-acceptance-states.enum';


export class TaskAcceptanceState {

    acceptanceState: TaskAcceptanceStatesEnum;
    acceptanceStateUpdatedBy: User = new User();
    acceptanceStateUpdateDate: string;

}
