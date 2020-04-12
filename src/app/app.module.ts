import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
