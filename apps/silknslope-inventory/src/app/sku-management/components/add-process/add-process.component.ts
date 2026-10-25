import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SkuProcessOption } from '../../sku.models';

@Component({
    selector: 'app-add-process',
    templateUrl: './add-process.component.html',
    styleUrls: ['./add-process.component.scss'],
    standalone: false
})
export class AddProcessComponent {
  @Output() save = new EventEmitter<SkuProcessOption>();
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
