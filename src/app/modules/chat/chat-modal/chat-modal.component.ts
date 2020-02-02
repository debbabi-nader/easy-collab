import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavParams, ModalController } from '@ionic/angular';

import * as moment from 'moment';

import { ConversationsService } from './../../../services/conversations.service';
import { MessagesService } from './../../../services/messages.service';

import { blankValidator } from './../../../utils/validators.util';

import { User } from './../../../models/user.model';
import { Conversation } from './../../../models/conversation.model';
import { Message } from './../../../models/message.model';

import { CURRENT_USER_KEY } from './../../../constants/storage.constant';
import { STORAGE_DATE_TIME_FORMAT } from './../../../constants/date-formats.constant';


@Component({
    templateUrl: './chat-modal.component.html',
    styleUrls: [ './chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {

    currentUser: User = new User();

    conversationId: string;
    conversation: Conversation = new Conversation();

    messages: Message[] = [];

    sendMessageFormGroup: FormGroup = this.formBuilder.group({
        message: [ '', Validators.required, blankValidator() ]
    });

    constructor(
        private formBuilder: FormBuilder,
        private storage: Storage,
        private navParams: NavParams,
        private modalController: ModalController,
        private conversationsService: ConversationsService,
        private messagesService: MessagesService
    ) {}

    ngOnInit() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.currentUser = currentUser;
            }
        );
        this.conversationId = this.navParams.get('conversationId');
        this.conversationsService.getConversationById(this.conversationId).subscribe(
            (conversation: Conversation) => {
                this.conversation = conversation;
                this.messagesService.getMessagesByConversationId(this.conversationId).subscribe(
                    (messages: Message[]) => {
                        this.messages = messages.sort(
                            (a, b) => moment(a.sendingDate, STORAGE_DATE_TIME_FORMAT).isSameOrBefore(moment(b.sendingDate, STORAGE_DATE_TIME_FORMAT)) ? -1 : 1
                        );
                    },
                    (error: any) => {
                        console.log(error);
                    }
                );
            },
            (error: any) => {
                console.log(error);
            }
        );

    }

    onSendMessage() {

        const MESSAGE: Message = new Message();
        MESSAGE.content = this.sendMessageFormGroup.get('message').value;
        MESSAGE.senderId = this.currentUser.id;
        MESSAGE.sendingDate = moment().format(STORAGE_DATE_TIME_FORMAT);

        this.messagesService.addMessage(MESSAGE, this.conversationId).then(
            () => {
                this.sendMessageFormGroup.reset();
            }
        );

    }

    closeModal() {

        this.modalController.dismiss();

    }

}
