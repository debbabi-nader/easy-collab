import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClientRoutingModule } from './client-routing.module';

import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        ClientComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ClientRoutingModule
    ]
})
export class ClientModule {

}
