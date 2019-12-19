import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SignUpRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';


@NgModule({
    declarations: [
        SignUpPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        SignUpRoutingModule
    ]
})
export class SignUpModule {

}
