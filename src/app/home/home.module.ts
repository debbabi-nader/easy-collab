import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomeRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HomeRoutingModule
    ],
    declarations: [
        HomePage
    ]
})
export class HomePageModule {

}
