import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SkuCategoryOption } from '../../sku.models';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Output() save = new EventEmitter<SkuCategoryOption>();
  readonly form = new FormGroup({
    code: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    name: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    this.save.emit({ code: value.code.trim(), name: value.name.trim() });
    this.form.reset({ code: '', name: '' });
  }
}
