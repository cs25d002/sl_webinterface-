import type { HospitalService } from '../types/hospital';

const PLACEHOLDER_URL_PATTERNS = [/replace-with-/i, /example\.com/i, /localhost-placeholder/i];

export function isPlaceholderUrl(url: string): boolean {
  return PLACEHOLDER_URL_PATTERNS.some((pattern) => pattern.test(url));
}

export function isServiceActionable(service: HospitalService): boolean {
  return service.status === 'active' && Boolean(service.url) && !isPlaceholderUrl(service.url);
}

export function getServiceDisabledReason(service: HospitalService): string | null {
  if (service.status === 'coming-soon') {
    return 'This service is coming soon.';
  }
  if (service.status === 'inactive') {
    return 'This service is not currently available.';
  }
  if (!service.url || isPlaceholderUrl(service.url)) {
    return 'Deployment URL not configured';
  }
  return null;
}

export function openService(service: HospitalService): void {
  if (!isServiceActionable(service)) {
    return;
  }

  if (service.openMode === 'new-tab') {
    window.open(service.url, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.assign(service.url);
}

export function getServiceHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
