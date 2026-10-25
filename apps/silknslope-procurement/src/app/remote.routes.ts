import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="procurement-placeholder">
      <p>Procurement</p>
      <h1>Procurement workspace</h1>
      <span>Procurement workflows can be added here.</span>
    </section>
  `,
  styles: [`
    .procurement-placeholder {
      max-width: 48rem;
      margin: 3rem auto;
      padding: 3rem;
      border: 1px solid var(--color-border, #e4e1dc);
      border-radius: 1rem;
      background: var(--color-surface, #fff);
      color: var(--color-text, #2d302c);
      text-align: center;
    }

    p { color: var(--color-brand, #75533c); font-weight: 700; }
    span { color: var(--color-muted, #71766f); }
  `]
})
class ProcurementPlaceholderComponent {}

export const routes: Routes = [{ path: '', component: ProcurementPlaceholderComponent }];
