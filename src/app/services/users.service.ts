import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { User } from './../models/user.model';


@Injectable()
export class UsersService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getUserById(id: string): Observable<User> {

        return this.angularFirestore.doc<User>('/users/' + id).valueChanges();

    }

    addUser(user: User): Promise<void> {

        return this.angularFirestore.doc<User>('/users/' + user.id).set({ ...user });

    }

}
