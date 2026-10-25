import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAvailability, ProductMasterEntry } from '../../sku.models';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    standalone: false
})
export class AddProductComponent implements OnChanges {
  @Input() product: ProductMasterEntry | null = null;
  @Input() resetAfterSave = 0;
  @Input() saving = false;
  @Output() save = new EventEmitter<ProductMasterEntry>();
  @Output() cancelEdit = new EventEmitter<void>();
  readonly form = new FormGroup({
    code: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      nonNullable: true
    }),
    name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
    shortDescription: new FormControl('', { validators: [Validators.maxLength(100)], nonNullable: true }),
    detail: new FormControl('', { validators: [Validators.maxLength(300)], nonNullable: true }),
    available: new FormControl(false, { nonNullable: true }),
    image: new FormControl('', { validators: [Validators.maxLength(10)], nonNullable: true })
  });
  readonly productAvailability = ProductAvailability;

  get availabilityStatus(): ProductAvailability {
    return this.form.controls.available.value
      ? ProductAvailability.Active
      : ProductAvailability.Inactive;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.form.reset({
        code: this.product.code,
        name: this.product.name,
        shortDescription: this.product.shortDescription,
        detail: this.product.detail,
        available: this.product.available,
        image: this.product.image
      });
      return;
    }

    if (changes['product'] || changes['resetAfterSave']) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.save.emit({
      code: value.code.trim(),
      name: value.name.trim(),
      shortDescription: value.shortDescription.trim(),
      detail: value.detail.trim(),
      available: value.available,
      image: value.image.trim()
    });
  }

  onCancelEdit(): void {
    this.cancelEdit.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      code: '',
      name: '',
      shortDescription: '',
      detail: '',
      available: false,
      image: ''
    });
  }
}
