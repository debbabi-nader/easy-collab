import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


const REDIRECT_UNAUTHORIZED_TO_SIGN_IN = () => redirectUnauthorizedTo(['sign-in']);
const REDIRECT_AUTHORIZED_TO_APP = () => redirectLoggedInTo(['app']);

const APP_ROUTES: Routes = [
    {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),
        canActivate: [ AngularFireAuthGuard ],
        data: { authGuardPipe: REDIRECT_AUTHORIZED_TO_APP }
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./pages/app-layout/app-layout.module').then(m => m.AppLayoutModule),
        canActivate: [ AngularFireAuthGuard ],
        data: { authGuardPipe: REDIRECT_UNAUTHORIZED_TO_SIGN_IN }
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
