export interface SkuMapping {
  productCode: string;
  processCode: string;
  categoryCode: string;
  productName: string;
}

export interface SkuProcessOption {
  code: string;
  name: string;
}

export interface SkuCategoryOption {
  code: string;
  name: string;
}

export interface ProductMasterEntry {
  code: string;
  name: string;
  shortDescription: string;
  detail: string;
  available: boolean;
  image: string;
}

export enum ProductAvailability {
  Active = 'Active',
  Inactive = 'Inactive'
}
