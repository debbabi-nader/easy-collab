import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: './project-dashboard.component.html',
    styleUrls: [ './project-dashboard.component.scss' ]
})
export class ProjectDashboardComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {

        const PROJECT_ID = this.activatedRoute.snapshot.parent.paramMap.get('id');

    }

}
