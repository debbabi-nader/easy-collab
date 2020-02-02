import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

import * as moment from 'moment';

import { ConversationsService } from './../../../services/conversations.service';
import { MessagesService } from './../../../services/messages.service';

import { AddConversationModalComponent } from './../add-conversation-modal/add-conversation-modal.component';
import { ChatModalComponent } from './../chat-modal/chat-modal.component';

import { User } from './../../../models/user.model';
import { Conversation } from './../../../models/conversation.model';
import { Message } from './../../../models/message.model';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { STORAGE_DATE_TIME_FORMAT } from './../../../constants/date-formats.constant';


@Component({
    templateUrl: './conversations-list.component.html',
    styleUrls: [ './conversations-list.component.scss' ]
})
export class ConversationsListComponent implements OnInit {

    conversations: Conversation[] = [];

    constructor(
        private modalController: ModalController,
        private storage: Storage,
        private conversationsService: ConversationsService,
        private messagesService: MessagesService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.conversationsService.getConversations().subscribe(
                    (conversations: Conversation[]) => {
                        conversations.forEach((conversation: Conversation) => {
                            if (conversation.partiesIds.findIndex((id: string) => id === currentUser.id) !== -1) {
                                this.messagesService.getMessagesByConversationId(conversation.id).subscribe(
                                    (messages: Message[]) => {
                                        messages.sort(
                                            (a, b) => moment(a.sendingDate, STORAGE_DATE_TIME_FORMAT).isSameOrBefore(moment(b.sendingDate, STORAGE_DATE_TIME_FORMAT)) ? 1 : -1
                                        );
                                        conversation.lastMessage = messages[0];
                                        this.conversations.push(conversation);
                                    },
                                    (error: any) => {
                                        console.log(error);
                                    }
                                );
                            }
                        });
                        this.conversations.sort(
                            (a, b) => moment(a.creationDate, STORAGE_DATE_TIME_FORMAT).isSameOrBefore(moment(b.creationDate, STORAGE_DATE_TIME_FORMAT)) ? 1 : -1
                        );
                        console.log(this.conversations);
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            }
        );

    }

    openAddConversationModal() {

        const ADD_CONVERSATION_MODAL = this.modalController.create({
            component: AddConversationModalComponent
        });

        ADD_CONVERSATION_MODAL.then((modalElement) => modalElement.present());

    }

    openChatModal(index: string) {

        const CHAT_MODAL = this.modalController.create({
            component: ChatModalComponent,
            componentProps: {
                conversationId: this.conversations[index].id
            }
        });

        CHAT_MODAL.then((modalElement) => modalElement.present());

    }

}
