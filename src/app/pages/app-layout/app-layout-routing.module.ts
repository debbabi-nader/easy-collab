import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutPage } from './app-layout.page';


const APP_LAYOUT_ROUTES: Routes = [
    {
        path: '',
        component: AppLayoutPage,
        children: [
            {
                path: 'project-manager',
                loadChildren: () => import('../../modules/project-manager/project-manager.module').then(m => m.ProjectManagerModule)
            },
            {
                path: 'developer',
                loadChildren: () => import('../../modules/developer/developer.module').then(m => m.DeveloperModule)
            },
            {
                path: 'client',
                loadChildren: () => import('../../modules/client/client.module').then(m => m.ClientModule)
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(APP_LAYOUT_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppLayoutRoutingModule {

}
