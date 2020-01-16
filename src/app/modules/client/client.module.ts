import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClientRoutingModule } from './client-routing.module';

import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollaborationProposalComponent } from './collaboration-proposal/collaboration-proposal.component';
import { ClientViewComponent } from './client-view/client-view.component';


@NgModule({
    declarations: [
        ClientComponent,
        DashboardComponent,
        CollaborationProposalComponent,
        ClientViewComponent

    ],
    imports: [
        CommonModule,
        IonicModule,
        ClientRoutingModule
    ]
})
export class ClientModule {

}
