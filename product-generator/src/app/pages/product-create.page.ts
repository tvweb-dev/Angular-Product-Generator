import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS_MOCK } from '../data/products.mock';
import { Product } from '../models/product.model';
import { ProductStoreService } from '../state/product-store.service';

@Component({
  selector: 'app-product-create-page',
  imports: [RouterLink],
  template: `
    <section class="page">
      <h2>Create Product Objects</h2>
      <p class="intro">Generate one or many typed product objects, then copy a single object or the full array.</p>

      <form class="form" (submit)="onGenerate($event)" novalidate>
        <label>
          How many products to generate?
          <input
            type="number"
            min="1"
            max="200"
            [value]="countToGenerate"
            (input)="onCountInput($event)"
          />
        </label>

        <label>
          Base ID
          <input type="number" min="1" [value]="seedId" (input)="onSeedIdInput($event)" />
        </label>

        <label>
          Name Prefix
          <input type="text" placeholder="e.g. Product" [value]="namePrefix" (input)="onNamePrefixInput($event)" />
        </label>

        <label>
          SKU Prefix
          <input type="text" placeholder="e.g. SKU" [value]="skuPrefix" (input)="onSkuPrefixInput($event)" />
        </label>

        <label>
          Category
          <select [value]="category" (change)="onCategoryInput($event)">
            @for (option of categories; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </label>

        @if (category === 'Other') {
          <label>
            Custom Category
            <input
              type="text"
              placeholder="Enter custom category"
              [value]="customCategory"
              (input)="onCustomCategoryInput($event)"
            />
          </label>
        }

        <label>
          Base Price
          <input type="number" min="0" [value]="basePrice" (input)="onBasePriceInput($event)" />
        </label>

        <label>
          Base Quantity
          <input type="number" min="0" [value]="baseQuantity" (input)="onBaseQuantityInput($event)" />
        </label>

        <label class="toggle-row">
          <input type="checkbox" [checked]="useUniqueImageUrl" (change)="onUseUniqueImageChange($event)" />
          Use unique image address URL for each generated product
        </label>

        <label>
          Description (optional)
          <input
            type="text"
            placeholder="Short product summary"
            [value]="description"
            (input)="onDescriptionInput($event)"
          />
        </label>

        <label>
          Discount Percentage (optional)
          <input
            type="number"
            placeholder="e.g. 15"
            min="0"
            max="100"
            [value]="discountPercentage"
            (input)="onDiscountInput($event)"
          />
        </label>

        <div class="checkboxes" role="group" aria-label="Product flags">
          <label><input type="checkbox" [checked]="retired" (change)="onRetiredChange($event)" /> Retired</label>
          <label><input type="checkbox" [checked]="hidden" (change)="onHiddenChange($event)" /> Hidden</label>
          <label><input type="checkbox" [checked]="featured" (change)="onFeaturedChange($event)" /> Featured</label>
          <label><input type="checkbox" [checked]="onSale" (change)="onSaleChange($event)" /> On Sale</label>
        </div>

        <div class="form-actions">
          <button type="submit">Generate Products</button>
          <a routerLink="/products" class="nav-button" [class.disabled]="!generatedProducts.length" [attr.aria-disabled]="!generatedProducts.length">
            View Product Cards
          </a>
          <button type="button" class="danger" [disabled]="!generatedProducts.length" (click)="clearGeneratedResults()">
            Clear Generated Results
          </button>
        </div>
      </form>

      @if (generatedProducts.length) {
        <section class="results">
          <div class="results-head">
            <h3>Generated {{ generatedProducts.length }} Product Objects</h3>
            <div class="controls">
              <button type="button" class="ghost" (click)="setViewMode('individual')">View Individually</button>
              <button type="button" class="ghost" (click)="setViewMode('array')">View as Array</button>
            </div>
          </div>

          @if (viewMode === 'individual') {
            <div class="cards">
              @for (product of generatedProducts; track product.id) {
                <article class="product-card">
                  <div class="card-head">
                    <strong>{{ product.name }}</strong>
                    <button type="button" class="ghost" (click)="copyText(asJson(product))">Copy Object</button>
                  </div>
                  <pre>{{ asJson(product) }}</pre>
                </article>
              }
            </div>
          }

          @if (viewMode === 'array') {
            <div class="array-wrap">
              <div class="card-head">
                <strong>Product Array JSON</strong>
                <button type="button" class="ghost" (click)="copyText(arrayJson)">Copy Array</button>
              </div>
              <textarea readonly [value]="arrayJson"></textarea>
            </div>
          }

          @if (copyStatus) {
            <p class="status">{{ copyStatus }}</p>
          }
        </section>
      }

      <a routerLink="/products">Cancel and Return</a>
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

    .page h2 {
      margin-top: 0;
    }

    .intro {
      color: #5b6473;
    }

    .form {
      margin: 1rem 0;
      display: grid;
      gap: 0.9rem;
      max-width: 560px;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
    }

    input {
      border: 1px solid #c6ceda;
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      font: inherit;
      box-sizing: border-box;
      width: 100%;
    }

    select {
      border: 1px solid #c6ceda;
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      font: inherit;
      background: #ffffff;
      box-sizing: border-box;
      width: 100%;
    }

    .checkboxes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 0.55rem;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      font-weight: 500;
    }

    .checkboxes label {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-weight: 500;
    }

    .form-actions {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    button {
      width: fit-content;
      border: 0;
      border-radius: 8px;
      padding: 0.55rem 0.8rem;
      background: #0b6ef6;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover {
      filter: brightness(0.96);
    }

    .nav-button {
      width: fit-content;
      border: 1px solid #0b6ef6;
      border-radius: 8px;
      padding: 0.55rem 0.8rem;
      background: #ffffff;
      color: #0b6ef6;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    .nav-button.disabled {
      pointer-events: none;
      opacity: 0.55;
    }

    .ghost {
      border: 1px solid #ccd6e6;
      background: #ffffff;
      color: #2d4b7a;
      padding: 0.45rem 0.7rem;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .danger {
      border: 1px solid #f1b7bb;
      background: #fff4f5;
      color: #a52a2f;
    }

    .danger:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .results {
      margin: 1.25rem 0;
      display: grid;
      gap: 0.85rem;
    }

    .results-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .results-head h3 {
      margin: 0;
      font-size: 1rem;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .cards {
      display: grid;
      gap: 0.75rem;
    }

    .product-card,
    .array-wrap {
      border: 1px solid #d9e2ef;
      border-radius: 10px;
      background: #fbfdff;
      padding: 0.75rem;
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }

    pre {
      margin: 0;
      background: #f6f8fc;
      border: 1px solid #e3e8f2;
      border-radius: 8px;
      padding: 0.6rem;
      overflow-x: auto;
      font-size: 0.83rem;
    }

    textarea {
      width: 100%;
      min-height: 220px;
      resize: vertical;
      border: 1px solid #c6ceda;
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      font: 0.83rem Consolas, 'Courier New', monospace;
      background: #fdfefe;
      box-sizing: border-box;
    }

    .status {
      margin: 0;
      color: #245db5;
      font-weight: 600;
    }

    a {
      text-decoration: none;
      color: #0b6ef6;
      font-weight: 600;
    }

    @media (max-width: 700px) {
      .page {
        padding: 0.85rem;
      }

      .form {
        max-width: 100%;
      }

      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .form-actions button,
      .form-actions .nav-button {
        width: 100%;
        justify-content: center;
        text-align: center;
      }

      .controls {
        width: 100%;
      }

      .controls button {
        flex: 1;
      }

      .card-head {
        flex-direction: column;
        align-items: flex-start;
      }

      textarea {
        min-height: 180px;
      }
    }

    @media (max-width: 480px) {
      .checkboxes {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class ProductCreatePage {
  private readonly productStore = inject(ProductStoreService);

  protected readonly categories = Array.from(
    new Set([
      'General',
      'Accessories',
      'Displays',
      'Laptops',
      'Desktops',
      'Phones',
      'Tablets',
      'Gaming',
      'Audio',
      'Cameras',
      'Smart Home',
      'Networking',
      'Storage',
      'Software',
      'Office Supplies',
      'Wearables',
      'Printers',
      'Furniture',
      'Cables',
      'Power',
      ...PRODUCTS_MOCK.map((product) => product.category),
      'Other'
    ])
  ).sort();

  protected countToGenerate = 3;
  protected seedId = 200;
  protected namePrefix = 'Product';
  protected skuPrefix = 'SKU';
  protected category = 'General';
  protected customCategory = '';
  protected basePrice = 99;
  protected baseQuantity = 10;
  protected imageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
  protected useUniqueImageUrl = false;
  protected description = '';
  protected discountPercentage = 0;
  protected retired = false;
  protected hidden = false;
  protected featured = false;
  protected onSale = false;

  protected generatedProducts: Product[] = this.productStore.getGenerationDraft().products;
  protected viewMode: 'individual' | 'array' = this.productStore.getGenerationDraft().viewMode;
  protected copyStatus = '';

  protected get arrayJson(): string {
    return JSON.stringify(this.generatedProducts, null, 2);
  }

  protected onGenerate(event: Event): void {
    event.preventDefault();

    const amount = Math.max(1, Math.min(200, Math.floor(this.countToGenerate || 1)));
    this.countToGenerate = amount;

    this.generatedProducts = Array.from({ length: amount }, (_, index) => {
      const id = this.seedId + index;
      const product: Product = {
        id,
        name: `${this.namePrefix} ${index + 1}`,
        sku: `${this.skuPrefix}-${id}`,
        price: Number((this.basePrice + index * 2.5).toFixed(2)),
        quantity: this.baseQuantity + index,
        imageUrl: this.useUniqueImageUrl ? this.buildUniqueImageUrl(id, index) : this.imageUrl,
        retired: this.retired,
        category: this.resolvedCategory
      };

      if (this.hidden) {
        product.hidden = true;
      }
      if (this.description.trim()) {
        product.description = `${this.description} #${index + 1}`;
      }
      if (this.featured) {
        product.featured = true;
      }
      if (this.onSale) {
        product.onSale = true;
        product.discountPercentage = this.discountPercentage;
      }

      return product;
    });

    this.viewMode = 'individual';
    this.copyStatus = '';

    this.productStore.addProducts(this.generatedProducts);
    this.persistGenerationDraft();
  }

  protected setViewMode(mode: 'individual' | 'array'): void {
    this.viewMode = mode;
    this.persistGenerationDraft();
  }

  protected clearGeneratedResults(): void {
    for (const product of this.generatedProducts) {
      this.productStore.removeProduct(product.id);
    }

    this.generatedProducts = [];
    this.viewMode = 'individual';
    this.copyStatus = '';
    this.persistGenerationDraft();
  }

  protected asJson(product: Product): string {
    return JSON.stringify(product, null, 2);
  }

  protected async copyText(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copyStatus = 'Copied to clipboard.';
    } catch {
      this.copyStatus = 'Copy failed. You can still manually copy from the text area.';
    }
  }

  protected onCountInput(event: Event): void {
    this.countToGenerate = this.readNumber(event, this.countToGenerate);
  }

  protected onSeedIdInput(event: Event): void {
    this.seedId = this.readNumber(event, this.seedId);
  }

  protected onNamePrefixInput(event: Event): void {
    this.namePrefix = this.readText(event, this.namePrefix);
  }

  protected onSkuPrefixInput(event: Event): void {
    this.skuPrefix = this.readText(event, this.skuPrefix);
  }

  protected onCategoryInput(event: Event): void {
    this.category = this.readText(event, this.category);
  }

  protected onCustomCategoryInput(event: Event): void {
    this.customCategory = this.readText(event, this.customCategory);
  }

  protected onBasePriceInput(event: Event): void {
    this.basePrice = this.readNumber(event, this.basePrice);
  }

  protected onBaseQuantityInput(event: Event): void {
    this.baseQuantity = this.readNumber(event, this.baseQuantity);
  }

  protected onDescriptionInput(event: Event): void {
    this.description = this.readText(event, this.description);
  }

  protected onUseUniqueImageChange(event: Event): void {
    this.useUniqueImageUrl = this.readChecked(event);
  }

  protected onDiscountInput(event: Event): void {
    this.discountPercentage = this.readNumber(event, this.discountPercentage);
  }

  protected onRetiredChange(event: Event): void {
    this.retired = this.readChecked(event);
  }

  protected onHiddenChange(event: Event): void {
    this.hidden = this.readChecked(event);
  }

  protected onFeaturedChange(event: Event): void {
    this.featured = this.readChecked(event);
  }

  protected onSaleChange(event: Event): void {
    this.onSale = this.readChecked(event);
  }

  private readNumber(event: Event, fallback: number): number {
    const input = event.target as HTMLInputElement | null;
    const value = Number(input?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  private readText(event: Event, fallback: string): string {
    const element = event.target as HTMLInputElement | HTMLSelectElement | null;
    return element?.value ?? fallback;
  }

  private readChecked(event: Event): boolean {
    const input = event.target as HTMLInputElement | null;
    return Boolean(input?.checked);
  }

  private get resolvedCategory(): string {
    if (this.category !== 'Other') {
      return this.category;
    }

    const value = this.customCategory.trim();
    return value || 'Other';
  }

  private buildUniqueImageUrl(id: number, index: number): string {
    const tags = encodeURIComponent(this.buildImageTags(index));
    const lock = id * 37 + index;
    return `https://loremflickr.com/800/500/${tags}?lock=${lock}`;
  }

  private buildImageTags(index: number): string {
    const text = `${this.namePrefix} ${this.resolvedCategory} ${this.description} product ${index + 1}`.toLowerCase();
    const words = text
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .slice(0, 5);

    if (!words.length) {
      return 'product,technology';
    }

    return Array.from(new Set(words)).join(',');
  }

  private persistGenerationDraft(): void {
    this.productStore.saveGenerationDraft({
      products: this.generatedProducts,
      viewMode: this.viewMode
    });
  }
}
