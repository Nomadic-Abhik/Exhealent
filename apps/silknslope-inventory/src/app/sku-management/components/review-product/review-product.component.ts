import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductMasterEntry } from '../../sku.models';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss'],
  standalone: false
})
export class ReviewProductComponent {
  @Input() products: ProductMasterEntry[] = [];
  @Input() selectedProduct: ProductMasterEntry | null = null;
  @Output() edit = new EventEmitter<ProductMasterEntry>();

  selectProduct(product: ProductMasterEntry): void {
    this.edit.emit(product);
  }
}
