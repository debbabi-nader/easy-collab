import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChatRoutingModule } from './chat-routing.module';

import { ChatComponent } from './chat.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { AddConversationModalComponent } from './add-conversation-modal/add-conversation-modal.component';
import { ChatModalComponent } from './chat-modal/chat-modal.component';


@NgModule({
    declarations: [
        ChatComponent,
        ConversationsListComponent,
        AddConversationModalComponent,
        ChatModalComponent
    ],
    entryComponents: [
        AddConversationModalComponent,
        ChatModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        ChatRoutingModule
    ]
})
export class ChatModule {

}
