/** Respect the project subpath on GitHub Pages and the root in local development. */
export function sourceUrl(doc: 'rsm' | 'thesis', page = 1): string {
  return `${import.meta.env.BASE_URL}sources/${doc}.pdf#page=${page}`;
}
