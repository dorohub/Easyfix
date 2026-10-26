// Store facts taken from easyfixcy.com (October 2026).

export const contact = {
  phone: '+357 96 633328',
  phoneHref: 'tel:+35796633328',
  whatsapp: 'https://wa.me/35796633328',
  email: 'mobile@easyfixcy.com',
}

export const stores = [
  {
    id: 'limassol',
    name: { en: 'Zinas Kanther', el: 'Ζήνας Κάνθερ', ru: 'Zinas Kanther' },
    address: { en: 'Zinas Kanther 2, 3035 Limassol', el: 'Ζήνας Κάνθερ 2, 3035 Λεμεσός', ru: 'Zinas Kanther 2, 3035 Limassol' },
    map: 'https://www.google.com/maps/search/?api=1&query=Zinas+Kanther+2,+3035+Limassol',
    wolt: 'https://wolt.com/el/cyp/limassol/venue/easyfix-mobile-phones-accessories',
  },
  {
    id: 'germasogeia',
    name: { en: 'Germasogeia', el: 'Γερμασόγεια', ru: 'Germasogeia' },
    address: { en: 'Georgiou A 14, 4047 Germasogeia', el: 'Γεωργίου Α 14, 4047 Γερμασόγεια', ru: 'Georgiou A 14, 4047 Germasogeia' },
    map: 'https://www.google.com/maps/search/?api=1&query=Georgiou+A+14,+4047+Germasogeia',
    wolt: 'https://wolt.com/el/cyp/limassol/venue/easy-fix-mobile-phones-accessories-germasogeia',
  },
]

// Same order as the orange category bar on the current site.
export const categories = [
  { slug: 'new-devices', icon: 'phone', name: { en: 'New Devices', el: 'Νέες Συσκευές', ru: 'Новые устройства' } },
  { slug: 'used-devices', icon: 'refresh', name: { en: 'Used Devices', el: 'Μεταχειρισμένες Συσκευές', ru: 'Б/у устройства' } },
  { slug: 'gsm-parts-repair', icon: 'chip', name: { en: 'GSM Parts & Accessories', el: 'Ανταλλακτικά & Αξεσουάρ GSM', ru: 'Запчасти GSM' } },
  { slug: 'accessories', icon: 'headphones', name: { en: 'Accessories', el: 'Αξεσουάρ', ru: 'Аксессуары' } },
  { slug: 'ipad-tablets', icon: 'tablet', name: { en: 'iPad & Tablets', el: 'iPad & Tablets', ru: 'iPad и планшеты' } },
  { slug: 'repair-tools', icon: 'tools', name: { en: 'Repair Tools', el: 'Εργαλεία Επισκευής', ru: 'Инструменты' } },
  { slug: 'smart-home', icon: 'home', name: { en: 'Smart Home', el: 'Έξυπνο Σπίτι', ru: 'Умный дом' } },
  { slug: 'vision', icon: 'eye', name: { en: 'Vision', el: 'Vision', ru: 'Vision' } },
  { slug: 'appliances', icon: 'plug', name: { en: 'Appliances', el: 'Συσκευές', ru: 'Бытовая техника' } },
  { slug: 'health-beauty', icon: 'heart', name: { en: 'Health & Beauty', el: 'Υγεία & Ομορφιά', ru: 'Здоровье и красота' } },
  { slug: 'computers-it', icon: 'laptop', name: { en: 'Computers & IT', el: 'Υπολογιστές & IT', ru: 'Компьютеры и IT' } },
  { slug: 'display-screens', icon: 'screen', name: { en: 'Display / Screens', el: 'Οθόνες', ru: 'Дисплеи' } },
  { slug: 'others-root', icon: 'grid', name: { en: 'Others', el: 'Άλλα', ru: 'Другое' } },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export const heroSlides = [
  {
    id: 'samsung',
    image: '/hero/samsung.jpg',
    to: '/category/new-devices',
    eyebrow: 'SAMSUNG GALAXY',
    title: { en: 'Galaxy Unleashed.', el: 'Galaxy Χωρίς Όρια.', ru: 'Galaxy без границ.' },
    accent: { en: 'Bigger. Bolder.', el: 'Πιο μεγάλο. Πιο τολμηρό.', ru: 'Больше. Смелее.' },
    lead: { en: 'Flagships & parts in stock.', el: 'Κορυφαία μοντέλα & ανταλλακτικά.', ru: 'Флагманы и запчасти в наличии.' },
    text: {
      en: 'Galaxy S, A and Tab series — devices, displays and genuine-quality spares.',
      el: 'Σειρές Galaxy S, A και Tab — συσκευές, οθόνες και ποιοτικά ανταλλακτικά.',
      ru: 'Серии Galaxy S, A и Tab — устройства, дисплеи и качественные запчасти.',
    },
  },
  {
    id: 'xiaomi',
    image: '/hero/xiaomi.jpg',
    to: '/shop?brand=Xiaomi',
    eyebrow: 'XIAOMI & REDMI',
    title: { en: 'More For Less.', el: 'Περισσότερα για λιγότερα.', ru: 'Больше за меньшее.' },
    accent: { en: 'Smart value.', el: 'Έξυπνη αξία.', ru: 'Разумная цена.' },
    lead: { en: 'Redmi, Note & Poco ranges.', el: 'Σειρές Redmi, Note & Poco.', ru: 'Линейки Redmi, Note и Poco.' },
    text: {
      en: 'Xiaomi phones and thousands of Redmi spare parts at wholesale prices.',
      el: 'Κινητά Xiaomi και χιλιάδες ανταλλακτικά Redmi σε τιμές χονδρικής.',
      ru: 'Смартфоны Xiaomi и тысячи запчастей Redmi по оптовым ценам.',
    },
  },
  {
    id: 'repair',
    image: null, // rendered as a graphic slide (no photo on the current site)
    to: '/repairs',
    eyebrow: 'GSM REPAIR SERVICE',
    title: { en: 'Fix It Right.', el: 'Σωστή επισκευή.', ru: 'Ремонт как надо.' },
    accent: { en: 'First time.', el: 'Από την πρώτη φορά.', ru: 'С первого раза.' },
    lead: { en: 'Same-day repairs in Limassol.', el: 'Επισκευές αυθημερόν στη Λεμεσό.', ru: 'Ремонт в день обращения в Лимасоле.' },
    text: {
      en: 'Screens, batteries, charging ports and board-level work by experienced technicians.',
      el: 'Οθόνες, μπαταρίες, θύρες φόρτισης και επισκευές πλακέτας από έμπειρους τεχνικούς.',
      ru: 'Экраны, аккумуляторы, разъёмы зарядки и ремонт плат опытными мастерами.',
    },
  },
  {
    id: 'iphone',
    image: '/hero/iphone.jpg',
    to: '/shop?brand=Apple',
    eyebrow: 'APPLE IPHONE',
    title: { en: 'iPhone, Done Right.', el: 'iPhone, όπως πρέπει.', ru: 'iPhone как надо.' },
    accent: { en: 'Pure power.', el: 'Καθαρή δύναμη.', ru: 'Чистая мощь.' },
    lead: { en: 'Sealed. Warranted. Ready.', el: 'Σφραγισμένα. Με εγγύηση. Έτοιμα.', ru: 'Запечатаны. С гарантией. Готовы.' },
    text: {
      en: 'Every iPhone generation in stock in Limassol — plus screens, batteries and accessories.',
      el: 'Κάθε γενιά iPhone διαθέσιμη στη Λεμεσό — μαζί με οθόνες, μπαταρίες και αξεσουάρ.',
      ru: 'Все поколения iPhone в наличии в Лимасоле — а также экраны, аккумуляторы и аксессуары.',
    },
  },
]

export const FREE_SHIPPING_FROM = 60
