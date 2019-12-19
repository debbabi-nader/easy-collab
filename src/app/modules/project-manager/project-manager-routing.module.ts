import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectManagerComponent } from './project-manager.component';


const PROJECT_MANAGER_ROUTES: Routes = [
    {
        path: '',
        component: ProjectManagerComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(PROJECT_MANAGER_ROUTES) ],
    exports: [ RouterModule ]
})
export class ProjectManagerRoutingModule {

}
