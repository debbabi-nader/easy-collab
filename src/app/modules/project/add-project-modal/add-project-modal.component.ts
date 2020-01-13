import { Project } from './../../../models/project.model';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ProjectsService } from './../../../services/projects.service';
import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { User } from './../../../models/user.model';
import { Storage } from '@ionic/storage';
import { STORAGE_DATE_TIME_FORMAT } from '../../../constants/date-formats.constant';
import * as moment from 'moment';
@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {

     id: string;
     label?: string;
     abstract?: string;
     description?: string;
     ownerId?: string;
     creationDate?: string;
     currentUser: User = new User();

     constructor(
      private serviceprojet: ProjectsService,
      private modalController: ModalController,
      private storage: Storage,
      private navParams: NavParams
       ) {}

       ngOnInit() {
        this.id = this.navParams.get('id');
        this.storage.get(CURRENT_USER_KEY).then(
          currentUser => this.currentUser = currentUser
        );
      }


      Creerproject() {
        let project: Project = new Project();
    
        project["label"] = this.label;
        project["description"] = this.description;
        project["ownerId"] = this.currentUser.id;
        project["creationDate"] = moment().format(STORAGE_DATE_TIME_FORMAT);
        project["abstract"] = null;
        this.serviceprojet.addProject(project).then(
          () => {
            this.closeModal();
          }
        );
    
      }

  closeModal() {

    this.modalController.dismiss();

}

}
