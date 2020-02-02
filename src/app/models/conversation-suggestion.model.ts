import { User } from './user.model';
import { Project } from './project.model';

import { ConversationSuggestionTypesEnum } from './../enumerations/conversation-suggestion-types.enum';


export class ConversationSuggestion {

    suggestionType: ConversationSuggestionTypesEnum;
    suggestion: User | Project;

}
