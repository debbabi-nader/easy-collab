import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { TasksService } from './../../../services/tasks.service';

import { blankValidator } from '../../../utils/validators.util';

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

    addTaskFormGroup: FormGroup = this.formBuilder.group({
        label: [ '', [ Validators.required, Validators.maxLength(120) ], [ blankValidator() ] ],
        description: [ '', [ Validators.required, Validators.maxLength(300) ], [ blankValidator() ] ],
        dueDate: [ '', Validators.required ]
    });

    minDueDate: string;

    constructor(
        private formBuilder: FormBuilder,
        private navParams: NavParams,
        private modalController: ModalController,
        private storage: Storage,
        private tasksService: TasksService
    ) {}

    ngOnInit() {

        this.minDueDate = moment().format();

    }

    onAddTask() {

        const projectId = this.navParams.get('projectId');
        this.tasksService.getTasksByProjectId(projectId).subscribe(
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
                            task.projectId = projectId;
                            task.createdBy = currentUser.id;
                            task.creationDate = moment().format(STORAGE_DATE_TIME_FORMAT);
                            task.assignedTo = [];
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
