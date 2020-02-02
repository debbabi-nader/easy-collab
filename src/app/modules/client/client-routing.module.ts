import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const CLIENT_ROUTES: Routes = [
    {
        path: '',
        component: ClientComponent,
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
    imports: [ RouterModule.forChild(CLIENT_ROUTES) ],
    exports: [ RouterModule ]
})
export class ClientRoutingModule {

}
