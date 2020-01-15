import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollaborationsService } from './../../../services/collaborations.service';
import { UsersService } from './../../../services/users.service';

import { Collaboration } from './../../../models/collaboration.model';
import { User } from './../../../models/user.model';

import { ProfileTypesEnum } from 'src/app/enumerations/profile-types.enum';


@Component({
    templateUrl: './project-team.component.html',
    styleUrls: [ './project-team.component.scss' ]
})
export class ProjectTeamComponent implements OnInit {

    projectId: string;

    projectManagerProfileType: ProfileTypesEnum = ProfileTypesEnum.PROJECT_MANAGER;
    developerProfileType: ProfileTypesEnum = ProfileTypesEnum.DEVELOPER;
    selectedCollaboratorsProfileType: ProfileTypesEnum = this.projectManagerProfileType;

    collaborators: User[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private collaborationsService: CollaborationsService,
        private usersService: UsersService
    ) {}

    ngOnInit() {

        this.projectId = this.activatedRoute.snapshot.parent.paramMap.get('id');
        this.loadCollaborators();

    }

    loadCollaborators() {

        this.collaborationsService.getCollaborationsByProjectId(this.projectId).subscribe(
            (collaborations: Collaboration[]) => {
                const collaborators = [];
                collaborations.forEach((collaboration) => {
                    this.usersService.getUserById(collaboration.collaboratorId).subscribe(
                        (user: User) => {
                            if (user.profileType === this.selectedCollaboratorsProfileType) {
                                collaborators.push(user);
                            }
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                });
                this.collaborators = collaborators;
            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    onCollaboratorsProfileTypeSelect(collaboratorsProfileType: ProfileTypesEnum) {

        this.selectedCollaboratorsProfileType = collaboratorsProfileType;
        this.loadCollaborators();

    }

}
