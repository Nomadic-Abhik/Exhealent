import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SkuCategoryOption, SkuMapping, SkuProcessOption } from '../../sku.models';

@Component({
  selector: 'app-edit-sku',
  templateUrl: './edit-sku.component.html',
  styleUrls: ['./edit-sku.component.scss']
})
export class EditSkuComponent implements OnChanges {
  @Input() sku: SkuMapping | null = null;
  @Input() productCodeMasterList: string[] = [];
  @Input() processMasterList: SkuProcessOption[] = [];
  @Input() categoryMasterList: SkuCategoryOption[] = [];
  @Input() productNameMasterList: string[] = [];
  @Output() save = new EventEmitter<SkuMapping>();
  @Output() cancel = new EventEmitter<void>();

  readonly skuForm = new FormGroup({
    productCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    processCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productName: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sku']) {
      this.skuForm.reset(this.sku ?? { productCode: '', processCode: '', categoryCode: '', productName: '' });
    }
  }

  onSubmit(): void {
    if (this.skuForm.invalid) {
      this.skuForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.skuForm.getRawValue());
  }
}
