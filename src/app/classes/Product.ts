export interface Product {
  prodId: number;
  name: string;
  price: number;
  prodType: ProductType;
}

export interface ProductType {
  typeId: number;
  name: string;
}
