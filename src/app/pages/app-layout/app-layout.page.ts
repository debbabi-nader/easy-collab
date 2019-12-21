import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

import { User } from './../../models/user.model';
import { MenuListItem } from './../../models/menu-list-item.model';

import { ProfileTypesEnum } from './../../enumerations/profile-types.enum';

import { CURRENT_USER_KEY } from './../../constants/storage.constant';
import { PROJECT_MANAGER_MAIN_MENU_LIST_ITEMS, DEVELOPER_MAIN_MENU_LIST_ITEMS, CLIENT_MAIN_MENU_LIST_ITEMS } from './../../constants/menu-list-items.constant';


@Component({
    templateUrl: './app-layout.page.html',
    styleUrls: [ './app-layout.page.scss' ]
})
export class AppLayoutPage {

    currentUser: User = new User();
    mainMenuListItems: MenuListItem[] = [];

    constructor(
        private storage: Storage,
        private menuController: MenuController
    ) {}

    ionViewWillEnter() {

        this.storage.get(CURRENT_USER_KEY).then(
            (currentUser: User) => {
                this.currentUser = currentUser;
                this.setMainMenuListItems(this.currentUser.profileType);
            }
        );

    }

    private setMainMenuListItems(profileType: ProfileTypesEnum) {

        switch (profileType) {
            case ProfileTypesEnum.PROJECT_MANAGER:
                this.mainMenuListItems = PROJECT_MANAGER_MAIN_MENU_LIST_ITEMS.slice(0);
                break;
            case ProfileTypesEnum.DEVELOPER:
                this.mainMenuListItems = DEVELOPER_MAIN_MENU_LIST_ITEMS.slice(0);
                break;
            case ProfileTypesEnum.CLIENT:
                this.mainMenuListItems = CLIENT_MAIN_MENU_LIST_ITEMS.slice(0);
                break;
        }

    }

    toggleMainMenu() {

        this.menuController.toggle('main-menu');

    }

}
