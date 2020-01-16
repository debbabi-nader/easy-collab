import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { CollaborationsService } from './../../../services/collaborations.service';
import { UsersService } from './../../../services/users.service';
import { TasksService } from './../../../services/tasks.service';

import { blankValidator } from '../../../utils/validators.util';
import { compareUsersByFullNames } from '../../../utils/comparators.util';

import { Collaboration } from './../../../models/collaboration.model';
import { User } from './../../../models/user.model';
import { Task } from './../../../models/task.model';

import { TaskProgressStatesEnum } from '../../../enumerations/task-progress-states.enum';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { STORAGE_DATE_TIME_FORMAT } from '../../../constants/date-formats.constant';


@Component({
    templateUrl: './add-task-modal.component.html',
    styleUrls: [ './add-task-modal.component.scss' ],
})
export class AddTaskModalComponent implements OnInit {

    projectId: string;

    addTaskFormGroup: FormGroup = this.formBuilder.group({
        label: [ '', [ Validators.required, Validators.maxLength(120) ], [ blankValidator() ] ],
        description: [ '', [ Validators.required, Validators.maxLength(300) ], [ blankValidator() ] ],
        dueDate: [ '', Validators.required ],
        assignedTo: [ '' ]
    });

    minDueDate: string;

    projectTeam: User[] = [];
    taskTeam: User[] = [];
    suggestedTaskTeam: User[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private navParams: NavParams,
        private modalController: ModalController,
        private storage: Storage,
        private collaborationsService: CollaborationsService,
        private usersService: UsersService,
        private tasksService: TasksService
    ) {}

    ngOnInit() {

        this.projectId = this.navParams.get('projectId');
        this.minDueDate = moment().format();
        this.loadProjectTeam();

    }

    loadProjectTeam() {

        this.collaborationsService.getCollaborationsByProjectId(this.projectId).subscribe(
            (collaborations: Collaboration[]) => {
                const projectTeam = [];
                collaborations.forEach((collaboration) => {
                    this.usersService.getUserById(collaboration.collaboratorId).subscribe(
                        (user: User) => {
                            projectTeam.push(user);
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                });
                this.projectTeam = projectTeam;
            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    onAssignedToInputChange() {

        const keystrokes = this.addTaskFormGroup.get('assignedTo').value.trim().toLowerCase();
        this.suggestedTaskTeam = [];
        if (keystrokes !== '') {
            this.suggestedTaskTeam = this.projectTeam.filter((user: User) => {
                const userFullName = user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase();
                return userFullName.includes(keystrokes) || user.email.toLowerCase().includes(keystrokes);
            });
            this.suggestedTaskTeam.sort((firstUser, secondUser) => compareUsersByFullNames(firstUser, secondUser));
        }

    }

    onSuggestionSelection(index: number) {

        this.projectTeam.splice(this.projectTeam.findIndex((user: User) => user.id === this.suggestedTaskTeam[index].id), 1);
        this.taskTeam.push(this.suggestedTaskTeam[index]);
        this.suggestedTaskTeam = [];
        this.addTaskFormGroup.get('assignedTo').setValue('');

    }

    onSuggestionRemoval(index: number) {

        this.projectTeam.push(this.taskTeam[index]);
        this.taskTeam.splice(index, 1);

    }

    onAddTask() {

        this.tasksService.getTasksByProjectId(this.projectId).subscribe(
            (tasks: Task[]) => {
                if (tasks.find(task => task.label.toLowerCase() === this.addTaskFormGroup.get('label').value.toLowerCase())) {
                    this.addTaskFormGroup.get('label').setErrors({ notUnique: true });
                } else {
                    this.storage.get(CURRENT_USER_KEY).then(
                        (currentUser: User) => {
                            const task: Task = new Task();
                            task.label = this.addTaskFormGroup.get('label').value;
                            task.description = this.addTaskFormGroup.get('description').value;
                            task.dueDate = moment(this.addTaskFormGroup.get('dueDate').value).format(STORAGE_DATE_TIME_FORMAT);
                            task.projectId = this.projectId;
                            task.createdBy = currentUser.id;
                            task.creationDate = moment().format(STORAGE_DATE_TIME_FORMAT);
                            task.assignedTo = this.taskTeam.map((user: User) => user.id);
                            task.progressStates = [
                                {
                                    progressState: TaskProgressStatesEnum.TO_DO,
                                    progressStateUpdatedBy: currentUser.id,
                                    progressStateUpdateDate: moment().format(STORAGE_DATE_TIME_FORMAT)
                                }
                            ];
                            task.acceptanceStates = [];
                            task.commentsIds = [];
                            this.tasksService.addTask(task).then(
                                () => {
                                    this.closeModal();
                                }
                            ).catch(
                                (error: any) => {
                                    console.log(error);
                                }
                            );
                        }
                    );
                }
            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    closeModal() {

        this.modalController.dismiss();

    }

}
