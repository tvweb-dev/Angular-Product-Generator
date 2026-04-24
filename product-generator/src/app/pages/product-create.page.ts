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
        <p class="group-title">Required</p>
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

        <p class="group-title">Identity And Classification</p>

        <label>
          Name Prefix (optional)
          <input type="text" placeholder="e.g. Product" [value]="namePrefix" (input)="onNamePrefixInput($event)" />
        </label>

        <label>
          SKU Prefix (optional)
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
        @if (categoryReminder) {
          <p class="validation">{{ categoryReminder }}</p>
        }

        <label>
          Custom Category (optional)
          <textarea
            class="category-textarea"
            placeholder="Type your own category (used when Category is set to Other)"
            [value]="customCategory"
            (input)="onCustomCategoryInput($event)"
          ></textarea>
        </label>

        <label>
          Object Type (optional)
          <input type="text" placeholder="e.g. Asset, Task, Inventory Item" [value]="objectType" (input)="onObjectTypeInput($event)" />
        </label>

        <label>
          Status (optional)
          <input type="text" placeholder="e.g. Draft, Active, Archived" [value]="status" (input)="onStatusInput($event)" />
        </label>

        <label>
          Owner (optional)
          <input type="text" placeholder="e.g. Ops Team" [value]="owner" (input)="onOwnerInput($event)" />
        </label>

        <p class="group-title">Location</p>

        <label>
          Location (optional)
          <input type="text" placeholder="e.g. Warehouse A" [value]="location" (input)="onLocationInput($event)" />
        </label>

        <label>
          Address (optional)
          <input type="text" placeholder="e.g. 123 Main St" [value]="address" (input)="onAddressInput($event)" />
        </label>

        <label>
          City (optional)
          <input type="text" placeholder="e.g. Austin" [value]="city" (input)="onCityInput($event)" />
        </label>

        <label>
          State/Province (optional)
          <input type="text" placeholder="e.g. Texas" [value]="stateProvince" (input)="onStateProvinceInput($event)" />
        </label>

        <label>
          Zip/Postal Code (optional)
          <input type="text" placeholder="e.g. 78701" [value]="zipPostalCode" (input)="onZipPostalCodeInput($event)" />
        </label>

        <label>
          Country (optional)
          <input type="text" placeholder="e.g. USA" [value]="country" (input)="onCountryInput($event)" />
        </label>

        <p class="group-title">Reference And Priority</p>

        <label>
          Reference Code (optional)
          <input type="text" placeholder="e.g. REF-001" [value]="referenceCode" (input)="onReferenceCodeInput($event)" />
        </label>

        <label>
          Priority 1 to 5 (optional)
          <input type="number" min="1" max="5" [value]="priority" (input)="onPriorityInput($event)" />
        </label>

        <label>
          Confidence Score 0 to 100 (optional)
          <input type="number" min="0" max="100" [value]="confidenceScore" (input)="onConfidenceScoreInput($event)" />
        </label>

        <p class="group-title">Commercial</p>

        <label>
          Base Price (optional)
          <input type="number" min="0" [value]="basePrice" (input)="onBasePriceInput($event)" />
        </label>

        <label>
          Base Quantity (optional)
          <input type="number" min="0" [value]="baseQuantity" (input)="onBaseQuantityInput($event)" [disabled]="!useBaseQuantity" />
        </label>

        <label class="toggle-row">
          <input type="checkbox" [checked]="useBaseQuantity" (change)="onUseBaseQuantityChange($event)" />
          Use Base Quantity (optional)
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

        <label>
          Brand (optional)
          <input type="text" placeholder="e.g. Acme" [value]="brand" (input)="onBrandInput($event)" />
        </label>

        <label>
          Manufacturer (optional)
          <input type="text" placeholder="e.g. Acme Labs" [value]="manufacturer" (input)="onManufacturerInput($event)" />
        </label>

        <label>
          Material (optional)
          <input type="text" placeholder="e.g. Aluminum" [value]="material" (input)="onMaterialInput($event)" />
        </label>

        <p class="group-title">Physical Specs</p>

        <label>
          Base Weight in KG (optional)
          <input type="number" min="0" step="0.1" [value]="baseWeightKg" (input)="onBaseWeightInput($event)" />
        </label>

        <label>
          Base Weight in LB (optional)
          <input type="number" min="0" step="0.1" [value]="baseWeightLb" (input)="onBaseWeightLbInput($event)" />
        </label>

        <label>
          Base Weight in G (optional)
          <input type="number" min="0" step="1" [value]="baseWeightG" (input)="onBaseWeightGInput($event)" />
        </label>

        <label>
          Base Rating 0 to 5 (optional)
          <input type="number" min="0" max="5" step="0.1" [value]="baseRating" (input)="onBaseRatingInput($event)" />
        </label>

        <label>
          Warranty Months (optional)
          <input type="number" min="0" [value]="warrantyMonths" (input)="onWarrantyInput($event)" />
        </label>

        <p class="group-title">Description And Notes</p>

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
          Notes (optional)
          <input type="text" placeholder="Any extra context" [value]="notes" (input)="onNotesInput($event)" />
        </label>

        <p class="group-title">Flags</p>

        <label class="toggle-row">
          <input type="checkbox" [checked]="useUniqueImageUrl" (change)="onUseUniqueImageChange($event)" />
          Use unique image address URL for each generated product (optional)
        </label>

        <div class="checkboxes" role="group" aria-label="Product flags">
          <label><input type="checkbox" [checked]="retired" (change)="onRetiredChange($event)" /> Retired (optional)</label>
          <label><input type="checkbox" [checked]="hidden" (change)="onHiddenChange($event)" /> Hidden (optional)</label>
          <label><input type="checkbox" [checked]="featured" (change)="onFeaturedChange($event)" /> Featured (optional)</label>
          <label><input type="checkbox" [checked]="onSale" (change)="onSaleChange($event)" /> On Sale (optional)</label>
          <label><input type="checkbox" [checked]="freeShipping" (change)="onFreeShippingChange($event)" /> Free Shipping (optional)</label>
          <label><input type="checkbox" [checked]="taxable" (change)="onTaxableChange($event)" /> Taxable (optional)</label>
          <label><input type="checkbox" [checked]="requiresAssembly" (change)="onRequiresAssemblyChange($event)" /> Requires Assembly (optional)</label>
          <label><input type="checkbox" [checked]="digitalDownload" (change)="onDigitalDownloadChange($event)" /> Digital Download (optional)</label>
        </div>

        <label class="toggle-row">
          <input type="checkbox" [checked]="includeAddToCartButton" (change)="onIncludeAddToCartButtonChange($event)" />
          Include Add To Cart button in product card (optional)
        </label>

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
              <textarea class="array-textarea" readonly [value]="arrayJson"></textarea>
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

    .group-title {
      margin: 0.25rem 0 0;
      color: #334155;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-top: 1px solid #e2e8f0;
      padding-top: 0.75rem;
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

    .category-textarea {
      border: 1px solid #c6ceda;
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      font: inherit;
      min-height: 84px;
      resize: vertical;
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

    .array-textarea {
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

    .validation {
      margin: -0.4rem 0 0;
      color: #b42318;
      font-size: 0.88rem;
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

      .array-textarea {
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
      'Person',
      'Place',
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
  protected category = 'Other';
  protected customCategory = '';
  protected categoryReminder = '';
  protected objectType = '';
  protected status = '';
  protected owner = '';
  protected location = '';
  protected address = '';
  protected city = '';
  protected stateProvince = '';
  protected zipPostalCode = '';
  protected country = '';
  protected referenceCode = '';
  protected priority = 0;
  protected confidenceScore = 0;
  protected basePrice = 99;
  protected baseQuantity = 10;
  protected useBaseQuantity = true;
  protected brand = '';
  protected manufacturer = '';
  protected material = '';
  protected baseWeightKg = 0;
  protected baseWeightLb = 0;
  protected baseWeightG = 0;
  protected baseRating = 0;
  protected warrantyMonths = 0;
  protected imageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
  protected useUniqueImageUrl = false;
  protected description = '';
  protected notes = '';
  protected discountPercentage = 0;
  protected retired = false;
  protected hidden = false;
  protected featured = false;
  protected onSale = false;
  protected freeShipping = false;
  protected taxable = true;
  protected requiresAssembly = false;
  protected digitalDownload = false;
  protected includeAddToCartButton = true;

  protected generatedProducts: Product[] = this.productStore.getGenerationDraft().products;
  protected viewMode: 'individual' | 'array' = this.productStore.getGenerationDraft().viewMode;
  protected copyStatus = '';

  protected get arrayJson(): string {
    return JSON.stringify(this.generatedProducts, null, 2);
  }

  protected onGenerate(event: Event): void {
    event.preventDefault();

    const validCategory = this.resolvedCategory;
    if (!validCategory) {
      this.categoryReminder = 'Please select a category or type a custom category before generating.';
      return;
    }

    this.categoryReminder = '';

    const amount = Math.max(1, Math.min(200, Math.floor(this.countToGenerate || 1)));
    this.countToGenerate = amount;

    this.generatedProducts = Array.from({ length: amount }, (_, index) => {
      const id = this.seedId + index;
      const product: Product = {
        id,
        name: `${this.namePrefix} ${index + 1}`,
        sku: `${this.skuPrefix}-${id}`,
        price: Number((this.basePrice + index * 2.5).toFixed(2)),
        imageUrl: this.useUniqueImageUrl ? this.buildUniqueImageUrl(id, index) : this.imageUrl,
        retired: this.retired,
        category: validCategory
      };

      if (this.useBaseQuantity) {
        product.quantity = this.baseQuantity + index;
      }

      if (this.hidden) {
        product.hidden = true;
      }
      if (this.objectType.trim()) {
        product.objectType = this.objectType.trim();
      }
      if (this.status.trim()) {
        product.status = this.status.trim();
      }
      if (this.owner.trim()) {
        product.owner = this.owner.trim();
      }
      if (this.location.trim()) {
        product.location = this.location.trim();
      }
      if (this.address.trim()) {
        product.address = this.address.trim();
      }
      if (this.city.trim()) {
        product.city = this.city.trim();
      }
      if (this.stateProvince.trim()) {
        product.stateProvince = this.stateProvince.trim();
      }
      if (this.zipPostalCode.trim()) {
        product.zipPostalCode = this.zipPostalCode.trim();
      }
      if (this.country.trim()) {
        product.country = this.country.trim();
      }
      if (this.referenceCode.trim()) {
        product.referenceCode = `${this.referenceCode.trim()}-${id}`;
      }
      if (this.priority > 0) {
        product.priority = Math.max(1, Math.min(5, Math.floor(this.priority)));
      }
      if (this.confidenceScore > 0) {
        product.confidenceScore = Math.max(0, Math.min(100, Math.floor(this.confidenceScore)));
      }
      if (this.brand.trim()) {
        product.brand = this.brand.trim();
      }
      if (this.manufacturer.trim()) {
        product.manufacturer = this.manufacturer.trim();
      }
      if (this.material.trim()) {
        product.material = this.material.trim();
      }
      if (this.baseWeightKg > 0) {
        product.weightKg = Number((this.baseWeightKg + index * 0.1).toFixed(2));
      }
      if (this.baseWeightLb > 0) {
        product.weightLb = Number((this.baseWeightLb + index * 0.1).toFixed(2));
      }
      if (this.baseWeightG > 0) {
        product.weightG = Math.max(0, Math.floor(this.baseWeightG + index * 10));
      }
      if (this.baseRating > 0) {
        product.rating = Math.min(5, Number((this.baseRating + index * 0.05).toFixed(1)));
      }
      if (this.warrantyMonths > 0) {
        product.warrantyMonths = this.warrantyMonths;
      }
      if (this.description.trim()) {
        product.description = `${this.description} #${index + 1}`;
      }
      if (this.notes.trim()) {
        product.notes = `${this.notes} #${index + 1}`;
      }
      if (this.featured) {
        product.featured = true;
      }
      if (this.onSale) {
        product.onSale = true;
        product.discountPercentage = this.discountPercentage;
      }
      if (this.freeShipping) {
        product.freeShipping = true;
      }
      if (this.taxable) {
        product.taxable = true;
      }
      if (this.requiresAssembly) {
        product.requiresAssembly = true;
      }
      if (this.digitalDownload) {
        product.digitalDownload = true;
      }
      if (!this.includeAddToCartButton) {
        product.includeAddToCartButton = false;
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
    this.categoryReminder = '';
  }

  protected onCustomCategoryInput(event: Event): void {
    this.customCategory = this.readText(event, this.customCategory);
    this.categoryReminder = '';
  }

  protected onObjectTypeInput(event: Event): void {
    this.objectType = this.readText(event, this.objectType);
  }

  protected onStatusInput(event: Event): void {
    this.status = this.readText(event, this.status);
  }

  protected onOwnerInput(event: Event): void {
    this.owner = this.readText(event, this.owner);
  }

  protected onLocationInput(event: Event): void {
    this.location = this.readText(event, this.location);
  }

  protected onAddressInput(event: Event): void {
    this.address = this.readText(event, this.address);
  }

  protected onCityInput(event: Event): void {
    this.city = this.readText(event, this.city);
  }

  protected onStateProvinceInput(event: Event): void {
    this.stateProvince = this.readText(event, this.stateProvince);
  }

  protected onZipPostalCodeInput(event: Event): void {
    this.zipPostalCode = this.readText(event, this.zipPostalCode);
  }

  protected onCountryInput(event: Event): void {
    this.country = this.readText(event, this.country);
  }

  protected onReferenceCodeInput(event: Event): void {
    this.referenceCode = this.readText(event, this.referenceCode);
  }

  protected onPriorityInput(event: Event): void {
    this.priority = this.readNumber(event, this.priority);
  }

  protected onConfidenceScoreInput(event: Event): void {
    this.confidenceScore = this.readNumber(event, this.confidenceScore);
  }

  protected onBasePriceInput(event: Event): void {
    this.basePrice = this.readNumber(event, this.basePrice);
  }

  protected onBaseQuantityInput(event: Event): void {
    this.baseQuantity = this.readNumber(event, this.baseQuantity);
  }

  protected onUseBaseQuantityChange(event: Event): void {
    this.useBaseQuantity = this.readChecked(event);
  }

  protected onBrandInput(event: Event): void {
    this.brand = this.readText(event, this.brand);
  }

  protected onManufacturerInput(event: Event): void {
    this.manufacturer = this.readText(event, this.manufacturer);
  }

  protected onMaterialInput(event: Event): void {
    this.material = this.readText(event, this.material);
  }

  protected onBaseWeightInput(event: Event): void {
    this.baseWeightKg = this.readNumber(event, this.baseWeightKg);
  }

  protected onBaseWeightLbInput(event: Event): void {
    this.baseWeightLb = this.readNumber(event, this.baseWeightLb);
  }

  protected onBaseWeightGInput(event: Event): void {
    this.baseWeightG = this.readNumber(event, this.baseWeightG);
  }

  protected onBaseRatingInput(event: Event): void {
    this.baseRating = this.readNumber(event, this.baseRating);
  }

  protected onWarrantyInput(event: Event): void {
    this.warrantyMonths = this.readNumber(event, this.warrantyMonths);
  }

  protected onDescriptionInput(event: Event): void {
    this.description = this.readText(event, this.description);
  }

  protected onNotesInput(event: Event): void {
    this.notes = this.readText(event, this.notes);
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

  protected onFreeShippingChange(event: Event): void {
    this.freeShipping = this.readChecked(event);
  }

  protected onTaxableChange(event: Event): void {
    this.taxable = this.readChecked(event);
  }

  protected onRequiresAssemblyChange(event: Event): void {
    this.requiresAssembly = this.readChecked(event);
  }

  protected onDigitalDownloadChange(event: Event): void {
    this.digitalDownload = this.readChecked(event);
  }

  protected onIncludeAddToCartButtonChange(event: Event): void {
    this.includeAddToCartButton = this.readChecked(event);
  }

  private readNumber(event: Event, fallback: number): number {
    const input = event.target as HTMLInputElement | null;
    const value = Number(input?.value);
    return Number.isFinite(value) ? value : fallback;
  }

  private readText(event: Event, fallback: string): string {
    const element = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    return element?.value ?? fallback;
  }

  private readChecked(event: Event): boolean {
    const input = event.target as HTMLInputElement | null;
    return Boolean(input?.checked);
  }

  private get resolvedCategory(): string | null {
    const selectedCategory = this.category.trim();

    if (!selectedCategory) {
      return null;
    }

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
