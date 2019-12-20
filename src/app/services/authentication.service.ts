import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import { CURRENT_USER_KEY, PROFILE_PICTURE_KEY } from './../constants/storage.constant';


@Injectable()
export class AuthenticationService {

    constructor(
        private angularFireAuth: AngularFireAuth,
        private storage: Storage
    ) {}

    signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {

        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);

    }

    signOut() {

        this.angularFireAuth.auth.signOut();
        this.storage.remove(CURRENT_USER_KEY);
        this.storage.remove(PROFILE_PICTURE_KEY);

    }

    isAuthenticated(): Observable<firebase.User> {

        return this.angularFireAuth.authState;

    }

}
