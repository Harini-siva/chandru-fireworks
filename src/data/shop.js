// Shop details come from the shop's poster. Edit here; nothing else in the code hard-codes them.
export const SHOP = {
  name: 'Chandru Crackers',
  tamil: 'சந்துரு பட்டாசுக்கடை',
  parent: 'அமுதம் பட்டாசுக்கடை – பெருமைமிகு கிளை',
  tag: 'பாரம்பரியத்தின் வாரிசு… நம்பிக்கையின் வளர்ப்பு…',
  place: 'நொச்சிக்காடு',
  brand: 'Pandyan Crackers (Singam) – direct seller',
  owner: 'R. Soundararajan, Vilangalpattu',
  address: 'Behind Velan Koottuuravu Sangam, Nainarpettai Road, Naduveerapattu, Cuddalore – 607102',
  phones: ['9025386585', '9585619494', '7639936092'],
  logo: '/images/logo.png',
  offer: '30% to 35% discount for customers who visit 10 days before Diwali',
  festival: '2026-11-08T00:00:00',
  festivalName: 'Diwali 2026',
  hours: '24/7 Shop Open',
  // Add real links here to show social icons in the footer, e.g. { instagram: 'https://…', facebook: 'https://…' }
  social: {},
}

export const NAV = [
  { label: 'Home', to: '/#home' },
  { label: 'Categories', to: '/#categories' },
  { label: 'Collections', to: '/#collections' },
  { label: 'Price List', to: '/price-list' },
  { label: 'About', to: '/#about' },
  { label: 'Visit Us', to: '/#visit' },
]

export const COLLECTIONS = [
  { slug: 'family', image: '/assets/collections/family.jpg', title: 'Family Celebration', kind: 'flowerpot', blurb: 'Fountains, spinners and gift boxes the whole family can enjoy together.', cats: ['Flower Pots', 'Ground Chakaras', 'Pandiyan Gift Box'] },
  { slug: 'kids', image: '/assets/collections/kids.jpg', title: 'Kids Celebration', kind: 'sparkler', blurb: 'Sparkling, colourful picks for little celebrations, always with an adult in charge.', cats: ['Twinkling Star', 'Colour Pencil', 'Fancy Sparklers'] },
  { slug: 'grand', image: '/assets/collections/grand.jpg', title: 'Grand Celebration', kind: 'multishot', blurb: 'Big colour shots and fancy items for the biggest moments of the night.', cats: ['Multicolour Shots', 'Multicolour Single Shot', 'Fancy Items'] },
  { slug: 'festival', image: '/assets/collections/festival.jpg', title: 'Festival Special', kind: 'sound', blurb: 'The festive classics: crackling sound crackers and everyday favourites.', cats: ['Pandiyan Crackers', 'Sound Crackers', 'Atom Bombs'] },
  { slug: 'new', image: '/assets/collections/new arrivals.jpg', title: 'New Arrivals', kind: 'newfancy', blurb: 'Fresh fancy crackers and sizzling effects from the latest collection.', cats: ['New Fancy Crackers', 'Sizzling Series'] },
  { slug: 'combo', image: '/assets/collections/combo.jpg', title: 'Combo Collections', kind: 'gift', blurb: 'Ready-packed gift boxes with a mix of fireworks in one box.', cats: ['Pandiyan Gift Box'] },
]

export const WHY = [
  { icon: 'shield', title: 'Premium Quality', text: 'Carefully selected fireworks you can celebrate with confidence.' },
  { icon: 'burst', title: 'Wide Product Range', text: 'From sparklers to sound crackers and colour shots, all in one place.' },
  { icon: 'check', title: 'Safe & Reliable', text: 'Trusted branch of Amutham Crackers, built on dependable service.' },
  { icon: 'box', title: 'Quality Packaging', text: 'Neatly packed boxes and gift sets that are ready to carry home.' },
  { icon: 'lamp', title: 'Festive Collections', text: 'Curated collections for family, kids and grand celebrations.' },
  { icon: 'chat', title: 'Customer Support', text: 'Ask us anything on WhatsApp or call the shop directly.' },
]

export const SAFETY = [
  'Follow the safety instructions provided with each product.',
  'Use fireworks responsibly, in open areas.',
  'Keep fireworks away from children and supervise at all times.',
  'Maintain a safe distance while lighting and watching fireworks.',
  'Follow all applicable safety guidelines and local rules.',
]

// Background videos live in /public/videos. `start` (seconds), `flip` and `tint` give each section its own look from the same footage.
export const SPOTLIGHT = [
  { slug: 'multicolour-shots', eyebrow: 'Grand finale', line: 'Colour shots that paint the whole sky.', video: '/videos/multicolour-shots.mp4', start: 0 },
  { slug: 'flower-pots', eyebrow: 'Family favourite', line: 'Fountains of golden sparks for the courtyard.', video: '/videos/flower-pots.mp4',  start: 2.5, flip: true },
  { slug: 'sound-crackers', eyebrow: 'Festival classic', line: 'The crackle that says the festival has begun.', video: '/videos/sound-crackers.mp4', start: 4, flip: true, tint: 'warm' },
]
