import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';
import { CollaborationsService } from './services/collaborations.service';
import { ConversationsService } from './services/conversations.service';
import { MessagesService } from './services/messages.service';

import { AppComponent } from './app.component';

import { FIREBASE_CONFIG } from './constants/firebase-config.constant';


@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFireAuthGuardModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthenticationService,
        UsersService,
        ProjectsService,
        TasksService,
        CollaborationsService,
        ConversationsService,
        MessagesService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
