import { User } from './user.model';
import { Project } from './project.model';

import { CollaborationProposalStatesEnum } from './../enumerations/collaboration-proposal-states.enum';


export class CollaborationProposal {

    id: string;
    project?: Project = new Project();
    sender?: User = new User();
    receivers?: User[] = [];
    collaborationProposalState?: CollaborationProposalStatesEnum;

}
