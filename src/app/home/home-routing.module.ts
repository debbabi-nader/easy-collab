import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';


const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [ RouterModule.forChild(HOME_ROUTES) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {

}
