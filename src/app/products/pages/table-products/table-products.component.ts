import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { productData } from '../../model/products-model';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
@UntilDestroy()
@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html'
})
export class TableProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['Id','Title', 'Category', 'Description', 'Price','Rating','Action'];
  dataSource = new MatTableDataSource<productData>([]);
  length:number=20;
  pageSize:number=10;
  readonly pageSizes = [10];
  spinner = true;
  
  constructor(private apiService:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(limit:number=10,skip:number=0){
    this.dataSource.data=[];
    this.spinner = true;
    
      this.apiService.getProductsWithLImit(limit,skip).pipe(
        finalize(() => {
          this.spinner = false;
        }),
        untilDestroyed(this)
      ).subscribe(res=>{
        if(limit>10){
          this.dataSource.data=res.splice(skip,limit);
        }else{
          this.dataSource.data=res;

        }
      },error=>{
        this.dataSource.data =[];
      });
  
  
  }
  pageChange(pageEvent:PageEvent){
    this.getProduct(this.pageSize*(pageEvent.pageIndex+1),this.pageSize*pageEvent.pageIndex);
  }

  addProduct(){
    this.router.navigate([`/products/add-product`]);
    //
  }
  deleteElement(id:number){
    this.apiService.deleteProduct(id).subscribe(()=>{
     this.paginator.firstPage();
     this.getProduct();
    })
  }

  editProduct(id:number){
    this.router.navigate([`/products/add-product`], {
      queryParams: {id} ,
      queryParamsHandling: 'merge',
    });
    //
  }
}
