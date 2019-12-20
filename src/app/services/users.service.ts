import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { User } from './../models/user.model';


@Injectable()
export class UsersService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getUserByUid(uid: string): Observable<User> {

        return this.angularFirestore.doc<User>('/users/' + uid).valueChanges();

    }

}
