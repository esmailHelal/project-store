import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { NoAuthGuard } from './shared/guards/noauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
  path: 'products',
  loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
  canActivate:[AuthGuard]
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  canActivate:[NoAuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
