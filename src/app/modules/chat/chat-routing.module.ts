import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';


const CHAT_ROUTES: Routes = [
    {
        path: '',
        component: ChatComponent,
        children: [
            {
                path: '',
                component: ConversationsListComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(CHAT_ROUTES) ],
    exports: [ RouterModule ]
})
export class ChatRoutingModule {

}
