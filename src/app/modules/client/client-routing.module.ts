import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';


const CLIENT_ROUTES: Routes = [
    {
        path: '',
        component: ClientComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(CLIENT_ROUTES) ],
    exports: [ RouterModule ]
})
export class ClientRoutingModule {

}
