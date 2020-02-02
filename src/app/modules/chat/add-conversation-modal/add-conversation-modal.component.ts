import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { ProjectsService } from './../../../services/projects.service';
import { CollaborationsService } from './../../../services/collaborations.service';
import { UsersService } from './../../../services/users.service';
import { ConversationsService } from './../../../services/conversations.service';

import { compareUsersByFullNames, compareStrings } from './../../../utils/comparators.util';

import { User } from './../../../models/user.model';
import { Project } from './../../../models/project.model';
import { ConversationSuggestion } from './../../../models/conversation-suggestion.model';
import { Collaboration } from './../../../models/collaboration.model';
import { Conversation } from './../../../models/conversation.model';

import { ProfileTypesEnum } from './../../../enumerations/profile-types.enum';
import { ConversationSuggestionTypesEnum } from './../../../enumerations/conversation-suggestion-types.enum';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { STORAGE_DATE_TIME_FORMAT } from './../../../constants/date-formats.constant';


@Component({
    templateUrl: './add-conversation-modal.component.html',
    styleUrls: [ './add-conversation-modal.component.scss' ]
})
export class AddConversationModalComponent implements OnInit {

    addConversationFormGroup: FormGroup = this.formBuilder.group({
        name: [ '' ],
        conversationParties: [ '' ]
    });

    currentUser: User = new User();

    conversationParties: ConversationSuggestion[] = [];
    suggestedConversationParties: ConversationSuggestion[] = [];
    selectedConversationParties: User[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private storage: Storage,
        private projectsService: ProjectsService,
        private collaborationsService: CollaborationsService,
        private usersService: UsersService,
        private conversationsService: ConversationsService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.currentUser = currentUser;
                const CONVERSATION_PARTIES: ConversationSuggestion[] = [];
                if (this.currentUser.profileType === ProfileTypesEnum.CLIENT) {
                    this.projectsService.getProjectsByOwnerId(this.currentUser.id).subscribe(
                        (projects: Project[]) => {
                            projects.forEach((project: Project) => {
                                const CONVERSATION_SUGGESTION: ConversationSuggestion = new ConversationSuggestion();
                                CONVERSATION_SUGGESTION.suggestionType = ConversationSuggestionTypesEnum.PROJECT_TEAM;
                                CONVERSATION_SUGGESTION.suggestion = project;
                                CONVERSATION_PARTIES.push(CONVERSATION_SUGGESTION);
                            });
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                } else {
                    this.collaborationsService.getCollaborationsByCollaboratorId(this.currentUser.id).subscribe(
                        (collaborations: Collaboration[]) => {
                            collaborations.forEach((collaboration: Collaboration) => {
                                this.projectsService.getProjectById(collaboration.projectId).subscribe(
                                    (project: Project) => {
                                        const CONVERSATION_SUGGESTION: ConversationSuggestion = new ConversationSuggestion();
                                        CONVERSATION_SUGGESTION.suggestionType = ConversationSuggestionTypesEnum.PROJECT_TEAM;
                                        CONVERSATION_SUGGESTION.suggestion = project;
                                        CONVERSATION_PARTIES.push(CONVERSATION_SUGGESTION);
                                    },
                                    (error: any) => {
                                        console.log(error);
                                    }
                                );
                            });
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                }
                this.usersService.getUsers().subscribe(
                    (users: User[]) => {
                        users.forEach((user: User) => {
                            if (user.id !== this.currentUser.id) {
                                const CONVERSATION_SUGGESTION: ConversationSuggestion = new ConversationSuggestion();
                                CONVERSATION_SUGGESTION.suggestionType = ConversationSuggestionTypesEnum.USER;
                                CONVERSATION_SUGGESTION.suggestion = user;
                                CONVERSATION_PARTIES.push(CONVERSATION_SUGGESTION);
                            }
                        });
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
                this.conversationParties = CONVERSATION_PARTIES;
            }
        );

    }

    onConversationPartiesInputChange() {

        const KEYSTROKES = this.addConversationFormGroup.get('conversationParties').value.trim().toLowerCase();
        this.suggestedConversationParties = [];
        if (KEYSTROKES !== '') {
            let suggestedConversationParties: ConversationSuggestion[] = [];
            suggestedConversationParties = this.conversationParties.filter((conversationSuggestion: ConversationSuggestion) => {
                if (conversationSuggestion.suggestionType === ConversationSuggestionTypesEnum.USER) {
                    const userFullName = (conversationSuggestion.suggestion as User).firstName.toLowerCase() + ' ' + (conversationSuggestion.suggestion as User).lastName.toLowerCase();
                    return userFullName.includes(KEYSTROKES) || (conversationSuggestion.suggestion as User).email.toLowerCase().includes(KEYSTROKES);
                } else {
                    return (conversationSuggestion.suggestion as Project).label.toLowerCase().includes(KEYSTROKES);
                }
            });
            const SUGGESTED_PROJECTS_TEAMS_CONVERSATION_PARTIES: ConversationSuggestion[] = suggestedConversationParties.filter((conversationSuggestion: ConversationSuggestion) => conversationSuggestion.suggestionType === ConversationSuggestionTypesEnum.PROJECT_TEAM);
            SUGGESTED_PROJECTS_TEAMS_CONVERSATION_PARTIES.sort((firstSuggestion, secondSuggestion) => compareStrings((firstSuggestion.suggestion as Project).label, (secondSuggestion.suggestion as Project).label));
            this.suggestedConversationParties = this.suggestedConversationParties.concat(SUGGESTED_PROJECTS_TEAMS_CONVERSATION_PARTIES);
            const SUGGESTED_USERS_CONVERSATION_PARTIES: ConversationSuggestion[] = suggestedConversationParties.filter((conversationSuggestion: ConversationSuggestion) => conversationSuggestion.suggestionType === ConversationSuggestionTypesEnum.USER);
            SUGGESTED_USERS_CONVERSATION_PARTIES.sort((firstSuggestion, secondSuggestion) => compareUsersByFullNames(firstSuggestion.suggestion as User, secondSuggestion.suggestion as User));
            this.suggestedConversationParties = this.suggestedConversationParties.concat(SUGGESTED_USERS_CONVERSATION_PARTIES);
        }

    }

    onConversationPartySuggestionSelection(index: number) {

        const SELECTED_CONVERSATION_PARTY_SUGGESTION = this.suggestedConversationParties[index];
        if (SELECTED_CONVERSATION_PARTY_SUGGESTION.suggestionType === ConversationSuggestionTypesEnum.PROJECT_TEAM) {
            this.collaborationsService.getCollaborationsByProjectId((SELECTED_CONVERSATION_PARTY_SUGGESTION.suggestion as Project).id).subscribe(
                (collaborations: Collaboration[]) => {
                    collaborations.forEach((collaboration: Collaboration) => {
                        this.conversationParties.forEach((conversationParty: ConversationSuggestion, i: number) => {
                            if (conversationParty.suggestionType === ConversationSuggestionTypesEnum.USER && (conversationParty.suggestion as User).id === collaboration.collaboratorId) {
                                let exists = false;
                                this.selectedConversationParties.forEach((selectedConversationParty: User) => {
                                    if (selectedConversationParty.id === (conversationParty.suggestion as User).id) {
                                        exists = true;
                                    }
                                });
                                if (!exists) {
                                    this.selectedConversationParties.push((conversationParty.suggestion as User));
                                }
                                this.conversationParties.splice(i, 1);
                            }
                        });
                    });
                },
                (error: any) => {
                    console.log(error);
                }
            );
        } else {
            this.conversationParties.forEach((conversationParty: ConversationSuggestion, i: number) => {
                if (conversationParty.suggestionType === ConversationSuggestionTypesEnum.USER && (conversationParty.suggestion as User).id === (SELECTED_CONVERSATION_PARTY_SUGGESTION.suggestion as User).id) {
                    this.conversationParties.splice(i, 1);
                }
            });
            this.selectedConversationParties.push((SELECTED_CONVERSATION_PARTY_SUGGESTION.suggestion as User));
        }
        this.suggestedConversationParties = [];
        this.addConversationFormGroup.get('conversationParties').setValue('');

    }

    onSelectedConversationPartyRemoval(index: number) {

        const CONVERSATION_SUGGESTION: ConversationSuggestion = new ConversationSuggestion();
        CONVERSATION_SUGGESTION.suggestionType = ConversationSuggestionTypesEnum.USER;
        CONVERSATION_SUGGESTION.suggestion = this.selectedConversationParties[index];
        this.conversationParties.push(CONVERSATION_SUGGESTION);
        this.selectedConversationParties.splice(index, 1);

    }

    onAddConversation() {

        if (this.selectedConversationParties.length === 0) {
            this.addConversationFormGroup.get('conversationParties').setErrors({ required: true });
            return;
        }

        if (this.selectedConversationParties.length > 1 && (!this.addConversationFormGroup.get('name').value || this.addConversationFormGroup.get('name').value.trim() === '')) {
            this.addConversationFormGroup.get('name').setErrors({ required: true });
            return;
        }

        const CONVERSATION = new Conversation();
        CONVERSATION.name = (this.selectedConversationParties.length > 1) ? this.addConversationFormGroup.get('name').value : this.selectedConversationParties[0].firstName + ' ' + this.selectedConversationParties[0].lastName;
        CONVERSATION.partiesIds = this.selectedConversationParties.map((user: User) => user.id);
        CONVERSATION.partiesIds.push(this.currentUser.id);
        CONVERSATION.createdBy = this.currentUser.id;
        CONVERSATION.creationDate = moment().format(STORAGE_DATE_TIME_FORMAT);
        delete CONVERSATION['lastMessage'];
        this.conversationsService.addConversation(CONVERSATION).then(
            () => {
                this.closeModal();
            }
        );

    }

    closeModal() {

        this.modalController.dismiss();

    }

}
