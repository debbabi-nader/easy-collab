import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ProjectTeamComponent } from './project-team/project-team.component';


const PROJECT_ROUTES: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: '',
                component: ProjectsListComponent
            },
            {
                path: 'project-details/:id',
                component: ProjectDetailsComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: ProjectDashboardComponent
                    },
                    {
                        path: 'tasks',
                        component: ProjectTasksComponent
                    },
                    {
                        path: 'team',
                        component: ProjectTeamComponent
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(PROJECT_ROUTES) ],
    exports: [ RouterModule ]
})
export class ProjectRoutingModule {

}
