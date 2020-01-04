import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ProjectsService } from './../../../services/projects.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {

  constructor(
    private serviceprojet: ProjectsService,
    private modalController: ModalController,
    private navParams: NavParams
     ) {}

  ngOnInit() {}


  closeModal() {

    this.modalController.dismiss();

}

}
