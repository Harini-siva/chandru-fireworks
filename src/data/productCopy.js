// Short descriptions shown on product cards. Product-specific text wins; otherwise the category line is used.
// Edit or add entries here (key = product id) without touching any component.
const BY_PRODUCT = {
  1: 'Compact sparrow crackers for a lively celebration, bringing traditional festive excitement to every occasion.',
  2: 'A larger sparrow cracker option for festive gatherings and special celebrations.',
  3: 'A larger-format traditional cracker for adding excitement to your festive moments.',
  4: 'Traditional festive crackers that complement family celebrations and special occasions.',
}

const BY_CATEGORY = {
  'sound-crackers': 'Loud, classic crackers that bring traditional festive excitement to every occasion.',
  'ground-chakaras': 'Colourful ground spinners that whirl out bright, beautiful patterns.',
  'flower-pots': 'Fountain-style fireworks that bloom into a shower of colourful sparks.',
  'colour-pencil': 'Bright, colourful pencil fireworks that are a joy for the whole family.',
  'twinkling-star': 'Sparkling star-effect crackers that light up every celebration.',
  'atom-bombs': 'Classic sound crackers with a big festive bang.',
  'electric-crackers': 'Popular electric crackers, available in a range of varieties.',
  'pandiyan-crackers': 'Trusted Pandiyan fireworks in different varieties and sizes.',
  'fancy-items': 'Special fancy fireworks for colourful and memorable celebrations.',
  'sizzling-series': 'Sizzling fireworks with bright, eye-catching visual effects.',
  'multicolour-single-shot': 'Single-shot fireworks that burst into beautiful multicolour effects.',
  'multicolour-shots': 'Multi-shot fireworks that turn the sky into a spectacular show.',
  'rangoli-series': 'Fireworks inspired by the colours and patterns of rangoli.',
  'colour-matches': 'Colourful match crackers in a variety of styles.',
  'fancy-sparklers': 'Fancy sparklers that add extra brightness to your celebration.',
  'new-fancy-crackers': 'New and exciting fancy crackers from our latest collection.',
}

export function describeProduct(product) {
  if (BY_PRODUCT[product.id]) return BY_PRODUCT[product.id]
  if (product.categorySlug === 'pandiyan-gift-box') {
    const n = product.name.match(/\d+/)?.[0]
    return `Specially packed box with ${n} assorted fireworks, ready to gift and enjoy at festive celebrations.`
  }
  return BY_CATEGORY[product.categorySlug] ?? 'Quality crackers for a bright and joyful celebration.'
}
