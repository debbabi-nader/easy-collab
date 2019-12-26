import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Collaboration } from './../models/collaboration.model';


@Injectable()
export class CollaborationsService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getCollaborationsByProjectId(id: string): Observable<Collaboration[]> {

        return this.angularFirestore.collection<Collaboration>('/collaborations', ref => ref.where('projectId', '==', id)).valueChanges();

    }

    getCollaborationsByCollaboratorId(id: string): Observable<Collaboration[]> {

        return this.angularFirestore.collection<Collaboration>('/collaborations', ref => ref.where('collaboratorId', '==', id)).valueChanges();

    }

    addCollaboration(collaboration: Collaboration): Promise<void> {

        return this.angularFirestore.doc<Collaboration>('/collaborations/' + collaboration.projectId + '_' + collaboration.collaboratorId).set({ ...collaboration });

    }

}
