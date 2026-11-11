/**
 * Sample photography is hot-linked from Unsplash (free licence). The host is
 * allowed in next.config.ts; swap this helper out when real media exists.
 */
export function unsplash(photoId: string, width = 2000) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}
