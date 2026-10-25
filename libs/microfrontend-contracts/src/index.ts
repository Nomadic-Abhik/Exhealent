/**
 * Stable shell-owned navigation metadata shared across the workspace.
 * Bump this version when a breaking host/remote integration change is made.
 */
export const MICROFRONTEND_CONTRACT_VERSION = '1.0.0';

export interface ShellNavigationLink {
  label: string;
  path: string;
  exact?: boolean;
}

export interface RemoteDefinition {
  name: string;
  routePath: string;
  exposedModule: './Routes';
  navigationLabel: string;
}
