import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectRoutingModule } from './project-routing.module';

import { ProjectComponent } from './project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { CollaborationProjectsListComponent } from './collaboration-projects-list/collaboration-projects-list.component';
import { AvailableProjectsListComponent } from './available-projects-list/available-projects-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { TaskDetailsModalComponent } from './task-details-modal/task-details-modal.component';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';

@NgModule({
    declarations: [
        ProjectComponent,
        ProjectsListComponent,
        CollaborationProjectsListComponent,
        AvailableProjectsListComponent,
        ProjectViewComponent,
        ProjectDashboardComponent,
        ProjectTasksComponent,
        ProjectTeamComponent,
        TaskDetailsModalComponent,
        AddTaskModalComponent,
        AddProjectModalComponent,
        ProjectDashboardComponent
    ],
    entryComponents: [
        TaskDetailsModalComponent,
        AddTaskModalComponent,
        AddProjectModalComponent,
        ProjectDashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ProjectRoutingModule
    ]
})
export class ProjectModule {

}
