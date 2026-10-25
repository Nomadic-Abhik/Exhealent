import { TestBed } from '@angular/core/testing';
import { CreatePurchaseOrderComponent } from './create-purchase-order.component';

describe('CreatePurchaseOrderComponent', () => {
  it('calculates total procurement cost from unit price, quantity, and charges', async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePurchaseOrderComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(CreatePurchaseOrderComponent);
    const component = fixture.componentInstance;
    component.purchaseOrderForm.patchValue({
      price: 10.5,
      quantity: 3,
      deliveryMiscCharge: 2,
      totalTax: 1.5,
      miscCharge: 3
    });

    expect(component.totalProcurementCost).toBe(38);
  });
});
