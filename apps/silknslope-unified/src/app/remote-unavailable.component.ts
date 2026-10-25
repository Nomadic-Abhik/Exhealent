import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'unified-remote-unavailable',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="remote-error" role="alert">
      <span class="error-mark" aria-hidden="true">!</span>
      <p class="eyebrow">Remote unavailable</p>
      <h1>This workspace area could not be loaded</h1>
      <p>
        The remote application did not respond. Your navigation is still available;
        try again later or return to the dashboard.
      </p>
      <a routerLink="/dashboard">Return to dashboard</a>
    </section>
  `,
  styles: [`
    .remote-error {
      max-width: 42rem;
      margin: 3rem auto;
      padding: 2.5rem;
      border: 1px solid var(--color-border, #e2e5e2);
      border-radius: 1rem;
      background: var(--color-surface, #fff);
      text-align: center;
    }
    .error-mark {
      display: inline-grid;
      width: 2.5rem;
      height: 2.5rem;
      place-items: center;
      border-radius: 50%;
      background: #fff0e8;
      color: #a54316;
      font-size: 1.4rem;
      font-weight: 700;
    }
    .eyebrow { margin: 1rem 0 0.5rem; color: var(--color-brand, #75533c); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h1 { margin: 0; font-size: clamp(1.4rem, 3vw, 2rem); }
    p:not(.eyebrow) { color: var(--color-muted, #66716b); line-height: 1.6; }
    a { display: inline-block; margin-top: 0.5rem; color: var(--color-brand, #75533c); font-weight: 700; }
  `]
})
export class RemoteUnavailableComponent {}
