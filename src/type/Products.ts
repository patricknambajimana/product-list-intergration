export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
  stock?: string;
  quantity?: string;
  total?:number
  weight?:number
  discountPercentage?:number
}
export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: Cart[];
  total?: number;
  skip: number;
  limit: number;
}
