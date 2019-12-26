import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { CollaborationsService } from './../../../services/collaborations.service';
import { ProjectsService } from './../../../services/projects.service';

import { User } from './../../../models/user.model';
import { Collaboration } from './../../../models/collaboration.model';
import { Project } from './../../../models/project.model';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';


@Component({
    templateUrl: './collaboration-projects-list.component.html',
    styleUrls: [ './collaboration-projects-list.component.scss' ]
})
export class CollaborationProjectsListComponent implements OnInit {

    projects: Project[] = [];

    constructor(
        private router: Router,
        private storage: Storage,
        private collaborationsService: CollaborationsService,
        private projectsService: ProjectsService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.collaborationsService.getCollaborationsByCollaboratorId(currentUser.id).subscribe(
                    (collaborations: Collaboration[]) => {
                        collaborations.forEach(
                            (collaboration: Collaboration) => {
                                this.projectsService.getProjectById(collaboration.projectId).subscribe(
                                    (project: Project) => {
                                        this.projects.push(project);
                                    },
                                    (error: any) => {
                                        console.log(error);
                                    }
                                );
                            }
                        );
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }
        );

    }

    navigateToProjectView(projectId: string) {

        const URL_PARTS: string[] = this.router.url.split('/');
        URL_PARTS[URL_PARTS.length - 1] = 'project-view';
        URL_PARTS.push(projectId);
        this.router.navigateByUrl(URL_PARTS.join('/'));

    }

}
