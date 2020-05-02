import {ProdInBouq} from './ProdInBouq';

export interface Bouquet {
  bouquetId: number;
  name: string;
  designPrice: number;
  pictUrl: string;
  description: string;
  productsInBouquet: ProdInBouq[];
  in_stock: number;
}
