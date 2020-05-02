import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/content/cart/cart.component';
import { CartProductComponent } from './components/content/cart/cart-product/cart-product.component';
import { UserFormComponent } from './components/content/cart/user-form/user-form.component';
import { CatalogComponent } from './components/content/catalog/catalog.component';
import { CatalogProductComponent } from './components/content/catalog/catalog-product/catalog-product.component';
import { ProdInfoComponent } from './components/content/catalog/catalog-product/prod-info/prod-info.component';
import { ContactsComponent } from './components/content/contacts/contacts.component';
import { MainPageComponent } from './components/content/main-page/main-page.component';
import {PersonalAccountDialogComponent} from './components/content/personal-account/personal-account.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';

import {DBService} from './services/d-b.service';
import {CookieService} from 'ngx-cookie-service';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbCarousel, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PersonalAccountComponent } from './components/content/personal-account/personal-account.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CartProductComponent,
    UserFormComponent,
    CatalogComponent,
    CatalogProductComponent,
    ProdInfoComponent,
    ContactsComponent,
    MainPageComponent,
    PersonalAccountComponent,
    PersonalAccountDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatSelectModule,
    NgbModule,
    MatPaginatorModule,
  ],
  providers: [DBService,
    HttpClientModule,
    CookieService, MatSnackBar,
    NgbCarousel,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
