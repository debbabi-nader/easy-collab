import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignUpRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';


@NgModule({
    declarations: [
        SignUpPage
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        SignUpRoutingModule
    ]
})
export class SignUpModule {

}
