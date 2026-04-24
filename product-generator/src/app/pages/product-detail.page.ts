import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductStoreService } from '../state/product-store.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink],
  template: `
    <section class="page">
      <h2>Product Details</h2>
      <p class="intro">Viewing product ID: <strong>{{ productId }}</strong></p>

      @if (product) {
        <div class="details-card">
          <img [src]="product.imageUrl" [alt]="product.name" loading="lazy" />
          <p><strong>Name:</strong> {{ product.name }}</p>
          <p><strong>SKU:</strong> {{ product.sku }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Price:</strong> $ {{ product.price }}</p>
          <p><strong>Quantity:</strong> {{ product.quantity }}</p>
          <p><strong>Retired:</strong> {{ product.retired ? 'Yes' : 'No' }}</p>
          <p><strong>Hidden:</strong> {{ product.hidden ? 'Yes' : 'No' }}</p>
          <p><strong>Featured:</strong> {{ product.featured ? 'Yes' : 'No' }}</p>
          <p><strong>On Sale:</strong> {{ product.onSale ? 'Yes' : 'No' }}</p>
          <p><strong>Discount:</strong> {{ product.discountPercentage ?? 0 }}%</p>
          @if (product.description) {
            <p><strong>Description:</strong> {{ product.description }}</p>
          }
          @if (product.files?.length) {
            <p><strong>Files:</strong> {{ product.files?.length ?? 0 }}</p>
          }
        </div>
      } @else {
        <div class="details-card">
          <p>Product not found.</p>
        </div>
      }

      <a routerLink="/products">Back to Products</a>
    </section>
  `,
  styles: `
    .page h2 {
      margin-top: 0;
    }

    .intro {
      color: #5b6473;
    }

    .details-card {
      margin: 1rem 0;
      background: #ffffff;
      border: 1px solid #d8dce3;
      border-radius: 12px;
      padding: 1rem;
    }

    .details-card img {
      width: 100%;
      max-width: 420px;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border: 1px solid #e5e8ee;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .details-card p {
      margin: 0.45rem 0;
    }

    a {
      text-decoration: none;
      color: #0b6ef6;
      font-weight: 600;
    }
  `
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productStore = inject(ProductStoreService);

  protected readonly productId = this.route.snapshot.paramMap.get('id') ?? 'unknown';

  protected readonly product: Product | undefined = this.productStore.getProductById(Number(this.productId));
}
