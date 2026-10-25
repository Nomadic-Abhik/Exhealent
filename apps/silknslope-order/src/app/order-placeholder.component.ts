import { Component } from '@angular/core';

@Component({
  selector: 'orders-placeholder',
  standalone: true,
  template: `
    <section class="order-placeholder">
      <p class="eyebrow">Order management</p>
      <h1>Orders are coming soon</h1>
      <p>This independently deployed workspace is ready for future order features.</p>
      <span class="status">No order workflows are configured</span>
    </section>
  `,
  styles: [`
    .order-placeholder {
      max-width: 48rem;
      margin: 3rem auto;
      padding: clamp(2rem, 6vw, 4rem);
      border: 1px solid var(--color-border, #e4e1dc);
      border-radius: 1rem;
      background: var(--color-surface, #fff);
      text-align: center;
    }
    .eyebrow { color: var(--color-brand, #75533c); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
    h1 { margin: 0.5rem 0; font-size: clamp(1.8rem, 4vw, 2.5rem); }
    p:not(.eyebrow) { color: var(--color-muted, #71766f); line-height: 1.6; }
    .status { display: inline-block; margin-top: 1rem; padding: 0.45rem 0.7rem; border-radius: 99px; background: var(--color-subtle, #f0eeea); color: var(--color-muted, #71766f); font-size: 0.8rem; }
  `]
})
export class OrderPlaceholderComponent {}
