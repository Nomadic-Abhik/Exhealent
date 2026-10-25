import { initFederation } from '@angular-architects/native-federation';

// The manifest is a deploy-time asset so environment-specific remote entry
// locations can be supplied without rebuilding the shell.
initFederation('federation.manifest.json')
  .catch((error) => console.error('Could not initialize the federation manifest.', error))
  .then(() => import('./bootstrap'))
  .catch((error) => console.error('Could not start SilknSlope Unified.', error));
