export interface Book {
  id: number;
  isbn: string;
  name: string;
  book_price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
  in_cart: boolean;
  quantity: number;
}
