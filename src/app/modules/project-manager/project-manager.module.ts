import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';

import { ProjectManagerComponent } from './project-manager.component';


@NgModule({
    declarations: [
        ProjectManagerComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ProjectManagerRoutingModule
    ]
})
export class ProjectManagerModule {

}
