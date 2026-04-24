import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductStoreService } from '../state/product-store.service';

@Component({
  selector: 'app-products-list-page',
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="page-head">
        <h2>Products</h2>
        <a routerLink="/products/new">+ Add Product</a>
      </div>

      <p class="intro">Products you create will show up here once connected to your data source.</p>

      @if (products().length) {
        <div class="grid">
          @for (product of products(); track product.id) {
            <article class="card">
              <img [src]="product.imageUrl" [alt]="product.name" loading="lazy" />
              <h3>{{ product.name }}</h3>
              <p class="sku">SKU: {{ product.sku }}</p>
              <p>{{ product.category }}</p>
              <p class="price">$ {{ product.price }}</p>
              <p>Qty: {{ product.quantity }}</p>
              <p>Retired: {{ product.retired ? 'Yes' : 'No' }}</p>
              @if (product.hidden) {
                <p class="tag">Hidden</p>
              }
              @if (product.onSale && product.discountPercentage) {
                <p class="tag">On sale: {{ product.discountPercentage }}% off</p>
              }
              <div class="actions">
                <a [routerLink]="['/products', product.id]">View Details</a>
                <button type="button" class="remove" (click)="removeProduct(product.id)">Remove</button>
              </div>
            </article>
          }
        </div>
      } @else {
        <div class="empty-state">
          <p>No products available yet.</p>
          <a routerLink="/products/new">Create your first product object</a>
        </div>
      }
    </section>
  `,
  styles: `
    .page-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .page-head h2 {
      margin: 0;
    }

    .page-head a {
      text-decoration: none;
      border: 1px solid #0b6ef6;
      border-radius: 8px;
      padding: 0.45rem 0.7rem;
      color: #0b6ef6;
      font-weight: 600;
    }

    .intro {
      margin: 0 0 1rem;
      color: #5b6473;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }

    .card {
      background: #ffffff;
      border: 1px solid #d8dce3;
      border-radius: 12px;
      padding: 1rem;
    }

    .card img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #e5e8ee;
      margin-bottom: 0.6rem;
    }

    .card h3 {
      margin: 0;
    }

    .card p {
      margin: 0.35rem 0;
    }

    .price {
      color: #111827;
      font-weight: 600;
    }

    .sku {
      color: #5b6473;
      font-family: Consolas, 'Courier New', monospace;
      font-size: 0.85rem;
    }

    .tag {
      display: inline-block;
      border-radius: 999px;
      padding: 0.15rem 0.5rem;
      background: #ecf3ff;
      color: #245db5;
      font-size: 0.82rem;
    }

    .card a {
      text-decoration: none;
      color: #0b6ef6;
      font-weight: 600;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-top: 0.55rem;
    }

    .remove {
      border: 1px solid #f1b7bb;
      background: #fff4f5;
      color: #a52a2f;
      border-radius: 8px;
      padding: 0.35rem 0.65rem;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .empty-state {
      border: 1px dashed #ccd6e6;
      border-radius: 12px;
      background: #ffffff;
      padding: 1rem;
      display: grid;
      gap: 0.5rem;
      max-width: 480px;
    }

    .empty-state p {
      margin: 0;
      color: #4b5563;
    }

    .empty-state a {
      text-decoration: none;
      color: #0b6ef6;
      font-weight: 600;
    }
  `
})
export class ProductsListPage {
  private readonly productStore = inject(ProductStoreService);

  protected readonly products = this.productStore.products;

  protected removeProduct(id: number): void {
    this.productStore.removeProduct(id);
  }
}
