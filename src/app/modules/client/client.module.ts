import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClientRoutingModule } from './client-routing.module';

import { ClientComponent } from './client.component';


@NgModule({
    declarations: [
        ClientComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ClientRoutingModule
    ]
})
export class ClientModule {

}
