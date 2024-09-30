import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        cartId: number;
        // Add other user properties as needed
      };
    }
  }
}

export interface Database {
  product: ProductTable;
}

// #region Product Table
export interface ProductTable {
  id: Generated<number>;
  name: string;
  price: number;
  description: string;
  image: string;
  slug: string;
  imageUrl: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export type Product = Selectable<ProductTable>;
export type NewProduct = Insertable<ProductTable>;
export type ProductUpdate = Updateable<ProductTable>;
// #endregion
