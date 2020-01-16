import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { CollaborationProposalService } from './../../../services/collaboration-proposal.service';
import { ProjectsService } from './../../../services/projects.service';

import { User } from './../../../models/user.model';
//import { Collaboration } from './../../../models/collaboration.model';
import { Project } from './../../../models/project.model';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { CollaborationProposal } from 'src/app/models/collaboration-proposal.model';



@Component({
  selector: 'app-collaboration-proposal',
  templateUrl: './collaboration-proposal.component.html',
  styleUrls: ['./collaboration-proposal.component.scss'],
})

export class CollaborationProposalComponent implements OnInit {


  collaborationproposals: CollaborationProposal[] = [];

    constructor(
        private router: Router,
        private storage: Storage,
        private collaborationProposalService: CollaborationProposalService,
        private projectsService: ProjectsService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.collaborationProposalService.getCollaborationsproposalByreceiverId(currentUser.id).subscribe(
                    (collaborationProposals: CollaborationProposal[]) => {
                        collaborationProposals.forEach(
                            (collaborationProposal: CollaborationProposal) => {
                                this.projectsService.getProjectById(collaborationProposal.project.id).subscribe(
                                    (CollaborationProp: CollaborationProposal) => {
                                        this.collaborationproposals.push(CollaborationProp);
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
