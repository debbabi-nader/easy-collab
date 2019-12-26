import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service';

import { Project } from '../../../models/project.model';


@Component({
    templateUrl: './project-view.component.html',
    styleUrls: [ './project-view.component.scss' ]
})
export class ProjectViewComponent implements OnInit {

    project: Project = new Project();

    publicProjectView = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private projectsService: ProjectsService
    ) {}

    ngOnInit() {

        if (!this.publicProjectView) {
            this.router.navigate([ 'dashboard' ], { relativeTo: this.activatedRoute });
        }

        this.activatedRoute.paramMap.subscribe(
            (paramMap: ParamMap) => {
                const PROJECT_ID = paramMap.get('id');
                this.projectsService.getProjectById(PROJECT_ID).subscribe(
                    (project: Project) => {
                        this.project = project;
                        console.log(this.project);
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }
        );

    }

}
