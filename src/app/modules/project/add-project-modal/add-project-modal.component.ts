import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ProjectsService } from './../../../services/projects.service';

import { blankValidator } from '../../../utils/validators.util';

import { User } from './../../../models/user.model';
import { Project } from './../../../models/project.model';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { STORAGE_DATE_TIME_FORMAT } from '../../../constants/date-formats.constant';

import * as moment from 'moment';


@Component({
    templateUrl: './add-project-modal.component.html',
    styleUrls: [ './add-project-modal.component.scss' ]
})
export class AddProjectModalComponent {

    addProjectFormGroup: FormGroup = this.formBuilder.group({
        label: [ '', [ Validators.required, Validators.maxLength(120) ], [ blankValidator() ] ],
        abstract: [ '', [ Validators.required, Validators.maxLength(300) ], [ blankValidator() ] ],
        description: [ '', [ Validators.required, Validators.maxLength(900) ], [ blankValidator() ] ]
    });

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private storage: Storage,
        private projectsService: ProjectsService
    ) {}

    onAddProject() {

        this.projectsService.getProjects().subscribe(
            (projects: Project[]) => {
                if (projects.find(project => project.label.toLowerCase() === this.addProjectFormGroup.get('label').value.toLowerCase())) {
                    this.addProjectFormGroup.get('label').setErrors({ notUnique: true });
                } else {
                    this.storage.get(CURRENT_USER_KEY).then(
                        (currentUser: User) => {
                            const project: Project = new Project();
                            project.ownerId = currentUser.id;
                            project.label = this.addProjectFormGroup.get('label').value;
                            project.abstract = this.addProjectFormGroup.get('abstract').value;
                            project.description = this.addProjectFormGroup.get('description').value;
                            project.creationDate = moment().format(STORAGE_DATE_TIME_FORMAT);
                            this.projectsService.addProject(project).then(
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
