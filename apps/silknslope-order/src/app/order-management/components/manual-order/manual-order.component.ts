import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';

@Component({
  selector: 'orders-manual-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manual-order.component.html',
  styleUrl: './manual-order.component.scss'
})
export class ManualOrderComponent {
  @Output() readonly orderCreated = new EventEmitter<Omit<Order, 'orderNumber' | 'createdAt'>>();

  readonly orderForm = this.formBuilder.nonNullable.group({
    customer: ['', [Validators.required, Validators.maxLength(100)]],
    product: ['', [Validators.required, Validators.maxLength(100)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    deliveryDate: ['', Validators.required]
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  createOrder(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.orderCreated.emit(this.orderForm.getRawValue());
    this.orderForm.reset({ customer: '', product: '', quantity: 1, deliveryDate: '' });
  }
}
