import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';

import { AddTaskModalComponent } from './../add-task-modal/add-task-modal.component';
import { TaskDetailsModalComponent } from './../task-details-modal/task-details-modal.component';

import { TasksService } from './../../../services/tasks.service';

import { Task } from './../../../models/task.model';
import { TaskProgressState } from './../../../models/task-progress-state.model';

import { TaskProgressStatesEnum } from './../../../enumerations/task-progress-states.enum';

import { STORAGE_DATE_TIME_FORMAT, DISPLAY_DATE_FORMAT, DISPLAY_TIME_FORMAT } from './../../../constants/date-formats.constant';


@Component({
    templateUrl: './project-tasks.component.html',
    styleUrls: [ './project-tasks.component.scss' ]
})
export class ProjectTasksComponent implements OnInit {

    projectId: string;

    toDoTaskProgressState: TaskProgressStatesEnum = TaskProgressStatesEnum.TO_DO;
    doingTaskProgressState: TaskProgressStatesEnum = TaskProgressStatesEnum.DOING;
    doneTaskProgressState: TaskProgressStatesEnum = TaskProgressStatesEnum.DONE;
    selectedTaskProgressState: TaskProgressStatesEnum = this.toDoTaskProgressState;

    tasks$: Observable<Task[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalController: ModalController,
        private tasksService: TasksService
    ) {}

    ngOnInit() {

        this.projectId = this.activatedRoute.snapshot.parent.paramMap.get('id');
        this.loadTasks();

    }

    loadTasks() {

        this.tasks$ = this.tasksService.getTasksByProjectId(this.projectId).pipe(
            map(
                (tasks: Task[]) => {
                    return tasks.filter(
                        (task: Task) => {
                            if (task.progressStates && task.progressStates.length > 0) {
                                const taskProgressStates: TaskProgressState[] = task.progressStates.sort(
                                    (a, b) => moment(a.progressStateUpdateDate, STORAGE_DATE_TIME_FORMAT).isSameOrBefore(moment(b.progressStateUpdateDate, STORAGE_DATE_TIME_FORMAT)) ? -1 : 1
                                );
                                if (taskProgressStates[taskProgressStates.length - 1].progressState === this.selectedTaskProgressState) {
                                    return task;
                                }
                            }
                        }
                    );
                }
            )
        );

    }

    onTasksProgressStateSelect(taskProgressState: TaskProgressStatesEnum) {

        this.selectedTaskProgressState = taskProgressState;
        this.loadTasks();

    }

    getFormatedDueDate(dueDate: string): string {

        return moment(dueDate, STORAGE_DATE_TIME_FORMAT).format(DISPLAY_DATE_FORMAT + ' - ' + DISPLAY_TIME_FORMAT);

    }

    openAddTaskModal() {

        const ADD_TASK_MODAL = this.modalController.create({
            component: AddTaskModalComponent,
            componentProps: {
                projectId: this.projectId
            }
        });

        ADD_TASK_MODAL.then((modalElement) => modalElement.present());

    }

    openTaskDetailsModal(taskId: string) {

        const TASK_DETAILS_MODAL = this.modalController.create({
            component: TaskDetailsModalComponent,
            componentProps: {
                id: taskId
            }
        });

        TASK_DETAILS_MODAL.then((modalElement) => modalElement.present());

    }

}
