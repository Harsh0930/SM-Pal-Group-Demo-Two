// Hero strip — full-bleed rotating images
export const heroImages = [
  "/assets/hero-gradient-images/pal-stone-industries-gradient.jpeg",
  "/assets/hero-gradient-images/pal-frozen-food-gradient.jpeg",
  "/assets/hero-gradient-images/pal-colonisers-gradient.jpeg",
  "/assets/hero-gradient-images/pal-skoda-gradient.jpeg",
];

// Editorial story cards
export const stories = [
  {
    eyebrow: "Recognition",
    title: "Progress worth celebrating.",
    text: "Pal Skoda wins Best Dealer 2025, a national recognition for dealership excellence made possible by the people behind every customer experience.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "Perspective",
    title: "Building for the next 45+ years.",
    text: "SM Pal Group began in 1982 with Pal Stone Industries at Halduchaur, Haldwani. Four decades later, that foundation of trust continues to shape every vertical.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
];

// Recognition cards (one per vertical)
export const awards = [
  {
    vertical: "Pal Stone Industries",
    title: "Trusted infrastructure partner",
    detail: "Recognised through landmark supply projects for Indian Railways and the Gokul Dam Project.",
    href: "/industries/pal-stone-industries",
  },
  {
    vertical: "Pal Colonisers",
    title: "Most Preferred Real Estate Brand",
    detail: "Jagran Utsav recognition for excellence in real estate.",
    href: "/industries/pal-colonisers/pal-sumeera-residency",
  },
  {
    vertical: "Pal Frozen Foods",
    title: "Excellence in Frozen Food Brand 2026",
    detail: "Honoured at Taste of Uttar Pradesh 2026, organised by Dainik Jagran.",
    href: "/industries/pal-frozen-foods/pal-fresh",
  },
  {
    vertical: "Pal Prateek Automobiles",
    title: "Pal Škoda Best Dealer 2025",
    detail: "Awarded by Škoda Auto at the Škoda Best Dealer Event 2026 in the Czech Republic.",
    href: "/industries/car-dealerships/pal-skoda-haldwani",
  },
];

// News ticker
export const news = [
  "Grand unveiling of the all-new Nissan Tekton at Pal Nissan, Haldwani",
  "Grand launch of the new Nissan Gravite at Pal Nissan",
  "Pal Sumeera Residency, Kichha, opening pooja ceremony held to mark the project's launch",
  "Grand launch of the new Skoda Kylaq at Pal Skoda",
  "Grand launch of the new Skoda Kushaq at Pal Skoda",
];

// Videos are placeholders until the brand's real footage is supplied.
// We keep the same single source for now (an MDN CC0 demo clip) but mark
// each entry as `isPlaceholder` so the UI can render "Coming soon" instead
// of opening an unrelated stock video when a viewer clicks play.
const placeholderVideoSource =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const videos = [
  {
    title: "SM Pal Group, Company Overview",
    description:
      "A look at the group's four business verticals and its journey since 1982",
    duration: "2:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
  {
    title: "Pal Ford",
    description: "Inside the Pal Ford showroom experience",
    duration: "0:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
  {
    title: "Pal Fresh",
    description: "How Pal Fresh frozen vegetables are prepared and packaged",
    duration: "0:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
  {
    title: "Frozzo",
    description: "A quick look at Frozzo's frozen snack range",
    duration: "0:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
  {
    title: "Pal Nissan",
    description: "The Pal Nissan dealership experience",
    duration: "0:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
  {
    title: "Pal Colonisers",
    description: "A walkthrough of ongoing real estate projects",
    duration: "0:16",
    src: placeholderVideoSource,
    isPlaceholder: true,
  },
];
