// Derived catalogue data: joins products with their category and exposes helpers.
import { CATEGORIES } from './categories.js'
import { PRODUCTS } from './products.js'

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug)
export const categoryByName = (name) => CATEGORIES.find((c) => c.cat === name)

export const CATALOG = PRODUCTS.map((p) => ({ ...p, categorySlug: categoryByName(p.category).slug }))

export const productsInCategory = (slug) => CATALOG.filter((p) => p.categorySlug === slug)
export const countInCategory = (slug) => productsInCategory(slug).length
