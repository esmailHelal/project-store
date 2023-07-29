import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';
import { ProductListComponent } from './pages/product-list/product-list.page';
import { TableProductsComponent } from './pages/table-products/table-products.component';
import { RoleUserGuard } from '../shared/guards/roleUser.guard';
import { RoleAdminGuard } from '../shared/guards/roleAdmin.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate:[RoleUserGuard]
  },
  {
    path: 'table-products',
    component: TableProductsComponent,
    canActivate:[RoleAdminGuard]
   
  },
  {
    path: 'product-description/:id',
    component: ProductDescriptionComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
