import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeveloperComponent } from './developer.component';


const DEVELOPER_ROUTES: Routes = [
    {
        path: '',
        component: DeveloperComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(DEVELOPER_ROUTES) ],
    exports: [ RouterModule ]
})
export class DeveloperRoutingModule {

}
