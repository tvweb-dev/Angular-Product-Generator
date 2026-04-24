export interface UploadedFile {
  name: string;
  size: number;
  url: string;
  mimeType: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl: string;
  retired: boolean;
  hidden?: boolean;
  category: string;
  description?: string;
  featured?: boolean;
  onSale?: boolean;
  discountPercentage?: number;
  files?: UploadedFile[];
}
