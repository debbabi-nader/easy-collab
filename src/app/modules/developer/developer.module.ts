import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DeveloperRoutingModule } from './developer-routing.module';

import { DeveloperComponent } from './developer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        DeveloperComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        DeveloperRoutingModule
    ]
})
export class DeveloperModule {

}
