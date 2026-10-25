import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ProductMasterEntry } from './sku.models';

export enum ProductSkuStatus {
  Active = 0,
  Inactive = 1
}

interface ProductSkuDto {
  id?: string | null;
  productCode: string;
  productName: string;
  productDescription: string;
  productDetail: string | null;
  productImage: string;
  status?: ProductSkuStatus | null;
  addedBy?: string | null;
  addedOn?: string;
  modifiedBy?: string | null;
  modifiedOn?: string;
}

const SKU_MANAGEMENT_API_URL = 'http://localhost:5220/api/SkuManagement';

@Injectable({ providedIn: 'root' })
export class SkuManagementService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<ProductMasterEntry[]> {
    return this.http.get<ProductSkuDto[]>(SKU_MANAGEMENT_API_URL).pipe(
      map((products) => products.map((product) => this.fromDto(product)))
    );
  }

  getProduct(productCode: string): Observable<ProductMasterEntry> {
    return this.http.get<ProductSkuDto>(
      `${SKU_MANAGEMENT_API_URL}/${encodeURIComponent(productCode)}`
    ).pipe(map((product) => this.fromDto(product)));
  }

  createProduct(product: ProductMasterEntry): Observable<ProductMasterEntry> {
    return this.http.post<ProductSkuDto>(
      `${SKU_MANAGEMENT_API_URL}/create-product-sku`,
      this.toDto(product)
    ).pipe(map((createdProduct) => ({
      ...this.fromDto(createdProduct),
      shortDescription: product.shortDescription
    })));
  }

  updateProduct(productCode: string, product: ProductMasterEntry): Observable<void> {
    return this.http.put<void>(
      `${SKU_MANAGEMENT_API_URL}/${encodeURIComponent(productCode)}`,
      this.toDto(product)
    );
  }

  deleteProduct(productCode: string): Observable<void> {
    return this.http.delete<void>(
      `${SKU_MANAGEMENT_API_URL}/${encodeURIComponent(productCode)}`
    );
  }

  private toDto(product: ProductMasterEntry): Omit<ProductSkuDto, 'id' | 'addedBy' | 'addedOn' | 'modifiedBy' | 'modifiedOn'> {
    return {
      productCode: product.code,
      productName: product.name,
      productDescription: product.shortDescription,
      productDetail: product.detail,
      productImage: product.image,
      status: product.available ? ProductSkuStatus.Active : ProductSkuStatus.Inactive
    };
  }

  private fromDto(dto: ProductSkuDto): ProductMasterEntry {
    if (dto.status !== ProductSkuStatus.Active && dto.status !== ProductSkuStatus.Inactive) {
      throw new Error(`Product "${dto.productCode}" has an unsupported or missing status.`);
    }

    return {
      code: dto.productCode,
      name: dto.productName,
      shortDescription: dto.productDescription,
      detail: dto.productDetail ?? '',
      available: dto.status === ProductSkuStatus.Active,
      image: dto.productImage
    };
  }
}
