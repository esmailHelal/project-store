import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  passwordHidden:boolean=false

  ngOnInit(): void {
    this.form = this.initForm();
  }
  constructor(private formBuilder: FormBuilder,private _auth: AuthService,private router: Router) {}
  initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required]],
    });
  }
  createAccount(){
    if(this.form.valid){
      console.log(this.form.value)
      if(this.form.value.username === 'user'&&this.form.value.password === 'user'){
        this._auth.setUserData({name:'user',role:'user'});
        this.router.navigateByUrl('products');
      }else if(this.form.value.username === 'admin'&&this.form.value.password === 'admin'){
        this._auth.setUserData({name:'admin',role:'admin'});
        this.router.navigateByUrl('products');
      }
    }
    else{
      this.form.markAllAsTouched();
    }
  }
}
