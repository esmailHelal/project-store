import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { productData } from '../../model/products-model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
 
})
export class ProductDescriptionComponent implements OnInit {
  product!:productData;
  spinner = true;
  diameter: string | number = '60';
  constructor(  private route: ActivatedRoute,private apiService:ApiService) { }

  ngOnInit(): void {
    this.spinner=true;
    const id = this.route.snapshot.params['id'];
    this.apiService.getSingleProducts(id).pipe(
      finalize(() => {
        this.spinner = false;
      }),
      untilDestroyed(this)
    ).subscribe(res=>{
      this.product=res;
    })
    
  }

}
