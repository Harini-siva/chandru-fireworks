// Resolves optional real photos. Any image placed under src/assets/ is fingerprinted and optimised by Vite.
// Data files reference photos as "/assets/products/<category>/<file>.jpg"; the extension is ignored when matching.
const files = import.meta.glob(['/src/assets/**/*.{jpg,jpeg,png,webp,avif}', '!/src/assets/logo/**'], { eager: true, query: '?url', import: 'default' })

const index = {}
for (const [path, url] of Object.entries(files)) {
  index[path.replace('/src/assets/', '').replace(/\.[^.]+$/, '').toLowerCase()] = url
}

export const resolveImage = (path) =>
  path ? index[path.replace(/^\/?assets\//, '').replace(/\.[^.]+$/, '').toLowerCase()] : undefined

// Every photo dropped into a folder (e.g. "shop"), sorted by file name.
export const imagesInFolder = (folder) =>
  Object.entries(index)
    .filter(([key]) => key.startsWith(folder.replace(/\/$/, '').toLowerCase() + '/'))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, url]) => ({ key, url }))
