import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface DistributorFormData {
  code: string;
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  active: boolean;
  promo: string;
  commissionPercent: number;
  totalCommission: number;
  unpaidCommission: number;
}

@Component({
    selector: 'app-add-distributor',
    templateUrl: './add-distributor.component.html',
    styleUrls: ['./add-distributor.component.scss'],
    standalone: false
})
export class AddDistributorComponent implements OnChanges {
  @Input() distributor: DistributorFormData | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() save = new EventEmitter<DistributorFormData>();

  distributorForm = new FormGroup({
    code: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    phone: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    startDate: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    endDate: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    active: new FormControl(true, { nonNullable: true }),
    promo: new FormControl('', { validators: [Validators.pattern('[A-Za-z0-9]+')], nonNullable: true }),
    commissionPercent: new FormControl(0, { nonNullable: true }),
    totalCommission: new FormControl(0, { nonNullable: true }),
    unpaidCommission: new FormControl(0, { nonNullable: true })
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['distributor']) {
      const nextValue = this.distributor ? { ...this.distributor } : this.getEmptyFormData();
      this.distributorForm.patchValue(nextValue, { emitEvent: false });
    }
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  onSubmit(): void {
    if (this.distributorForm.invalid) {
      this.distributorForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.distributorForm.getRawValue() as DistributorFormData);
  }

  private getEmptyFormData(): DistributorFormData {
    return {
      code: '',
      name: '',
      phone: '',
      startDate: '',
      endDate: '',
      active: true,
      promo: '',
      commissionPercent: 0,
      totalCommission: 0,
      unpaidCommission: 0
    };
  }
}
