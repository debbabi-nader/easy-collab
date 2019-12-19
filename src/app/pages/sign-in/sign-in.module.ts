import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignInRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        SignInRoutingModule
    ],
    declarations: [
        SignInPage
    ]
})
export class SignInModule {

}
