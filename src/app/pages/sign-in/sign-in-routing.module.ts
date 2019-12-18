import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPage } from './sign-in.page';


const SIGN_IN_ROUTES: Routes = [
    {
        path: '',
        component: SignInPage
    }
];

@NgModule({
    imports: [ RouterModule.forChild(SIGN_IN_ROUTES) ],
    exports: [ RouterModule ]
})
export class SignInRoutingModule {

}
