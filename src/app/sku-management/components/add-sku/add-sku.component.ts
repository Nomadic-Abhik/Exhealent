import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SkuCategoryOption, SkuMapping, SkuProcessOption } from '../../sku.models';

@Component({
  selector: 'app-add-sku',
  templateUrl: './add-sku.component.html',
  styleUrls: ['./add-sku.component.scss']
})
export class AddSkuComponent {
  @Input() productCodeMasterList: string[] = [];
  @Input() processMasterList: SkuProcessOption[] = [];
  @Input() categoryMasterList: SkuCategoryOption[] = [];
  @Input() productNameMasterList: string[] = [];
  @Output() save = new EventEmitter<SkuMapping>();

  readonly skuForm = new FormGroup({
    productCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    processCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    productName: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  onSubmit(): void {
    if (this.skuForm.invalid) {
      this.skuForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.skuForm.getRawValue());
    this.skuForm.reset({ productCode: '', processCode: '', categoryCode: '', productName: '' });
  }
}
