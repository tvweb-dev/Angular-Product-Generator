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
  quantity?: number;
  imageUrl: string;
  retired: boolean;
  hidden?: boolean;
  category: string;
  objectType?: string;
  status?: string;
  owner?: string;
  location?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  zipPostalCode?: string;
  country?: string;
  referenceCode?: string;
  priority?: number;
  confidenceScore?: number;
  notes?: string;
  brand?: string;
  manufacturer?: string;
  material?: string;
  weightKg?: number;
  weightLb?: number;
  weightG?: number;
  rating?: number;
  warrantyMonths?: number;
  description?: string;
  featured?: boolean;
  onSale?: boolean;
  freeShipping?: boolean;
  taxable?: boolean;
  requiresAssembly?: boolean;
  digitalDownload?: boolean;
  includeAddToCartButton?: boolean;
  discountPercentage?: number;
  files?: UploadedFile[];
}
