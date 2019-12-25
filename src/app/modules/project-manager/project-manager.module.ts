import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';

import { ProjectManagerComponent } from './project-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        ProjectManagerComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ProjectManagerRoutingModule
    ]
})
export class ProjectManagerModule {

}
