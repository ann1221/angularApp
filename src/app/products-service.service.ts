import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {
  constructor() {
  }
  private CATALOG: Bouquet[] = [];
  private bouquetInOrder: BouquetInOrder[] = [];

  private counter = 0;

  public SetCatalog(bouquets: Bouquet[]) {
    this.CATALOG = bouquets;
  }

  public GetCatalog(): Bouquet[] {
    return this.CATALOG;
  }

  public GetBouquetsInOrder(): BouquetInOrder[] {
    return this.bouquetInOrder;
  }

  private FindInOrder(bouquetId: number): number {
    console.log('bouquetInOrderLength: ' + this.bouquetInOrder.length);
    for (let i = 0; i < this.bouquetInOrder.length; i++) {
      if (this.bouquetInOrder[i].id === bouquetId) {
        return i;
      }
    }
    return null;
  }

  public GetAmountInOrder(bouquetId: number): number {
    console.log(bouquetId);
    const index = this.FindInOrder(bouquetId);
    if ( index === null) {
      return 0;
    } else {
      return this.bouquetInOrder[index].amount;
    }
  }

  public GetBouquetById(bouquetId: number): Bouquet {
    for (const bouquet of this.CATALOG) {
      if (bouquet.bouquet_id.toString() === bouquetId.toString()) {
        return (bouquet);
      }
    }
    return null;
  }


  public  AddToCart(bouquetId: number) {
    const index = this.FindInOrder(bouquetId);
    const inStock = this.GetBouquetById(bouquetId).in_stock;
    if ( index === null) {
      if (inStock >= 1) {
        const bio: BouquetInOrder = { id: bouquetId , amount: 1};
        this.bouquetInOrder.push(bio);
      } else {
        alert('There are no such bouquets in stock');
      }
    } else {
      if (inStock > this.bouquetInOrder[index].amount) {
        this.bouquetInOrder[index].amount += 1;
      } else {
        alert('That\'s all, you are grabbed all bouquets from stock' );
      }
    }
  }

  public  SubtractFromCart(bouquetId: number) {
    const index = this.FindInOrder(bouquetId);
    if ( index === null) {
      alert('Nothing to substract');
    } else {
      if (this.bouquetInOrder[index].amount > 0) {
        this.bouquetInOrder[index].amount -= 1;
        if (this.bouquetInOrder[index].amount === 0) {
          this.bouquetInOrder.splice(index, 1 );
        }
      } else {
        alert('Nothing to substract');
      }
    }
  }

  public SetAmountInOrder(bouquetId: number, value: number) {
    if (this.GetBouquetById(bouquetId).in_stock > value ) {
      const index = this.FindInOrder(bouquetId);
      if ( index === null) {
        const bio: BouquetInOrder = {id: bouquetId, amount: value};
        this.bouquetInOrder.push(bio);
      } else {
        this.bouquetInOrder[index].amount = value;
      }
    }
  }

  public GetBouquetPrice(bouquetId: number) {
    const bouquet = this.GetBouquetById(bouquetId);
    let totalSum = 0;
    for (const prodInBouq of bouquet.productsInBouquet) {
      totalSum += prodInBouq.product.price;
    }
    return totalSum + bouquet.design_price;
  }

}

export interface BouquetInOrder {
  id: number;
  amount: number;
}

export interface Bouquet {
  bouquet_id: number;
  name: string;
  design_price: number;
  pict_url: string;
  description: string;
  productsInBouquet: ProdInBouquet[];
  in_stock: number;
}

export interface ProdInBouquet {
  product: Product;
  amount: number;
}

export interface Product {
  prod_id: number;
  name: string;
  price: number;
  productType: ProductType;
}

export interface ProductType {
  type_id: number;
  name: string;
}
