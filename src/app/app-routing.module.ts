import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const APP_ROUTES: Routes = [
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
