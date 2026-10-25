import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { filter } from 'rxjs';
import { ShellNavigationLink } from '@silknslope/contracts';

@Component({
  selector: 'unified-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isNavigating = false;
  theme: 'light' | 'dark' = 'light';

  readonly navigation: ShellNavigationLink[] = [
    { label: 'Dashboard', path: '/dashboard', exact: true },
    { label: 'Distributors', path: '/distributors' },
    { label: 'Procurement', path: '/procurement' },
    { label: 'Inventory', path: '/inventory/inventory-management' },
    { label: 'SKU management', path: '/inventory/sku-management' },
    { label: 'Orders', path: '/orders' }
  ];

  constructor(router: Router, @Inject(DOCUMENT) private readonly document: Document) {
    router.events
      .pipe(filter((event) =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ))
      .subscribe((event) => this.isNavigating = event instanceof NavigationStart);

    this.applyTheme();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private applyTheme(): void {
    this.document.documentElement.dataset['theme'] = this.theme;
  }
}
