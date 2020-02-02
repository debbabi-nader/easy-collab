import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { MessagesService } from './messages.service';

import { Conversation } from './../models/conversation.model';
import { Message } from './../models/message.model';


@Injectable()
export class ConversationsService {

    constructor(
        private angularFirestore: AngularFirestore,
        private messagesService: MessagesService
    ) {}

    getConversationById(id: string): Observable<Conversation> {

        return this.angularFirestore.doc<Conversation>('/conversations/' + id).valueChanges();

    }

    getConversations(): Observable<Conversation[]> {

        return this.angularFirestore.collection<Conversation>('/conversations').valueChanges();

    }

    addConversation(conversation: Conversation): Promise<void> {

        conversation.id = this.angularFirestore.createId();

        return this.angularFirestore.doc<Conversation>('/conversations/' + conversation.id).set({ ...conversation }).then(
            () => {
                const MESSAGE: Message = new Message();
                MESSAGE.content = 'Hello!';
                MESSAGE.senderId = conversation.createdBy;
                MESSAGE.sendingDate = conversation.creationDate;
                this.messagesService.addMessage(MESSAGE, conversation.id);
            }
        );

    }

}
