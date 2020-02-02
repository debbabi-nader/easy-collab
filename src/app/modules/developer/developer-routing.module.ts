import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeveloperComponent } from './developer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const DEVELOPER_ROUTES: Routes = [
    {
        path: '',
        component: DeveloperComponent,
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
    imports: [ RouterModule.forChild(DEVELOPER_ROUTES) ],
    exports: [ RouterModule ]
})
export class DeveloperRoutingModule {

}
