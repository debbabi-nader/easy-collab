import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { CollaborationProposal } from './../models/collaboration-proposal.model';


@Injectable({
  providedIn: 'root'
})
export class CollaborationProposalService {

     constructor(
        private angularFirestore: AngularFirestore
    ) {}


    getCollaborationproposalByProjectId(id: string): Observable<CollaborationProposal[]> {

        return this.angularFirestore.collection<CollaborationProposal>('/collaborations', ref => ref.where('projectId', '==', id)).valueChanges();

    }

    getCollaborationsproposalBysenderId(id: string): Observable<CollaborationProposal[]> {

        return this.angularFirestore.collection<CollaborationProposal>('/collaborations', ref => ref.where('collaboratorId', '==', id)).valueChanges();

    }
     getCollaborationsproposalByreceiverId(id: string): Observable<CollaborationProposal[]> {

        return this.angularFirestore.collection<CollaborationProposal>('/collaborations', ref => ref.where('collaboratorId', '==', id)).valueChanges();

    }

    addCollaborationproposal(collaboration: CollaborationProposal): Promise<void> {

        return this.angularFirestore.doc<CollaborationProposal>('/collaborations/' + collaboration.project.id+ '_' + collaboration.sender.id).set({ ...collaboration });

    }

}

