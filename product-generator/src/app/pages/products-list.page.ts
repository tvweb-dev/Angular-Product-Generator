import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductStoreService } from '../state/product-store.service';

@Component({
  selector: 'app-products-list-page',
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="page-head">
        <div>
          <h2>Products</h2>
          <p class="cart-summary">Cart: {{ cartCount }} item{{ cartCount === 1 ? '' : 's' }}</p>
        </div>
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
                <button type="button" class="cart" (click)="toggleCart(product.id)">
                  {{ isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart' }}
                </button>
                <button type="button" class="ghost" (click)="toggleCodeView(product.id)">
                  {{ isCodeVisible(product.id) ? 'Hide Code/CSS' : 'View Code/CSS' }}
                </button>
                <button type="button" class="remove" (click)="removeProduct(product.id)">Remove</button>
              </div>

              @if (isCodeVisible(product.id)) {
                <section class="code-panel">
                  <div class="code-head">
                    <p class="code-label">Card/Product HTML</p>
                    <button type="button" class="copy" (click)="copyText(buildCardTemplateCode(product), 'html')">Copy HTML</button>
                  </div>
                  <pre>{{ buildCardTemplateCode(product) }}</pre>
                  <div class="code-head">
                    <p class="code-label">Card CSS</p>
                    <button type="button" class="copy" (click)="copyText(productCardCssCode, 'css')">Copy CSS</button>
                  </div>
                  <pre>{{ productCardCssCode }}</pre>
                  @if (copyStatusByProductId[product.id]) {
                    <p class="copy-status">{{ copyStatusByProductId[product.id] }}</p>
                  }
                </section>
              }
            </article>
          }
        </div>
      } @else {
        <div class="empty-state">
          <p>No products available yet.</p>
          <a routerLink="/products/new">Create your first product object</a>
        </div>
      }

      <p class="back-link-wrap">
        <a routerLink="/products/new" class="back-link">Back to Objects/Array</a>
      </p>
    </section>
  `,
  styles: `
    .page {
      background: #ffffff;
      border: 1px solid #d9e2ef;
      border-radius: 16px;
      padding: 1rem;
      box-shadow: 0 10px 24px rgba(18, 43, 82, 0.08);
    }

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

    .cart-summary {
      margin: 0.2rem 0 0;
      color: #475569;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .page-head a {
      text-decoration: none;
      border: 1px solid #0b6ef6;
      border-radius: 8px;
      padding: 0.45rem 0.7rem;
      color: #0b6ef6;
      font-weight: 600;
      background: #eef5ff;
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
      border: 1px solid #d9e2ef;
      border-radius: 14px;
      padding: 1rem;
      box-shadow: 0 8px 22px rgba(18, 43, 82, 0.08);
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

    .cart {
      border: 1px solid #a9c8ff;
      background: #edf4ff;
      color: #1f4c91;
      border-radius: 8px;
      padding: 0.35rem 0.65rem;
      font-size: 0.85rem;
      cursor: pointer;
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

    .actions button {
      transition: filter 140ms ease;
    }

    .actions button:hover {
      filter: brightness(0.96);
    }

    .ghost {
      border: 1px solid #ccd6e6;
      background: #ffffff;
      color: #2d4b7a;
      border-radius: 8px;
      padding: 0.35rem 0.65rem;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .code-panel {
      margin-top: 0.75rem;
      border-top: 1px solid #e2e8f0;
      padding-top: 0.75rem;
      display: grid;
      gap: 0.45rem;
    }

    .code-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .code-label {
      margin: 0;
      color: #334155;
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .copy {
      border: 1px solid #ccd6e6;
      background: #ffffff;
      color: #2d4b7a;
      border-radius: 8px;
      padding: 0.3rem 0.55rem;
      font-size: 0.78rem;
      cursor: pointer;
    }

    .copy-status {
      margin: 0;
      color: #245db5;
      font-size: 0.82rem;
      font-weight: 600;
    }

    pre {
      margin: 0;
      background: #f6f8fc;
      border: 1px solid #e3e8f2;
      border-radius: 8px;
      padding: 0.6rem;
      overflow-x: auto;
      font-size: 0.8rem;
      line-height: 1.4;
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

    .back-link-wrap {
      margin: 1rem 0 0;
    }

    .back-link {
      text-decoration: none;
      color: #0b6ef6;
      font-weight: 600;
    }

    @media (max-width: 700px) {
      .page {
        padding: 0.85rem;
      }

      .page-head {
        flex-direction: column;
        align-items: flex-start;
      }

      .actions {
        flex-direction: column;
        align-items: stretch;
      }

      .actions a,
      .actions button {
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .card {
        padding: 0.8rem;
      }

      .page-head a {
        width: 100%;
        text-align: center;
      }
    }
  `
})
export class ProductsListPage {
  private readonly productStore = inject(ProductStoreService);
  private expandedCodeProductId: number | null = null;
  private readonly cartProductIds = new Set<number>();
  private readonly copyStatusTimeoutByProductId = new Map<number, ReturnType<typeof setTimeout>>();

  protected readonly copyStatusByProductId: Record<number, string> = {};

  protected readonly productCardCssCode = `.page {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 16px;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 8px 22px rgba(18, 43, 82, 0.08);
  font-family: "Segoe UI", Arial, sans-serif;
  color: #10213a;
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
  font-size: 1.05rem;
}

.sku {
  color: #5b6473;
  font-family: Consolas, "Courier New", monospace;
  font-size: 0.85rem;
}

.price {
  color: #111827;
  font-weight: 700;
}

.tag {
  display: inline-block;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
  background: #ecf3ff;
  color: #245db5;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.55rem;
}

.actions a,
.actions button {
  border-radius: 8px;
  padding: 0.35rem 0.65rem;
  font-size: 0.85rem;
}

.cart {
  border: 1px solid #a9c8ff;
  background: #edf4ff;
  color: #1f4c91;
}

.ghost {
  border: 1px solid #ccd6e6;
  background: #ffffff;
  color: #2d4b7a;
}

.remove {
  border: 1px solid #f1b7bb;
  background: #fff4f5;
  color: #a52a2f;
}`;

  protected readonly products = this.productStore.products;

  protected get cartCount(): number {
    return this.cartProductIds.size;
  }

  protected toggleCodeView(productId: number): void {
    this.expandedCodeProductId = this.expandedCodeProductId === productId ? null : productId;
  }

  protected isCodeVisible(productId: number): boolean {
    return this.expandedCodeProductId === productId;
  }

  protected toggleCart(productId: number): void {
    if (this.cartProductIds.has(productId)) {
      this.cartProductIds.delete(productId);
      return;
    }

    this.cartProductIds.add(productId);
  }

  protected isInCart(productId: number): boolean {
    return this.cartProductIds.has(productId);
  }

  protected buildCardTemplateCode(product: Product): string {
    const lines: string[] = [
      `<section class="page">`,
      `  <div class="grid">`,
      `<article class="card">`,
      `  <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" />`,
      `  <h3>${product.name}</h3>`,
      `  <p class="sku">SKU: ${product.sku}</p>`,
      `  <p>${product.category}</p>`,
      `  <p class="price">$ ${product.price}</p>`,
      `  <p>Qty: ${product.quantity}</p>`,
      `  <p>Retired: ${product.retired ? 'Yes' : 'No'}</p>`
    ];

    if (product.hidden) {
      lines.push(`  <p class="tag">Hidden</p>`);
    }

    if (product.onSale && product.discountPercentage) {
      lines.push(`  <p class="tag">On sale: ${product.discountPercentage}% off</p>`);
    }

    lines.push(`  <div class="actions">`);
    lines.push(`    <a href="#">View Details</a>`);
    lines.push(`    <button type="button" class="cart">Add to Cart</button>`);
    lines.push(`    <button type="button" class="ghost">View Code/CSS</button>`);
    lines.push(`    <button type="button" class="remove">Remove</button>`);
    lines.push(`  </div>`);

    lines.push(`</article>`);
    lines.push(`  </div>`);
    lines.push(`</section>`);
    return lines.join('\n');
  }

  protected async copyText(value: string, type: 'html' | 'css'): Promise<void> {
    if (this.expandedCodeProductId === null) {
      return;
    }

    const productId = this.expandedCodeProductId;

    try {
      await navigator.clipboard.writeText(value);
      this.copyStatusByProductId[productId] = `${type.toUpperCase()} copied.`;
    } catch {
      this.copyStatusByProductId[productId] = `Could not copy ${type.toUpperCase()}.`;
    }

    const existingTimeout = this.copyStatusTimeoutByProductId.get(productId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeout = setTimeout(() => {
      delete this.copyStatusByProductId[productId];
      this.copyStatusTimeoutByProductId.delete(productId);
    }, 2000);

    this.copyStatusTimeoutByProductId.set(productId, timeout);
  }

  protected removeProduct(id: number): void {
    this.productStore.removeProduct(id);
    this.cartProductIds.delete(id);
    if (this.expandedCodeProductId === id) {
      this.expandedCodeProductId = null;
    }
  }
}
