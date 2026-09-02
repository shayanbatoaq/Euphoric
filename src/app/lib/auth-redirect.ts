export function getAuthRedirectOrigin() {
  const browserOrigin = window.location.origin;
  const browserHost = window.location.hostname;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const isInternalHost = (host: string) =>
    host === "0.0.0.0" || host === "127.0.0.1";

  // Prefer the real public origin when the app is opened through a deployed
  // hostname, even if a hosting platform injected an internal bind address.
  if (browserOrigin && !isInternalHost(browserHost)) {
    return browserOrigin;
  }

  if (process.env.NODE_ENV === "development") {
    return configuredOrigin || "http://localhost:3000";
  }

  if (configuredOrigin) {
    try {
      if (!isInternalHost(new URL(configuredOrigin).hostname)) {
        return configuredOrigin;
      }
    } catch {
      // Fall through to the canonical production URL for malformed config.
    }
  }

  return "https://euphoric.pk";
}
