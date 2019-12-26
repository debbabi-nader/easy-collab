import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from './../../../services/projects.service';

import { Project } from './../../../models/project.model';


@Component({
    templateUrl: './available-projects-list.component.html',
    styleUrls: [ './available-projects-list.component.scss' ]
})
export class AvailableProjectsListComponent implements OnInit {

    projects: Project[] = [];

    constructor(
        private router: Router,
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

}
