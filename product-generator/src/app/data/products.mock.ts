import { Product } from '../models/product.model';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 101,
    name: 'Wireless Keyboard',
    sku: 'KB-WL-101',
    price: 69,
    quantity: 44,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    retired: false,
    category: 'Accessories',
    description: 'Compact keyboard with multi-device Bluetooth pairing.',
    featured: true,
    onSale: true,
    discountPercentage: 10,
    files: [
      {
        name: 'spec-sheet.pdf',
        size: 198400,
        url: '/assets/docs/keyboard-spec-sheet.pdf',
        mimeType: 'application/pdf'
      }
    ]
  },
  {
    id: 102,
    name: 'Ergonomic Mouse',
    sku: 'MS-ERG-102',
    price: 45,
    quantity: 70,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    retired: false,
    hidden: true,
    category: 'Accessories',
    description: 'Vertical ergonomic mouse designed to reduce wrist fatigue.',
    featured: false,
    onSale: false
  },
  {
    id: 103,
    name: '4K Monitor',
    sku: 'MN-4K-103',
    price: 399,
    quantity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4d1b7d206c7?auto=format&fit=crop&w=800&q=80',
    retired: false,
    category: 'Displays',
    description: '27-inch IPS panel with HDR support and USB-C hub.',
    featured: true,
    onSale: true,
    discountPercentage: 15
  }
];
