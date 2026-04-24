import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  private readonly productsState = signal<Product[]>([]);

  readonly products = this.productsState.asReadonly();

  addProducts(items: Product[]): void {
    if (!items.length) {
      return;
    }

    const byId = new Map<number, Product>(this.productsState().map((product) => [product.id, product]));
    for (const item of items) {
      byId.set(item.id, item);
    }

    this.productsState.set(Array.from(byId.values()));
  }

  removeProduct(id: number): void {
    this.productsState.update((products) => products.filter((product) => product.id !== id));
  }

  getProductById(id: number): Product | undefined {
    return this.productsState().find((product) => product.id === id);
  }
}
