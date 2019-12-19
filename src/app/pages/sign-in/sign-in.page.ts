import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { customEmailValidator } from '../../utils/validators.util';


@Component({
    templateUrl: './sign-in.page.html',
    styleUrls: [ './sign-in.page.scss' ]
})
export class SignInPage {

    signInFormGroup: FormGroup = this.formBuilder.group({
        email: [ '', Validators.required, customEmailValidator() ],
        password: [ '', Validators.required ]
    });

    constructor(
        private formBuilder: FormBuilder,
        private navController: NavController
    ) {}

    onSignIn() {

        console.log(this.signInFormGroup.value);

    }

    navigateToSignUpPage() {

        this.navController.navigateForward('/sign-up');

    }

}
