export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  originalPrice?: number;
  price: number;
  offerPrice?: {
    quantity: number;
    price: number;
    label: string;
  };
  deliveryPrice: number;
  fabric: string;
  colors: { name: string; hex: string; index?: number }[];
  sizes?: string[];
  includes?: string[];
  image: string;
  images?: string[]; // Optional additional gallery images
  video?: string;    // Optional local or external video URL
  hasMeasurements: boolean; // weight & height for Abaya
  origin?: 'local' | 'turkey';
  badgeText?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  governorate: string;
  productId: string;
  productName: string;
  color: string;
  size?: string;
  height?: string; // for custom abaya
  weight?: string; // for custom abaya
  quantity: number;
  totalPrice: number;
  notes?: string;
  status: 'new' | 'contacted' | 'shipping' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  productName: string;
}
