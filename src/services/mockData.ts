import { Category, Product, User } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Miscellaneous',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Majestic Vintage Graphic Hoodie',
    price: 68,
    description: 'Elevate your casual wardrobe with this ultra-soft organic cotton hoodie featuring a bespoke vintage wash and ribbed trim.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[0],
    rating: 4.8,
    stock: 24,
  },
  {
    id: 2,
    title: 'Minimalist Wireless Noise-Canceling Headphones',
    price: 189,
    description: 'Immerse in pristine acoustics with custom 40mm beryllium drivers, active hybrid noise cancellation, and 36-hour battery life.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[1],
    rating: 4.9,
    stock: 15,
  },
  {
    id: 3,
    title: 'Mid-Century Scandinavian Oak Lounge Chair',
    price: 349,
    description: 'Handcrafted solid white oak frame with tailored high-density cushions wrapped in textured linen-blend fabric.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[2],
    rating: 4.7,
    stock: 8,
  },
  {
    id: 4,
    title: 'Aerodynamic Performance Running Sneakers',
    price: 135,
    description: 'Engineered breathable mesh upper combined with responsive nitrogen-infused foam midsole for maximum energy return.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[3],
    rating: 4.6,
    stock: 30,
  },
  {
    id: 5,
    title: 'Mechanical Ergonomic RGB Keyboard',
    price: 119,
    description: 'Hot-swappable lubricated mechanical switches with south-facing RGB lighting and aerospace-grade aluminum chassis.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[1],
    rating: 4.9,
    stock: 18,
  },
  {
    id: 6,
    title: 'Handmade Matte Ceramic Espresso Set',
    price: 45,
    description: 'Set of 4 artisan-thrown stoneware espresso cups with speckled natural glaze and matching saucers.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[4],
    rating: 4.5,
    stock: 42,
  },
  {
    id: 7,
    title: 'Tailored Linen Overshirt',
    price: 79,
    description: 'Pre-washed European flax linen button-up with chest patch pockets and horn buttons for effortless year-round layering.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[0],
    rating: 4.7,
    stock: 22,
  },
  {
    id: 8,
    title: 'Smart Ambient Desk Lamp with Wireless Charging',
    price: 89,
    description: 'Circadian rhythm adaptive LED bar with 15W Qi fast charging pad on weighted anodized aluminum base.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[1],
    rating: 4.8,
    stock: 14,
  },
  {
    id: 9,
    title: 'Minimalist Leather Bi-Fold Wallet',
    price: 52,
    description: 'Full-grain vegetable-tanned Italian leather wallet with RFID blocking layer and 8 card slots.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606503808945-8f6dfc282ce6?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[4],
    rating: 4.6,
    stock: 35,
  },
  {
    id: 10,
    title: 'Classic High-Top Suede Court Sneakers',
    price: 110,
    description: 'Premium brushed suede upper with vulcanized gum rubber sole and cushioned OrthoLite insole.',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
    ],
    category: INITIAL_CATEGORIES[3],
    rating: 4.8,
    stock: 19,
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    email: 'john@mail.com',
    name: 'John Doe',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    email: 'maria@mail.com',
    name: 'Maria Garcia',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    email: 'alex@platzi.com',
    name: 'Alex Developer',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
  },
];
