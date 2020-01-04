import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { User } from './../../../models/user.model';
import { Storage } from '@ionic/storage';

import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { from } from "rxjs";
import { TaskProgressState } from './../../../models/task-progress-state.model';
import { TaskAcceptanceState } from './../../../models/task-acceptance-state.model';
import { TasksService } from './../../../services/tasks.service';
import { Task } from './../../../models/task.model';
import * as moment from 'moment';
import { TaskProgressStatesEnum } from '../../../enumerations/task-progress-states.enum';
import { STORAGE_DATE_TIME_FORMAT } from '../../../constants/date-formats.constant';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent implements OnInit {

  id: string;
  label: string;
  description?: string='';
  projectId?: string;
  dueDate?: string;
  createdBy?: string;
  creationDate?: string;
  assignedTo?: string[] = [];
  progressStates?: TaskProgressState[] = [];
  acceptanceStates?: TaskAcceptanceState[] = [];
  commentsIds?: string[] = [];
  currentUser: User = new User();

    constructor(
           private servicetache: TasksService,
           private modalController: ModalController,
           private storage: Storage,
           private navParams: NavParams
            ) {}


  ngOnInit() {
    this.projectId = this.navParams.get('projectId');
    this.storage.get(CURRENT_USER_KEY).then(
      currentUser => this.currentUser = currentUser
    );
  }

  Creertache() {
    let tache: Task = new Task();

    tache["label"] = this.label;
    tache["description"] = this.description;
    tache["projet"] = this.projectId;
    tache["dueDate"] = this.dueDate;
    tache["createdBy"] = this.currentUser.id;
    tache["creationDate"] = moment().format(STORAGE_DATE_TIME_FORMAT);
    tache["assignedTo"] = [];
    tache["progressStates"] = [
      {
        progressState: TaskProgressStatesEnum.TO_DO,
        progressStateUpdatedBy: this.currentUser.id,
        progressStateUpdateDate: moment().format(STORAGE_DATE_TIME_FORMAT)
      }
    ] ;
    tache["acceptanceStates"] = [];
    tache["commentsIds"] = [] ;
    this.servicetache.addTask(tache).then(
      () => {
        this.closeModal();
      }
    );

  }

  
  closeModal() {

    this.modalController.dismiss();

}


 
}
