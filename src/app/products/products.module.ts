import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableProductsComponent } from './pages/table-products/table-products.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialDesignModule } from 'src/app/shared/materialDesign/material-design.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDescriptionComponent,
    AddProductComponent,
    TableProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MaterialDesignModule,
   
    MatPaginatorModule,
   
  ]
})
export class ProductsModule { }
