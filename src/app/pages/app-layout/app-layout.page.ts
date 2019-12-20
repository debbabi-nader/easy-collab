import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
    templateUrl: './app-layout.page.html',
    styleUrls: [ './app-layout.page.scss' ]
})
export class AppLayoutPage {

    constructor(
        private menuController: MenuController
    ) {}

    toggleMainMenu() {

        this.menuController.toggle('main-menu');

    }

}
