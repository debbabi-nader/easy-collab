import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ProjectsService } from './../../../services/projects.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {

  constructor(
    private serviceprojet: ProjectsService,
    private modalController: ModalController,
    private navParams: NavParams,
    private localNotifications: LocalNotifications
     ) {}

  ngOnInit() {}


  closeModal() {

    this.modalController.dismiss();

}
 single_notification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    });
  }
 
 
  multi_notification() {
    // Schedule multiple notifications
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    }, {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);
  }
 
 
 
  delayed_notification() {
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null
    });
  }

}
