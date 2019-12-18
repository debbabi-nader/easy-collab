import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SignInRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SignInRoutingModule
    ],
    declarations: [
        SignInPage
    ]
})
export class SignInModule {

}
