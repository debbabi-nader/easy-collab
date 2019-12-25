import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: './project-team.component.html',
    styleUrls: [ './project-team.component.scss' ]
})
export class ProjectTeamComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {

        const PROJECT_ID = this.activatedRoute.snapshot.parent.paramMap.get('id');

    }

}
