import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectManagerComponent } from './project-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const PROJECT_MANAGER_ROUTES: Routes = [
    {
        path: '',
        component: ProjectManagerComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'projects',
                loadChildren: () => import('../project/project.module').then(m => m.ProjectModule)
            },
            {
                path: 'chat',
                loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
            },
            {
                path: '**',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(PROJECT_MANAGER_ROUTES) ],
    exports: [ RouterModule ]
})
export class ProjectManagerRoutingModule {

}
