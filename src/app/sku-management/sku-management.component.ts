import { Component } from '@angular/core';
import { SkuCategoryOption, SkuMapping, SkuProcessOption } from './sku.models';

@Component({
  selector: 'app-sku-management',
  templateUrl: './sku-management.component.html',
  styleUrls: ['./sku-management.component.scss']
})
export class SkuManagementComponent {
  readonly productCodeMasterList = ['FDA-100', 'FDA-7030', 'EGA-100', 'EGA-70'];
  readonly productNameMasterList = [
    'Silk & Slope Gold',
    'Silk & Slope Silver',
    'Silk & Slope Bronze',
    'Silk & Slope Copper'
  ];
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

  activeTab: 'list' | 'add' | 'edit' | 'product-code' | 'process' | 'category' | 'product-name' = 'list';
  selectedIndex: number | null = null;

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

  addProductCode(code: string): void {
    if (!code || this.productCodeMasterList.includes(code)) {
      return;
    }
    this.productCodeMasterList.push(code);
    this.activeTab = 'list';
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

  addProductName(name: string): void {
    if (!name || this.productNameMasterList.includes(name)) {
      return;
    }
    this.productNameMasterList.push(name);
    this.activeTab = 'list';
  }
}
