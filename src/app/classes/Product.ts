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
