import { Component, OnInit,HostBinding } from '@angular/core';
import { FormGroup ,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Category, productData } from '../../model/products-model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html'
  
})
export class ProductListComponent implements OnInit {

  products:Array<productData>=[];
  categories:Array<Category>=[];
  spinner = true;
  diameter: string | number = '60';
   
  constructor(private apiService:ApiService, private router: Router) { }

  ngOnInit(): void {
   this.getProduct();
   this.getCategories();
  }

  getProduct(category:string|null=null){
    this.products=[];
    this.spinner = true;
    if(category){
      this.apiService.getProductsWithCategory(category).pipe(
        finalize(() => {
          this.spinner = false;
        }),
        untilDestroyed(this)
      ).subscribe(res=>{
        this.products=res;
      },error=>{
        this.products =[];
      });
    }else{
      this.apiService.getProducts().pipe(
        finalize(() => {
          this.spinner = false;
        }),
        untilDestroyed(this)
      ).subscribe(res=>{
        this.products=res;
      },error=>{
        this.products =[];
      });
  
    }
  }

  getCategories(){
   
    this.apiService.getCategories().subscribe(res=>{
      this.categories=res.map((item)=>{
       return {
        name:item,
        active:false
       }
      });
    },error=>{
      this.categories =[];
    })
  }

 
  showDetails(id:number){
    this.router.navigate([`/products/product-description/${id}`]);
    //
  }
  clickCategory(item:Category,index:number){
    item.active = !item.active;
    this.categories.forEach((element,i) => {
        if(i != index){
          element.active=false;
        }
    });
    this.getProduct(item.name);
  }

}
