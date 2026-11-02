import { SHOP } from '../data/shop.js'

// wa.me links open the WhatsApp app on mobile and WhatsApp Web / Desktop on computers.
export const wa = (msg) => `https://wa.me/91${SHOP.phones[0]}?text=${encodeURIComponent(msg)}`

export const productEnquiry = (name) => wa(`Hi, I would like to know more about ${name}.`)
export const generalEnquiry = () => wa('Hi, I would like to enquire about your crackers.')
export const mapsLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.address)}`
