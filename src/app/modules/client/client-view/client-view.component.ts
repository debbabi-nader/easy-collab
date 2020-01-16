import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { CollaborationProposalService } from '../../../services/collaboration-proposal.service';
import { Project } from '../../../models/project.model';
import { CollaborationProposal } from '../../../models/collaboration-proposal.model';


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
})
export class ClientViewComponent implements OnInit {

   ColProposal: CollaborationProposal = new CollaborationProposal();

    publicclientView = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private CollPropServ: CollaborationProposalService
    ) {}

     ngOnInit() {

        if (!this.publicclientView) {
            this.router.navigate([ 'dashboard' ], { relativeTo: this.activatedRoute });
        }

        this.activatedRoute.paramMap.subscribe(
            (paramMap: ParamMap) => {
                const PROJECT_ID = paramMap.get('id');
                this.CollPropServ.getCollaborationproposalByProjectId(PROJECT_ID).subscribe(
                    () => {
                        console.log(this.ColProposal);
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }
        );

    }

  
}




   

    


