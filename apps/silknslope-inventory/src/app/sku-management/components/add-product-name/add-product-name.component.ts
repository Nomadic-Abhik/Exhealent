import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-product-name',
    templateUrl: './add-product-name.component.html',
    styleUrls: ['./add-product-name.component.scss'],
    standalone: false
})
export class AddProductNameComponent {
  @Output() save = new EventEmitter<string>();
  readonly form = new FormGroup({ name: new FormControl('', { validators: [Validators.required], nonNullable: true }) });

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.save.emit(this.form.controls.name.value.trim());
    this.form.reset({ name: '' });
  }
}
