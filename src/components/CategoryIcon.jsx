/* Small outline icons for category chips, keyed by the `kind` field in data/categories.js. */
const SHAPES = {
  chakra: <><circle cx="12" cy="12" r="2" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></>,
  flowerpot: <><circle cx="12" cy="7" r="3.2" /><circle cx="16.8" cy="10.6" r="3.2" /><circle cx="14.9" cy="16.3" r="3.2" /><circle cx="9.1" cy="16.3" r="3.2" /><circle cx="7.2" cy="10.6" r="3.2" /><circle cx="12" cy="12" r="1.8" /></>,
  sparkle: <path d="M12 2c.8 5.2 4.8 9.2 10 10-5.2.8-9.2 4.8-10 10-.8-5.2-4.8-9.2-10-10 5.2-.8 9.2-4.8 10-10Z" />,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  bomb: <><circle cx="10.5" cy="14" r="6.5" /><path d="m15 9.500 3.500-3.500M18.500 2.500V5M21.500 5.500H19M20.800 3.200l-1.500 1.500" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  gopuram: <path d="M12 2v3M9 5h6l1 4H8l1-4ZM7 9h10l1 5H6l1-5ZM5 14h14l1 7H4l1-7ZM10 21v-4h4v4" />,
  gift: <><rect x="3" y="9" width="18" height="12" rx="1" /><rect x="2" y="6" width="20" height="4" rx="1" /><path d="M12 6v15M12 6c-2-4-6-3-5 0 .5 1.500 3 1 5 0Zm0 0c2-4 6-3 5 0-.5 1.500-3 1-5 0Z" /></>,
  flame: <path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-7 1 1 2 2 3 3 0-3-1-5 0-8Z" />,
  rocket: <><path d="M12 2c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10ZM9 15l-3 4M15 15l3 4M12 17v5" /><circle cx="12" cy="9" r="1.500" /></>,
  rangoli: <path d="m12 3 4 4-4 4-4-4 4-4ZM12 13l4 4-4 4-4-4 4-4ZM3 12l4-4 4 4-4 4-4-4ZM13 12l4-4 4 4-4 4-4-4Z" />,
  matches: <><path d="M5 19 15 9" /><circle cx="17" cy="7" r="3" /></>,
}
const KIND = {
  chakra: 'chakra', flowerpot: 'flowerpot', pencil: 'sparkle', star: 'star', atom: 'bomb', sound: 'bomb', electric: 'bolt',
  string: 'gopuram', fancy: 'gift', sizzling: 'flame', singleshot: 'rocket', multishot: 'chakra', rangoli: 'rangoli',
  gift: 'gift', matches: 'matches', sparkler: 'sparkle', newfancy: 'sparkle',
}

export default function CategoryIcon({ kind, size = 22 }) {
  return (
    <svg className="icon cat-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {SHAPES[KIND[kind] ?? 'sparkle']}
    </svg>
  )
}
