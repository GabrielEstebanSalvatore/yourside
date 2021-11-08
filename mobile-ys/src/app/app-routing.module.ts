import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomePageModule)
    },
    {
        path: 'cart',
        loadChildren: () =>
            import('./pages/cart/cart.module').then((m) => m.CartPageModule),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('./pages/signup/signup.module').then((m) => m.SigninPageModule),
    },
    {
        path: 'receipt',
        loadChildren: () => 
            import('./pages/receipt/receipt.module').then( m => m.ReceiptPageModule)
    },
    {
        path: 'cart',
        loadChildren: () => 
            import('./pages/cart/cart.module').then( m => m.CartPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => 
            import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
    },
    {
        path: 'receipt-details',
        loadChildren: () =>
            import('./pages/receipt-details/receipt-details.module').then( m => m.ReceiptDetailsPageModule)
    }


]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
