import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { CollaborationProjectsListComponent } from './collaboration-projects-list/collaboration-projects-list.component';
import { AvailableProjectsListComponent } from './available-projects-list/available-projects-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';
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
                component: ProjectsListComponent,
                children: [
                    {
                        path: 'collaboration-projects',
                        component: CollaborationProjectsListComponent
                    },
                    {
                        path: 'available-projects',
                        component: AvailableProjectsListComponent
                    }
                ]
            },
            {
                path: 'project-view/:id',
                component: ProjectViewComponent,
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
