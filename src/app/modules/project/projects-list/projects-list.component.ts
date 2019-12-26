import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: './projects-list.component.html',
    styleUrls: [ './projects-list.component.scss' ]
})
export class ProjectsListComponent {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    navigateToProjectDetails() {

        this.router.navigate([ 'project-view', 'IIPPFyt1kMMocjgOBIsJ' ], { relativeTo: this.activatedRoute });

    }

}
