import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {  Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  namedType = 'EN';
  currentlang: string;
  constructor(private readonly router: Router, private _auth: AuthService, @Inject(DOCUMENT) private document: any,public translate: TranslateService) {
    this.currentlang = localStorage.getItem('currentLang') || 'en';
    this.namedType = this.currentlang === 'en' ? 'AR': 'EN'
    this.translate.use(this.currentlang);
    let htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.currentlang === 'ar' ? 'rtl' : 'ltr';
  }

  logout() {
    this._auth.removeUserData();
    this.router.navigateByUrl('/auth');
  }


  changeLenguage() {
    const lang = this.currentlang === 'ar' ? 'en' : 'ar';
    
    let htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.translate.use(lang);
    localStorage.setItem('currentLang', lang);
    this.namedType =  lang === 'ar' ? 'EN' : 'AR';
    this.currentlang=lang;
  }

 
}
