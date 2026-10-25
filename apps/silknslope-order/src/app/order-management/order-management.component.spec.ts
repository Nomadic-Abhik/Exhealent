import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementComponent } from './order-management.component';

describe('OrderManagementComponent', () => {
  let component: OrderManagementComponent;
  let fixture: ComponentFixture<OrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the order management screen', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('orders-manual-order')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('orders-review-orders')).toBeTruthy();
  });

  it('adds a manual order to current orders and moves it to past orders when completed', () => {
    const customerInput = fixture.nativeElement.querySelector('#customer') as HTMLInputElement;
    const productInput = fixture.nativeElement.querySelector('#product') as HTMLInputElement;
    const quantityInput = fixture.nativeElement.querySelector('#quantity') as HTMLInputElement;
    const deliveryDateInput = fixture.nativeElement.querySelector('#delivery-date') as HTMLInputElement;

    customerInput.value = 'Northstar Retail';
    customerInput.dispatchEvent(new Event('input'));
    productInput.value = 'Linen shirt';
    productInput.dispatchEvent(new Event('input'));
    quantityInput.value = '4';
    quantityInput.dispatchEvent(new Event('input'));
    deliveryDateInput.value = '2026-11-01';
    deliveryDateInput.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('form').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    const [order] = component.currentOrders();
    expect(order.customer).toBe('Northstar Retail');
    expect(order.product).toBe('Linen shirt');
    expect(order.quantity).toBe(4);
    expect(order.orderNumber).toMatch(/^ORD-\d+-1$/);
    expect(fixture.nativeElement.textContent).toContain('Northstar Retail');

    (fixture.nativeElement.querySelector('.complete-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('#past-orders-tab') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(component.currentOrders()).toHaveSize(0);
    expect(component.pastOrders()).toHaveSize(1);
    expect(component.pastOrders()[0].orderNumber).toBe(order.orderNumber);
    expect(component.pastOrders()[0].completedAt).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain(order.orderNumber);
  });
});
