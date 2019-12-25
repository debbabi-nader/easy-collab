import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { TasksService } from './../../../services/tasks.service';

import { Task } from './../../../models/task.model';


@Component({
    templateUrl: './task-details-modal.component.html',
    styleUrls: [ './task-details-modal.component.scss' ]
})
export class TaskDetailsModalComponent implements OnInit {

    task: Task = new Task();

    constructor(
        private navParams: NavParams,
        private modalController: ModalController,
        private tasksService: TasksService
    ) {}

    ngOnInit() {

        this.tasksService.getTaskById(this.navParams.get('id')).subscribe(
            (task: Task) => {
                this.task = task;
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
