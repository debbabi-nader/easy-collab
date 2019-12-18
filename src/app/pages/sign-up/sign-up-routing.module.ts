import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPage } from './sign-up.page';


const SIGN_UP_ROUTES: Routes = [
    {
        path: '',
        component: SignUpPage
    }
];

@NgModule({
    imports: [ RouterModule.forChild(SIGN_UP_ROUTES) ],
    exports: [ RouterModule ]
})
export class SignUpRoutingModule {

}
