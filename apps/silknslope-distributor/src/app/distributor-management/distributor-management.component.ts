import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Distributor {
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
    selector: 'app-distributor-management',
    templateUrl: './distributor-management.component.html',
    styleUrls: ['./distributor-management.component.scss'],
    standalone: false
})
export class DistributorManagementComponent {
  distributors: Distributor[] = [
    {
      code: 'DS-001',
      name: 'Alpha Distribution',
      phone: '+1 (555) 230-0147',
      startDate: '2025-01-10',
      endDate: '2025-12-31',
      active: true,
      promo: 'A1B2C3',
      commissionPercent: 10,
      totalCommission: 12500,
      unpaidCommission: 2100
    },
    {
      code: 'DS-002',
      name: 'BlueWave Supply',
      phone: '+1 (555) 902-1185',
      startDate: '2025-02-14',
      endDate: '2026-02-13',
      active: true,
      promo: 'P9Q2R4',
      commissionPercent: 12,
      totalCommission: 18400,
      unpaidCommission: 3050
    },
    {
      code: 'DS-003',
      name: 'CityMart Channels',
      phone: '+1 (555) 342-8854',
      startDate: '2024-11-01',
      endDate: '2025-10-31',
      active: false,
      promo: 'M7X2K5',
      commissionPercent: 8,
      totalCommission: 7900,
      unpaidCommission: 1200
    }
  ];

  searchControl = new FormControl('');
  selectedDistributor: Distributor | null = null;
  formMode: 'add' | 'edit' = 'add';
  currentPage = 1;
  pageSize = 5;

  addDistributor(): void {
    this.formMode = 'add';
    this.selectedDistributor = {
      code: this.generateNextCode(),
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

  editDistributor(distributor: Distributor): void {
    this.formMode = 'edit';
    this.selectedDistributor = { ...distributor };
  }

  get filteredDistributors(): Distributor[] {
    const search = (this.searchControl.value ?? '').trim().toLowerCase();

    if (!search) {
      return this.distributors;
    }

    return this.distributors.filter((distributor) =>
      distributor.name.toLowerCase().includes(search)
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredDistributors.length / this.pageSize));
  }

  get paginatedDistributors(): Distributor[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredDistributors.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1) {
      page = 1;
    }

    if (page > this.totalPages) {
      page = this.totalPages;
    }

    this.currentPage = page;
  }

  saveDistributor(distributor: Distributor): void {
    if (this.formMode === 'add') {
      this.distributors = [...this.distributors, { ...distributor }];
    } else {
      this.distributors = this.distributors.map((item) =>
        item.code === distributor.code ? { ...distributor } : item
      );
    }

    this.currentPage = 1;
    this.selectedDistributor = { ...distributor };
  }

  private generateNextCode(): string {
    const codes = this.distributors
      .map((distributor) => distributor.code)
      .filter((code) => /^DS-\d+$/.test(code));

    if (!codes.length) {
      return 'DS-001';
    }

    const maxNumber = codes
      .map((code) => Number(code.replace('DS-', '')))
      .reduce((max, current) => Math.max(max, current), 0);

    return `DS-${String(maxNumber + 1).padStart(3, '0')}`;
  }
}
