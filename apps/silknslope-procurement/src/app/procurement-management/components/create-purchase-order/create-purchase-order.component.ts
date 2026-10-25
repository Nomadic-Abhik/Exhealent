import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CategoryMasterItem,
  ProcessMasterItem,
  ProductMasterItem,
  PurchaseOrderDetails
} from '../../models/purchase-order.model';

@Component({
  selector: 'procurement-create-purchase-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-purchase-order.component.html',
  styleUrl: './create-purchase-order.component.scss'
})
export class CreatePurchaseOrderComponent {
  @Input() supplierList: string[] = [];
  @Input() productMasterList: ProductMasterItem[] = [];
  @Input() productCodeMasterList: string[] = [];
  @Input() processMasterList: ProcessMasterItem[] = [];
  @Input() categoryMasterList: CategoryMasterItem[] = [];
  @Output() readonly purchaseOrderCreated = new EventEmitter<PurchaseOrderDetails>();

  readonly purchaseOrderForm = this.formBuilder.nonNullable.group({
    supplier: ['', [Validators.required, Validators.maxLength(100)]],
    process: ['', Validators.required],
    productName: ['', Validators.required],
    productCode: ['', Validators.required],
    productCategory: ['', Validators.required],
    productWeight: [0, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    batchNumber: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')]],
    batchEntryDate: [this.getCurrentDateTime(), Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    deliveryMiscCharge: [0, [Validators.required, Validators.min(0)]],
    totalTax: [0, [Validators.required, Validators.min(0)]],
    miscCharge: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private readonly formBuilder: FormBuilder) {
    this.purchaseOrderForm.controls.productName.disable();
    this.purchaseOrderForm.controls.productCategory.disable();
    this.purchaseOrderForm.controls.process.disable();
  }

  get totalProcurementCost(): number {
    const { price, quantity, deliveryMiscCharge, totalTax, miscCharge } = this.purchaseOrderForm.getRawValue();
    return Number(price) * Number(quantity) +
      Number(deliveryMiscCharge) +
      Number(totalTax) +
      Number(miscCharge);
  }

  selectProductCode(productCode: string): void {
    const product = this.productMasterList.find((item) => item.code === productCode);
    if (!product) {
      return;
    }

    const category = this.categoryMasterList.find((item) => item.code === product.categoryCode);
    const process = this.processMasterList.find((item) => item.code === product.processCode);
    this.purchaseOrderForm.patchValue({
      productName: product.name,
      productCategory: category?.name ?? '',
      process: process?.name ?? ''
    });
  }

  createPurchaseOrder(): void {
    if (this.purchaseOrderForm.invalid) {
      this.purchaseOrderForm.markAllAsTouched();
      return;
    }

    const value = this.purchaseOrderForm.getRawValue();
    this.purchaseOrderCreated.emit({
      ...value,
      productWeight: Number(value.productWeight),
      quantity: Number(value.quantity),
      price: Number(value.price),
      deliveryMiscCharge: Number(value.deliveryMiscCharge),
      totalTax: Number(value.totalTax),
      miscCharge: Number(value.miscCharge),
      totalProcurementCost: this.totalProcurementCost
    });
    this.purchaseOrderForm.reset({
      supplier: '',
      process: '',
      productName: '',
      productCode: '',
      productCategory: '',
      productWeight: 0,
      quantity: 1,
      batchNumber: '',
      batchEntryDate: this.getCurrentDateTime(),
      price: 0,
      deliveryMiscCharge: 0,
      totalTax: 0,
      miscCharge: 0
    });
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
  }
}
