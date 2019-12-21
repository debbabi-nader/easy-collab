import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from './../../services/authentication.service';
import { UsersService } from './../../services/users.service';

import { customEmailValidator } from '../../utils/validators.util';

import { User } from './../../models/user.model';

import { FirebaseAuthErrorCodesEnum } from './../../enumerations/firebase-auth-error-codes.enum';

import { CURRENT_USER_KEY } from './../../constants/storage.constant';


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
        private navController: NavController,
        private storage: Storage,
        private authenticationService: AuthenticationService,
        private usersService: UsersService
    ) {}

    onSignIn() {

        this.authenticationService.signInWithEmailAndPassword(this.signInFormGroup.get('email').value, this.signInFormGroup.get('password').value).then(
            (result: firebase.auth.UserCredential) => {
                this.usersService.getUserByUid(result.user.uid).subscribe(
                    (user: User) => {
                        this.storage.set(CURRENT_USER_KEY, user);
                        this.navController.navigateForward('/app/' + user.profileType.toLocaleLowerCase().replace('_', '-'));
                    },
                    (error: any) => {
                        console.log('Oups! something went wrong!');
                        console.log(error);
                    }
                );
            }
        ).catch(
            (error: any) => {
                switch (error.code) {
                    case FirebaseAuthErrorCodesEnum.USER_NOT_FOUND:
                        console.log('USER_NOT_FOUND');
                        break;
                    case FirebaseAuthErrorCodesEnum.WRONG_PASSWORD:
                        console.log('WRONG_PASSWORD');
                        break;
                    case FirebaseAuthErrorCodesEnum.USER_DISABLED:
                        console.log('USER_DISABLED');
                        break;
                    default:
                        console.log('Oups! something went wrong!');
                        console.log(error);
                        break;
                }
            }
        );

    }

    navigateToSignUpPage() {

        this.navController.navigateForward('/sign-up');

    }

}
