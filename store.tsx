import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Order, Restaurant, User } from './types';

interface AppState {
  cart: CartItem[];
  user: User;
  orders: Order[];
  favorites: string[];
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: (restaurantId: string, restaurantName: string) => Promise<string>;
  toggleFavorite: (restaurantId: string) => void;
  cartRestaurantId: string | null; // Ensures cart only has items from one restaurant
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Initialize with a default user immediately
  const [user, setUser] = useState<User>({
    name: 'Foodie Guest',
    email: 'guest@crave.com',
    phone: '+1 555 0199',
    addresses: [{ id: '1', label: 'Home', details: '123 Flavor Street, Foodville' }],
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null);

  const addToCart = (item: MenuItem, restaurantId: string) => {
    if (cartRestaurantId && cartRestaurantId !== restaurantId) {
      if (!window.confirm("Start a new basket? Adding food from a new restaurant will clear your current cart.")) {
        return;
      }
      setCart([]);
    }
    setCartRestaurantId(restaurantId);

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  // Cleanup cart id if empty
  useEffect(() => {
    if (cart.length === 0) setCartRestaurantId(null);
  }, [cart]);

  const clearCart = () => {
    setCart([]);
    setCartRestaurantId(null);
  };

  const placeOrder = async (restaurantId: string, restaurantName: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          items: [...cart],
          total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
          status: 'placed',
          date: new Date().toISOString(),
          restaurantId,
          restaurantName,
        };
        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        resolve(newOrder.id);
      }, 1500); // Simulate API delay
    });
  };

  const toggleFavorite = (restaurantId: string) => {
    setFavorites((prev) =>
      prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        user,
        orders,
        favorites,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        toggleFavorite,
        cartRestaurantId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};