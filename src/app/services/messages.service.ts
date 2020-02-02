import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Message } from './../models/message.model';


@Injectable()
export class MessagesService {

    constructor(
        private angularFirestore: AngularFirestore
    ) {}

    getMessagesByConversationId(id: string): Observable<Message[]> {

        return this.angularFirestore.collection<Message>('/conversations/' + id + '/messages').valueChanges();

    }

    addMessage(message: Message, conversationId: string): Promise<void> {

        message.id = this.angularFirestore.createId();

        return this.angularFirestore.doc<Message>('/conversations/' + conversationId + '/messages/' + message.id).set({ ...message });

    }

}
