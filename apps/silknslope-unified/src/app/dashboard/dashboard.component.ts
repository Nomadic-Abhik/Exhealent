import { Component } from '@angular/core';

interface SalesMetric {
  label: string;
  value: string;
  trend: string;
  accent: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent {
  summaryMetrics: SalesMetric[] = [
    { label: 'Monthly Sales Total', value: '₹84,500', trend: '+12.4% vs last month', accent: 'blue' },
    { label: 'Online Sales', value: '₹48,900', trend: '+15.2% vs last month', accent: 'purple' },
    { label: 'Offline Sales', value: '₹35,600', trend: '+9.3% vs last month', accent: 'teal' }
  ];

  categoryMetrics: SalesMetric[] = [
    { label: 'Tea', value: '₹26,800', trend: '+8.1% vs last month', accent: 'green' },
    { label: 'Coffee', value: '₹31,200', trend: '+10.6% vs last month', accent: 'orange' },
    { label: 'Dry Fruit', value: '₹22,400', trend: '+6.9% vs last month', accent: 'amber' }
  ];
}
