import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './components/content/main-page/main-page.component';
import {CatalogComponent} from './components/content/catalog/catalog.component';
import {ContactsComponent} from './components/content/contacts/contacts.component';
import {CartComponent} from './components/content/cart/cart.component';
import {ProdInfoComponent} from './components/content/catalog/catalog-product/prod-info/prod-info.component';
import {PersonalAccountComponent} from './components/content/personal-account/personal-account.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'prod/:id', component: ProdInfoComponent},
  {path: 'account', component: PersonalAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
