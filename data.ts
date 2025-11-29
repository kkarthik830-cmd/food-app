import { Restaurant } from './types';

export const CUISINES = [
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=150&q=80' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=150&q=80' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=150&q=80' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80' },
  { name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=150&q=80' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Symphony',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    deliveryTime: '30-35 min',
    priceForTwo: 400,
    cuisine: ['Biryani', 'North Indian', 'Chinese'],
    distance: '2.5 km',
    promoted: true,
    discount: '50% OFF up to $100',
    menu: [
      { id: 'm1', name: 'Hyderabadi Chicken Biryani', description: 'Aromatic rice with tender chicken and spices.', price: 12, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.8, votes: 1240 },
      { id: 'm2', name: 'Paneer Butter Masala', description: 'Cottage cheese in rich tomato gravy.', price: 10, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.5, votes: 850 },
      { id: 'm3', name: 'Garlic Naan', description: 'Soft bread topped with garlic butter.', price: 2, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.6, votes: 500 },
    ]
  },
  {
    id: '2',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
    deliveryTime: '40-45 min',
    priceForTwo: 300,
    cuisine: ['Pizza', 'Italian', 'Fast Food'],
    distance: '4.0 km',
    discount: 'Free Coke',
    menu: [
      { id: 'm4', name: 'Pepperoni Feast', description: 'Loaded with extra cheese and pepperoni.', price: 15, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.7, votes: 900 },
      { id: 'm5', name: 'Veggie Supreme', description: 'Onions, capsicum, mushroom, corn.', price: 13, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.3, votes: 600 },
    ]
  },
  {
    id: '3',
    name: 'Burger Hub',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    rating: 4.0,
    deliveryTime: '20-25 min',
    priceForTwo: 200,
    cuisine: ['Burger', 'American'],
    distance: '1.2 km',
    menu: [
      { id: 'm6', name: 'Classic Cheeseburger', description: 'Juicy patty with cheddar cheese.', price: 8, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.4, votes: 1100 },
    ]
  },
  {
    id: '4',
    name: 'Sushi World',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    deliveryTime: '50-60 min',
    priceForTwo: 800,
    cuisine: ['Sushi', 'Japanese', 'Asian'],
    distance: '6.5 km',
    promoted: true,
    menu: [
        { id: 'm7', name: 'Salmon Roll', description: 'Fresh salmon with avocado.', price: 18, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd43fb?auto=format&fit=crop&w=300&q=80', isVeg: false, rating: 4.9, votes: 300 },
    ]
  },
  {
    id: '5',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    deliveryTime: '25-30 min',
    priceForTwo: 350,
    cuisine: ['Healthy', 'Salad'],
    distance: '3.0 km',
    menu: [
        { id: 'm8', name: 'Caesar Salad', description: 'Romaine lettuce with croutons.', price: 11, image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=300&q=80', isVeg: true, rating: 4.5, votes: 400 },
    ]
  }
];
