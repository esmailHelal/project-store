import { DOCUMENT } from '@angular/common';
import { Component, OnInit,HostBinding,Inject } from '@angular/core';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from 'src/app/services/api.service';
@UntilDestroy()
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',

})
export class AddProductComponent implements OnInit {
  @HostBinding('class')
  get classes(): string {
    return `flex justify-center items-center`
  }
  type:string="Add";
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price:new FormControl('', [Validators.required]),
    category:new FormControl('', [Validators.required]),
  });
  constructor(private apiService:ApiService, private router: Router,private readonly activatedRoute: ActivatedRoute) {
    this.getQueryParams();
   }

  ngOnInit(): void {
  }
  onProductSubmit() {
    
    if (this.productForm.invalid) {
   
      this.productForm.markAllAsTouched();
      return;
    }
   
    this.apiService.addProduct(this.productForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigate([`/products`]);
    })
  }

  getQueryParams() {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params['id']) {
        const id = params['id'];
        this.apiService.getSingleProducts(id).pipe(
          untilDestroyed(this)
        ).subscribe(res=>{
          this.productForm.patchValue({
            title:res.title,
            description:res.description,
            category:res.category,
            price:`${res.price}`,
          })

          this.type="Edit";
        })
      }
    

      
    });
  }
}
