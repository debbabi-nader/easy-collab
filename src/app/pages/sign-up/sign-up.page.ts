import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from './../../services/authentication.service';
import { UsersService } from './../../services/users.service';

import { blankValidator, customEmailValidator, passwordStrengthValidator } from '../../utils/validators.util';

import { User } from './../../models/user.model';

import { ProfileTypesEnum } from './../../enumerations/profile-types.enum';
import { FirebaseAuthErrorCodesEnum } from './../../enumerations/firebase-auth-error-codes.enum';

import { PROFILE_TYPES } from './../../constants/profile-types.constant';
import { CURRENT_USER_KEY } from './../../constants/storage.constant';


@Component({
    templateUrl: './sign-up.page.html',
    styleUrls: [ './sign-up.page.scss' ]
})
export class SignUpPage {

    profileType: ProfileTypesEnum = null;
    profileTypes: ProfileTypesEnum[] = PROFILE_TYPES.slice(0);

    signUpFormGroup: FormGroup = this.formBuilder.group({
        firstName: [ '', Validators.required, blankValidator() ],
        lastName: [ '', Validators.required, blankValidator() ],
        email: [ '', Validators.required, customEmailValidator() ],
        password: [ '', Validators.required, passwordStrengthValidator() ],
        passwordConfirmation: [ '', Validators.required ]
    });

    isSignedUp = false;

    constructor(
        private formBuilder: FormBuilder,
        private navController: NavController,
        private storage: Storage,
        private authenticationService: AuthenticationService,
        private usersService: UsersService
    ) {}

    ionViewWillEnter() {

        this.authenticationService.signOut();

    }

    onProfileTypeSelected(profileType: ProfileTypesEnum) {

        this.profileType = profileType;

    }

    onSignUp() {

        if (this.signUpFormGroup.get('password').value !== this.signUpFormGroup.get('passwordConfirmation').value) {
            this.signUpFormGroup.get('passwordConfirmation').setErrors({ notIdentical: true });
            return;
        }

        this.authenticationService.signUpWithEmailAndPassword(this.signUpFormGroup.get('email').value, this.signUpFormGroup.get('password').value).then(
            (result: firebase.auth.UserCredential) => {
                const USER: User = new User();
                USER.id = result.user.uid;
                USER.email = this.signUpFormGroup.get('email').value;
                USER.profileType = this.profileType;
                USER.firstName = this.signUpFormGroup.get('firstName').value;
                USER.lastName = this.signUpFormGroup.get('lastName').value;
                this.usersService.addUser(USER).then(
                    () => {
                        this.storage.set(CURRENT_USER_KEY, USER);
                        this.isSignedUp = true;
                    }
                ).catch(
                    (error: any) => {
                        console.log('Oups! something went wrong!');
                        console.log(error);
                    }
                );
            }
        ).catch(
            (error: any) => {
                switch (error.code) {
                    case FirebaseAuthErrorCodesEnum.EMAIL_ALREADY_IN_USE:
                        this.signUpFormGroup.get('email').setErrors({ usedEmailAddress: true });
                        this.signUpFormGroup.get('password').reset();
                        this.signUpFormGroup.get('passwordConfirmation').reset();
                        break;
                    default:
                        console.log('Oups! something went wrong!');
                        console.log(error);
                        break;
                }
            }
        );

    }

    navigateToSignInPage() {

        this.navController.navigateBack('/sign-in');

    }

    navigateToCurrentUserHomePage() {

        this.navController.navigateForward('/app/' + this.profileType.toLocaleLowerCase().replace('_', '-'));

    }

}
