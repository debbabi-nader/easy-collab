import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppLayoutRoutingModule } from './app-layout-routing.module';

import { AppLayoutPage } from './app-layout.page';


@NgModule({
    declarations: [
        AppLayoutPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        AppLayoutRoutingModule
    ]
})
export class AppLayoutModule {

}
