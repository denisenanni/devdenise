export { ubuntuTheme } from './ubuntu';
export { fedoraTheme } from './fedora';
export { mintTheme } from './mint';
export { archTheme } from './arch';

import { ubuntuTheme } from './ubuntu';
import { fedoraTheme } from './fedora';
import { mintTheme } from './mint';
import { archTheme } from './arch';
import type { DistroName, DistroTheme } from '../types';

export const distroThemes: Record<DistroName, DistroTheme> = {
  ubuntu: ubuntuTheme,
  fedora: fedoraTheme,
  mint: mintTheme,
  arch: archTheme,
};

export const distroOrder: DistroName[] = ['ubuntu', 'fedora', 'mint', 'arch'];
