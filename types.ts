
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  rating: number;
  votes: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  cuisine: string[];
  distance: string;
  menu: MenuItem[];
  promoted?: boolean;
  discount?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string; // Home, Work
  details: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export type PaymentMethod = 'Google Pay' | 'PhonePe' | 'UPI' | 'Cash on Delivery';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  restaurantId: string;
  restaurantName: string;
  scheduledFor?: string;
  paymentMethod: PaymentMethod;
}
