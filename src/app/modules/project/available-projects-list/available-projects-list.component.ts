import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { ProjectsService } from './../../../services/projects.service';
import { AddProjectModalComponent } from './../add-project-modal/add-project-modal.component';

import { Project } from './../../../models/project.model';


@Component({
    templateUrl: './available-projects-list.component.html',
    styleUrls: [ './available-projects-list.component.scss' ]
})
export class AvailableProjectsListComponent implements OnInit {

    projects: Project[] = [];

    constructor(
        private router: Router,
        public modalController: ModalController,
        private projectsService: ProjectsService
    ) {}

    ngOnInit() {
        
        this.projectsService.getProjects().subscribe(
            (projects: Project[]) => {
                this.projects = projects;
            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    navigateToProjectView(projectId: string) {

        const URL_PARTS: string[] = this.router.url.split('/');
        URL_PARTS[URL_PARTS.length - 1] = 'project-view';
        URL_PARTS.push(projectId);
        this.router.navigateByUrl(URL_PARTS.join('/'));

    }

    async createProject() {
        console.log("button clicked!")
        const modal = await this.modalController.create({
          component: AddProjectModalComponent,
          componentProps: {}
        });
        return await modal.present();
      }

    removeProject(projectId) {
        this.projectsService.deleteProject(projectId);
      }

     
}
