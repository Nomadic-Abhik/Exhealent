import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-product-code',
    templateUrl: './add-product-code.component.html',
    styleUrls: ['./add-product-code.component.scss'],
    standalone: false
})
export class AddProductCodeComponent {
  @Output() save = new EventEmitter<string>();
  readonly form = new FormGroup({ code: new FormControl('', { validators: [Validators.required], nonNullable: true }) });

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.save.emit(this.form.controls.code.value.trim());
    this.form.reset({ code: '' });
  }
}
