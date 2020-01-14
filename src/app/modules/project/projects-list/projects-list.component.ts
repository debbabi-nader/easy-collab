import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

import { ProjectsService } from './../../../services/projects.service';

import { AddProjectModalComponent } from './../add-project-modal/add-project-modal.component';

import { User } from './../../../models/user.model';
import { Project } from './../../../models/project.model';

import { ProfileTypesEnum } from 'src/app/enumerations/profile-types.enum';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';


@Component({
    templateUrl: './projects-list.component.html',
    styleUrls: [ './projects-list.component.scss' ]
})
export class ProjectsListComponent implements OnInit {

    isClient = false;

    projects: Project[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storage: Storage,
        private modalController: ModalController,
        private projectsService: ProjectsService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.isClient = currentUser.profileType === ProfileTypesEnum.CLIENT;
                if (!this.isClient) {
                    this.router.navigate([ 'collaboration-projects' ], { relativeTo: this.activatedRoute });
                } else {
                    this.projectsService.getProjectsByOwnerId(currentUser.id).subscribe(
                        (projects: Project[]) => {
                            this.projects = projects;
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                }
            }
        );

    }

    navigateToProjectView(projectId: string) {

        this.router.navigate([ 'project-view', projectId ], { relativeTo: this.activatedRoute });

    }

    openAddProjectModal() {

        const ADD_PROJECT_MODAL = this.modalController.create({
            component: AddProjectModalComponent
        });

        ADD_PROJECT_MODAL.then((modalElement) => modalElement.present());

    }

}
