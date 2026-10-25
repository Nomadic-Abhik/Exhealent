import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductMasterEntry, SkuCategoryOption, SkuMapping, SkuProcessOption } from './sku.models';
import { SkuManagementService } from './sku-management.service';

@Component({
    selector: 'app-sku-management',
    templateUrl: './sku-management.component.html',
    styleUrls: ['./sku-management.component.scss'],
    standalone: false
})
export class SkuManagementComponent implements OnInit {
  readonly productMasterEntries: ProductMasterEntry[] = [];
  readonly productCodeMasterList: string[] = [];
  readonly productNameMasterList: string[] = [];
  readonly processMasterList: SkuProcessOption[] = [
    { code: 'PROC-001', name: 'Fridge Dried' },
    { code: 'PROC-002', name: 'AggloMeration Enhanced' },
    { code: 'PROC-003', name: 'Agglomeration Normal' },
    { code: 'PROC-004', name: 'Plantation - A' }
  ];
  readonly categoryMasterList: SkuCategoryOption[] = [
    { code: 'CAT-001', name: 'Instant Coffee' }
  ];

  skuMappings: SkuMapping[] = [
    { productCode: 'FDA-100', processCode: 'PROC-001', categoryCode: 'CAT-001', productName: 'Silk & Slope Gold' },
    { productCode: 'FDA-7030', processCode: 'PROC-002', categoryCode: 'CAT-001', productName: 'Silk & Slope Silver' },
    { productCode: 'EGA-100', processCode: 'PROC-003', categoryCode: 'CAT-001', productName: 'Silk & Slope Bronze' },
    { productCode: 'EGA-70', processCode: 'PROC-004', categoryCode: 'CAT-001', productName: 'Silk & Slope Copper' }
  ];

  activeTab: 'list' | 'add' | 'edit' | 'product' | 'process' | 'category' = 'list';
  selectedIndex: number | null = null;
  selectedProductIndex: number | null = null;
  productsLoading = false;
  productSaving = false;
  productApiError: string | null = null;
  productFormResetKey = 0;

  constructor(private readonly skuManagementService: SkuManagementService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get selectedProduct(): ProductMasterEntry | null {
    return this.selectedProductIndex === null
      ? null
      : this.productMasterEntries[this.selectedProductIndex] ?? null;
  }

  get selectedSku(): SkuMapping | null {
    return this.selectedIndex === null ? null : this.skuMappings[this.selectedIndex] ?? null;
  }

  processName(code: string): string {
    return this.processMasterList.find((process) => process.code === code)?.name ?? code;
  }

  categoryName(code: string): string {
    return this.categoryMasterList.find((category) => category.code === code)?.name ?? code;
  }

  addSku(mapping: SkuMapping): void {
    if (this.skuMappings.some((item) => item.productCode === mapping.productCode)) {
      return;
    }
    this.skuMappings = [...this.skuMappings, mapping];
    this.activeTab = 'list';
  }

  editSku(index: number): void {
    this.selectedIndex = index;
    this.activeTab = 'edit';
  }

  saveSku(mapping: SkuMapping): void {
    if (this.selectedIndex === null) {
      return;
    }
    this.skuMappings = this.skuMappings.map((item, index) => index === this.selectedIndex ? mapping : item);
    this.activeTab = 'list';
    this.selectedIndex = null;
  }

  cancelEdit(): void {
    this.activeTab = 'list';
    this.selectedIndex = null;
  }

  editProduct(product: ProductMasterEntry): void {
    this.selectedProductIndex = this.productMasterEntries.indexOf(product);
    if (this.selectedProductIndex === -1) {
      this.selectedProductIndex = null;
      return;
    }
  }

  cancelProductEdit(): void {
    this.selectedProductIndex = null;
  }

  private loadProducts(): void {
    this.productsLoading = true;
    this.productApiError = null;
    this.skuManagementService.getProducts().subscribe({
      next: (products) => {
        this.productMasterEntries.splice(0, this.productMasterEntries.length, ...products);
        this.refreshProductOptions();
        this.productsLoading = false;
      },
      error: (error: unknown) => {
        this.productsLoading = false;
        this.productApiError = this.requestErrorMessage('Loading products', error);
      }
    });
  }

  addProduct(product: ProductMasterEntry): void {
    const code = product.code.trim();
    const name = product.name.trim();
    if (!code || !name) {
      this.productApiError = 'Product code and product name are required.';
      return;
    }

    const savedProduct = { ...product, code, name };
    const duplicateCode = this.productMasterEntries.some((entry, index) =>
      entry.code === code && index !== this.selectedProductIndex
    );
    if (duplicateCode) {
      this.productApiError = `A product with code "${code}" already exists.`;
      return;
    }

    this.productSaving = true;
    this.productApiError = null;
    const selectedIndex = this.selectedProductIndex;
    if (selectedIndex === null) {
      this.skuManagementService.createProduct(savedProduct).subscribe({
        next: (createdProduct) => {
          this.productMasterEntries.push(createdProduct);
          this.refreshProductOptions();
          this.productFormResetKey++;
          this.productSaving = false;
        },
        error: (error: unknown) => {
          this.productSaving = false;
          this.productApiError = this.requestErrorMessage('Creating product', error);
        }
      });
      return;
    }

    const existingProduct = this.productMasterEntries[selectedIndex];
    if (!existingProduct) {
      this.productSaving = false;
      this.selectedProductIndex = null;
      this.productApiError = 'The selected product is no longer available. Select it again and retry.';
      return;
    }

    this.skuManagementService.updateProduct(existingProduct.code, savedProduct).subscribe({
      next: () => {
        this.productMasterEntries[selectedIndex] = savedProduct;
        if (existingProduct.code !== code) {
          this.skuMappings = this.skuMappings.map((mapping) =>
            mapping.productCode === existingProduct.code
              ? { ...mapping, productCode: code, productName: name }
              : mapping
          );
        } else if (existingProduct.name !== name) {
          this.skuMappings = this.skuMappings.map((mapping) =>
            mapping.productCode === code ? { ...mapping, productName: name } : mapping
          );
        }
        this.refreshProductOptions();
        this.selectedProductIndex = null;
        this.productSaving = false;
      },
      error: (error: unknown) => {
        this.productSaving = false;
        this.productApiError = this.requestErrorMessage('Updating product', error);
      }
    });
  }

  private refreshProductOptions(): void {
    this.productCodeMasterList.splice(
      0,
      this.productCodeMasterList.length,
      ...new Set(this.productMasterEntries.map((product) => product.code))
    );
    this.productNameMasterList.splice(
      0,
      this.productNameMasterList.length,
      ...new Set(this.productMasterEntries.map((product) => product.name))
    );
  }

  private requestErrorMessage(action: string, error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return `${action} failed (HTTP ${error.status}): ${error.message}`;
    }
    if (error instanceof Error) {
      return `${action} failed: ${error.message}`;
    }
    return `${action} failed because of an unknown error.`;
  }

  addProcess(process: SkuProcessOption): void {
    if (!process.code || !process.name || this.processMasterList.some((item) => item.code === process.code)) {
      return;
    }
    this.processMasterList.push(process);
    this.activeTab = 'list';
  }

  addCategory(category: SkuCategoryOption): void {
    if (!category.code || !category.name || this.categoryMasterList.some((item) => item.code === category.code)) {
      return;
    }
    this.categoryMasterList.push(category);
    this.activeTab = 'list';
  }

}
