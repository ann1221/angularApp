import {ProdInBouquet} from './ProductInBouquet';

export interface Bouquet {
  bouquet_id: number;
  name: string;
  design_price: number;
  pict_url: string;
  description: string;
  productsInBouquet: ProdInBouquet[];
  in_stock: number;
}
