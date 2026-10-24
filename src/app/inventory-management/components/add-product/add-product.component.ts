import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryMasterItem, InventoryRecord, ProcessMasterItem, ProductMasterItem } from '../../inventory.models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @Input() productMasterList: ProductMasterItem[] = [];
  @Input() productNameMasterList: string[] = [];
  @Input() productCodeMasterList: string[] = [];
  @Input() processMasterList: ProcessMasterItem[] = [];
  @Input() categoryMasterList: CategoryMasterItem[] = [];
  @Output() add = new EventEmitter<InventoryRecord>();

  readonly inventoryForm = new FormGroup({
    process: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productCategory: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productWeight: new FormControl(0, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    quantity: new FormControl(1, { validators: [Validators.required, Validators.min(1)], nonNullable: true }),
    batchNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')],
      nonNullable: true
    }),
    batchEntryDate: new FormControl(this.getCurrentDateTime(), { validators: [Validators.required], nonNullable: true }),
    mrp: new FormControl(0, { validators: [Validators.required, Validators.min(0.01)], nonNullable: true }),
    currentDiscount: new FormControl(0, {
      validators: [Validators.required, Validators.min(0), Validators.max(100)],
      nonNullable: true
    })
  });

  constructor() {
    this.inventoryForm.controls.productName.disable();
    this.inventoryForm.controls.productCategory.disable();
    this.inventoryForm.controls.process.disable();
  }

  selectProductCode(productCode: string): void {
    const product = this.productMasterList.find((item) => item.code === productCode);
    if (!product) {
      return;
    }

    const category = this.categoryMasterList.find((item) => item.code === product.categoryCode);
    const process = this.processMasterList.find((item) => item.code === product.processCode);
    this.inventoryForm.patchValue({
      productName: product.name,
      productCategory: category?.name ?? '',
      process: process?.name ?? ''
    });
  }

  addInventory(): void {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }

    const value = this.inventoryForm.getRawValue();
    this.add.emit({
      process: value.process,
      productCode: value.productCode,
      productName: value.productName,
      productCategory: value.productCategory,
      productWeight: Number(value.productWeight),
      quantity: Number(value.quantity),
      batchNumber: value.batchNumber,
      batchEntryDate: value.batchEntryDate,
      mrp: Number(value.mrp),
      currentDiscount: Number(value.currentDiscount)
    });
    this.resetForm();
  }

  private resetForm(): void {
    this.inventoryForm.reset({
      process: '',
      productName: '',
      productCode: '',
      productCategory: '',
      productWeight: 0,
      quantity: 1,
      batchNumber: '',
      batchEntryDate: this.getCurrentDateTime(),
      mrp: 0,
      currentDiscount: 0
    });
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
  }
}
