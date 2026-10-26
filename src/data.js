// Placeholder content for the design preview.
// Replace prices, products and reviews with the client's real data before launch.

export const issues = [
  { id: 'screen', label: 'Screen', time: '45 min' },
  { id: 'battery', label: 'Battery', time: '30 min' },
  { id: 'port', label: 'Charging port', time: '60 min' },
  { id: 'back', label: 'Back glass', time: '2 h' },
  { id: 'camera', label: 'Camera', time: '60 min' },
  { id: 'water', label: 'Water damage', time: '24 h' },
]

// Price per issue in EUR; null = quote on request.
export const catalog = {
  Apple: {
    'iPhone 16 Pro': { screen: 299, battery: 109, port: 129, back: 189, camera: 179, water: null },
    'iPhone 16': { screen: 239, battery: 99, port: 119, back: 159, camera: 149, water: null },
    'iPhone 15 Pro': { screen: 279, battery: 99, port: 119, back: 179, camera: 169, water: null },
    'iPhone 15': { screen: 219, battery: 89, port: 109, back: 149, camera: 139, water: null },
    'iPhone 14': { screen: 179, battery: 79, port: 99, back: 129, camera: 119, water: null },
    'iPhone 13': { screen: 149, battery: 69, port: 89, back: 109, camera: 99, water: null },
    'iPhone 12': { screen: 119, battery: 65, port: 79, back: 99, camera: 89, water: null },
    'iPhone 11': { screen: 89, battery: 59, port: 69, back: 79, camera: 79, water: null },
  },
  Samsung: {
    'Galaxy S25 Ultra': { screen: 329, battery: 99, port: 109, back: 99, camera: 169, water: null },
    'Galaxy S24': { screen: 229, battery: 89, port: 99, back: 89, camera: 129, water: null },
    'Galaxy S23': { screen: 199, battery: 79, port: 89, back: 79, camera: 119, water: null },
    'Galaxy A55': { screen: 129, battery: 65, port: 69, back: 59, camera: 89, water: null },
    'Galaxy A35': { screen: 109, battery: 59, port: 65, back: 55, camera: 79, water: null },
  },
  Xiaomi: {
    'Xiaomi 14': { screen: 189, battery: 69, port: 79, back: 69, camera: 109, water: null },
    'Redmi Note 13 Pro': { screen: 99, battery: 55, port: 59, back: 49, camera: 69, water: null },
    'Redmi Note 13': { screen: 79, battery: 49, port: 55, back: 45, camera: 59, water: null },
  },
  'Google Pixel': {
    'Pixel 9 Pro': { screen: 249, battery: 89, port: 99, back: 109, camera: 149, water: null },
    'Pixel 8': { screen: 169, battery: 79, port: 89, back: 89, camera: 119, water: null },
  },
  Other: {
    'Tablet / iPad': { screen: null, battery: null, port: null, back: null, camera: null, water: null },
    'Laptop / MacBook': { screen: null, battery: null, port: null, back: null, camera: null, water: null },
  },
}

export const services = [
  { icon: 'screen', title: 'Screen replacement', text: 'Cracked, black or flickering display — replaced with original-quality glass.', from: 79 },
  { icon: 'battery', title: 'Battery replacement', text: 'Phone dying by noon? New battery, full day back, in 30 minutes.', from: 49 },
  { icon: 'port', title: 'Charging port', text: 'Loose cable or no charge — cleaned or replaced and tested.', from: 55 },
  { icon: 'water', title: 'Water damage', text: 'Ultrasonic cleaning and board-level diagnostics. Bring it in fast.', from: null },
  { icon: 'camera', title: 'Camera & lens', text: 'Blurry photos, cracked lens or a camera that won’t open.', from: 59 },
  { icon: 'laptop', title: 'Laptops & tablets', text: 'Screens, keyboards, batteries and SSD upgrades for laptops and iPads.', from: 69 },
  { icon: 'data', title: 'Data recovery', text: 'Photos and contacts rescued from dead or damaged devices.', from: null },
  { icon: 'software', title: 'Software & setup', text: 'Updates, virus removal, data transfer to your new phone.', from: 25 },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cases', label: 'Cases' },
  { id: 'protection', label: 'Screen protection' },
  { id: 'power', label: 'Charging' },
  { id: 'audio', label: 'Audio' },
  { id: 'refurb', label: 'Refurbished' },
]

export const products = [
  { id: 'p1', cat: 'cases', name: 'Clear MagSafe Case', meta: 'iPhone 15 / 16', price: 24.9, tag: 'Bestseller', hue: 200 },
  { id: 'p2', cat: 'protection', name: 'Tempered Glass 9H', meta: 'Fitted in store for free', price: 14.9, tag: null, hue: 160 },
  { id: 'p3', cat: 'power', name: '30W USB-C Fast Charger', meta: 'GaN · compact', price: 29.9, tag: null, hue: 40 },
  { id: 'p4', cat: 'refurb', name: 'iPhone 14 — Refurbished', meta: '128 GB · Grade A · 12-mo warranty', price: 449, tag: 'Like new', hue: 260 },
  { id: 'p5', cat: 'audio', name: 'Wireless Earbuds Pro', meta: 'ANC · 30 h battery', price: 59.9, tag: null, hue: 320 },
  { id: 'p6', cat: 'cases', name: 'Rugged Armor Case', meta: 'Galaxy S24 / S25', price: 22.9, tag: null, hue: 15 },
  { id: 'p7', cat: 'power', name: '10,000 mAh Power Bank', meta: 'MagSafe compatible', price: 39.9, tag: 'New', hue: 90 },
  { id: 'p8', cat: 'protection', name: 'Privacy Screen Glass', meta: 'Anti-spy filter', price: 19.9, tag: null, hue: 220 },
  { id: 'p9', cat: 'refurb', name: 'Galaxy S23 — Refurbished', meta: '256 GB · Grade A · 12-mo warranty', price: 399, tag: null, hue: 280 },
  { id: 'p10', cat: 'power', name: 'Braided USB-C Cable 2 m', meta: '60W · lifetime swap', price: 12.9, tag: null, hue: 180 },
  { id: 'p11', cat: 'audio', name: 'Bluetooth Speaker Mini', meta: 'IP67 · 12 h', price: 34.9, tag: null, hue: 350 },
  { id: 'p12', cat: 'cases', name: 'Leather Wallet Case', meta: 'iPhone 13 – 16', price: 32.9, tag: null, hue: 30 },
]

// Sample review layout only — swap in real Google reviews (with permission) before launch.
export const reviews = [
  { name: 'Sample review', initials: 'AB', text: 'Placeholder: a short quote about a fast screen repair and friendly service goes here.', device: 'iPhone 14 · Screen' },
  { name: 'Sample review', initials: 'CD', text: 'Placeholder: a quote about a battery replacement done while waiting goes here.', device: 'Galaxy S23 · Battery' },
  { name: 'Sample review', initials: 'EF', text: 'Placeholder: a quote about a fair price and the warranty goes here.', device: 'MacBook Air · Keyboard' },
]

export const faqs = [
  { q: 'Do I need an appointment?', a: 'No — walk-ins are welcome. Booking online reserves your part and a time slot, so it’s usually faster.' },
  { q: 'What parts do you use?', a: 'Original or premium-grade parts tested before fitting. We tell you exactly which option you get and the price difference.' },
  { q: 'Will I lose my data?', a: 'Most repairs don’t touch your data. We still recommend a backup and will tell you before any repair that could affect it.' },
  { q: 'What does the warranty cover?', a: '6 months on the replaced part and our workmanship. Accidental damage after the repair is not covered.' },
  { q: 'Do you offer pick-up and delivery?', a: 'Yes — courier pick-up and return anywhere in Cyprus. Price shown at checkout.' },
]
