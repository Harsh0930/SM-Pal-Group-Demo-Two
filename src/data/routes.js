const chairmanImage = "/assets/hero-gradient-images/chairman-banner-gradient.webp";
const routePages = {
  "/about": {
    type: "about",
    eyebrow: "About SM Pal Group",
    title: "About SM Pal Group: Transforming Lives for a Better Future",
    intro:
      "When people in Haldwani talk about a business built on trust, SM Pal Group usually comes up first. Founded in 1982 by Shri Suresh Pal, the group has grown from a single stone supply business into a name that touches real estate, car dealerships, frozen foods, and community life across Uttarakhand. Here is the story behind that growth, the people who lead it, and the values that hold it all together.",
    image: "/assets/hero-gradient-images/about-us-banner-gradient.webp",
    facts: [
      "Established in 1982",
      "Headquartered in Haldwani",
      "Serving the Kumaon region",
    ],
    body: "SM Pal Group operates across several industries, each carrying the same standard of quality and trust the group was built on in 1982. Our industries include Pal Stone Industries, Pal Colonisers, Pal Frozen Foods, Pal Farms, and Car Dealerships (Pal Skoda, Pal Nissan, Pal Ford).",
  },
  "/about/the-pal-group": {
    type: "pal-group",
    eyebrow: "The Pal Group",
    title: "SM Pal Group: A Multi-Industry Legacy Since 1982",
    intro:
      "SM Pal Group began in 1982 with a single stone supply business in Haldwani. More than four decades later, it has grown into a wide family of companies spanning real estate, car dealerships, frozen foods, healthcare, education, infrastructure, media, and more. This page brings that full picture together in one place.",
    image: "/assets/hero-gradient-images/banner-gradient.webp",
    facts: [
      "Established 1982",
      "Headquartered in Haldwani",
      "45+ years of trust",
    ],
    body: "SM Pal Group began in 1982 with a single stone supply business in Haldwani. More than four decades later, it has grown into a wide family of companies spanning real estate, car dealerships, frozen foods, healthcare, education, infrastructure, media, and more.",
  },
  "/about/ownership": {
    type: "ownership",
    eyebrow: "Owner-Chairman",
    title: "Shri Suresh Pal, owner and chairman of SM Pal Group",
    intro:
      "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, and he still leads it today as owner and chairman. Over more than four decades, he has grown a single stone supply business into a group spanning real estate, automobiles, and frozen foods. Here is a closer look at his journey and the businesses he has built along the way.",
    image: chairmanImage,
    facts: [
      "Shri Suresh Pal",
      "Founder, Owner and Chairman",
      "SM Pal Group, since 1982",
    ],
    body: "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, and he still leads it today as owner and chairman. Over more than four decades, he has grown a single stone supply business into a group spanning real estate, automobiles, and frozen foods.",
  },
  "/about/board-of-directors": {
    type: "board",
    eyebrow: "Leadership",
    title: "Board of directors at SM Pal Group",
    intro:
      "SM Pal Group is guided by a board of directors rooted in the same family that founded the company in 1982. Below, meet the people who lead SM Pal Group's growth across real estate, automobiles, frozen foods, and stone supply today.",
    image: "/assets/hero-gradient-images/banner-gradient.webp",
    facts: [
      "Family-led board",
      "Continuity since 1982",
      "Values-driven leadership",
    ],
    body: "SM Pal Group's board brings together four directors, each connected to the legacy Suresh Pal built in 1982.",
  },
  "/about/prateek-pal": {
    type: "prateek",
    eyebrow: "Director",
    title: "Prateek Pal, director at SM Pal Group",
    intro:
      "Prateek Pal serves as a director at SM Pal Group, where he has spent the last several years expanding the businesses his father built into new products and new markets.",
    image: "/assets/prateek-pal-images/prateek-pal-banner.webp",
    facts: [
      "Prateek Pal",
      "Director, SM Pal Group",
      "Next generation leadership",
    ],
    body: "Prateek Pal is a director at SM Pal Group, part of the family that has led the group since Suresh Pal founded it in 1982. He has said his approach is shaped directly by his father's people first philosophy.",
  },
  "/industries/pal-fresh-global-trading": {
    type: "pal-fresh-global",
    eyebrow: "Industry 01 · Trading",
    title: "Pal Fresh Global\nTrading LLC.",
    intro:
      "Connecting quality products with dependable distribution and a growing network of customers.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Fresh produce and trading",
      "Kumaon-rooted operations",
      "Reliable supply partnerships",
    ],
    body: "Pal Fresh Global Trading LLC extends the group’s commitment to quality into sourcing, trading and distribution. Every relationship is built around consistency, transparency and care.",
  },
  "/industries/pal-frozen-foods/pal-fresh": {
    type: "pal-fresh",
    eyebrow: "Pal Frozen Foods · Brand",
    title: "Pal Fresh.",
    intro:
      "Frozen vegetables that bring dependable quality and everyday convenience to the kitchen.",
    image:
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Seven IQF products",
      "Uttarakhand-grown",
      "Retail and HoReCa",
    ],
    body: "Pal Fresh makes it easier to keep good ingredients close at hand. The brand focuses on convenient frozen vegetables with the quality and reliability customers expect from SM Pal Group.",
  },
  "/industries/pal-frozen-foods/frozzo": {
    type: "frozzo",
    eyebrow: "Pal Frozen Foods · Brand",
    title: "Frozzo.",
    intro:
      "Convenient frozen snacks made for quick moments, shared tables and busy days.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Frozen snacks",
      "Convenience without compromise",
      "For every shared table",
    ],
    body: "Frozzo brings playful convenience to the frozen foods category. From preparation to packaging, the brand is shaped around taste, ease and the small moments that bring people together.",
  },
  "/industries/pal-farms": {
    type: "industry",
    eyebrow: "Industry 02 · Agriculture",
    title: "Pal Farms.",
    intro:
      "Growing a more connected relationship with land, food and responsible enterprise.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Responsible cultivation",
      "Closer to the source",
      "Long-term stewardship",
    ],
    body: "Pal Farms represents the group’s interest in responsible, connected growth. It is an evolving part of the portfolio, grounded in respect for the land and the people who work with it.",
  },
  "/industries/pal-stone-industries": {
    type: "pal-stone",
    eyebrow: "Industry 03 · Materials",
    title: "Pal Stone Industries",
    intro:
      "The original foundation of SM Pal Group, supplying quality stone and grit for the region’s infrastructure.",
    image: "/assets/hero-gradient-images/pal-stone-industries-gradient.jpeg",
    facts: [
      "Founded in 1982",
      "Stone and grit supply",
      "Projects across Kumaon",
    ],
    body: "From its crushing unit at Halduchaur, Haldwani, Pal Stone Industries has built a reputation for reliable materials and delivery. Its work has supported notable projects including the Gokul Dam Project and Indian Railways.",
  },
  "/industries/pal-colonisers/pal-sumeera-residency": {
    type: "pal-sumeera",
    eyebrow: "Pal Colonisers · Residential",
    title: "Pal Sumeera\nResidency.",
    intro:
      "A considered residential address designed around everyday comfort and a sense of belonging.",
    image:
      "/assets/pal-sumeera/township.webp",
    facts: [
      "Residential development",
      "Kichha",
      "Thoughtful community planning",
    ],
    body: "Pal Sumeera Residency brings the Pal Colonisers approach to life: create places that feel dependable, welcoming and designed for the way people want to live.",
  },
  "/industries/pal-colonisers/palam-city": {
    type: "palam-city",
    eyebrow: "Pal Colonisers · Residential",
    title: "Palam City.",
    intro:
      "A growing community in Haldwani, shaped with space for life, connection and the future.",
    image:
      "/assets/Palam City -1.jpg.webp",
    facts: ["Residential community", "Haldwani", "Built around shared life"],
    body: "Palam City is a long-term real estate vision rooted in the region. Its homes, spaces and community moments are planned to support the lives that grow there.",
  },
  "/industries/pal-colonisers/palam-view": {
    type: "palam-view",
    eyebrow: "Pal Colonisers · Residential",
    title: "Palam View.",
    intro:
      "Premium 4 BHK residences with a study and exclusive private floors within Palam City, Haldwani.",
    image:
      "/assets/palam-view.webp",
    facts: ["4 BHK with study", "Palam City, Haldwani", "Exclusive private floors"],
    body: "Palam View combines contemporary design, panoramic balcony views and private-floor living within the established Palam City community.",
  },
  "/industries/pal-colonisers/pallazio": {
    type: "pallazio",
    eyebrow: "Pal Colonisers · Residential & Commercial Plots",
    title: "Pallazio.",
    intro:
      "Gated residential and commercial plots near Pilikothi Chauraha, Haldwani, with the freedom to build a home of your own.",
    image:
      "/assets/Gate Cam.webp",
    facts: [
      "Residential & commercial plots",
      "30–50 ft tree-lined roads",
      "Gated community in Haldwani",
    ],
    body: "Pallazio, formally Ecotown-Pallazio, brings together self-build plots, green landscaping and controlled access, adjacent to Eco Town Phase I and II.",
  },
  "/industries/pal-colonisers/eco-town": {
    type: "eco-town",
    eyebrow: "Pal Colonisers · Community",
    title: "Eco Town, your dream home plot in the heart of Haldwani",
    intro:
      "Eco Town gives you a plot in the heart of Haldwani and lets you build the home that fits how you actually want to live.",
    image:
      "/assets/Ecotown 1 (2).webp",
    facts: [
      "Community development",
      "Responsible design",
      "Future-focused living",
    ],
    body: "Eco Town reflects the belief that growth and responsibility can share the same address. The project is shaped around practical comfort, connected spaces and a more considered future.",
  },
  "/industries/pal-colonisers/paloma-greens": {
    type: "paloma-greens",
    eyebrow: "Pal Colonisers · Residential",
    title: "Paloma Greens, luxury living surrounded by nature in Haldwani",
    intro:
      "Paloma Greens brings together luxury, nature, and modern living in one Haldwani community.",
    image:
      "/assets/Palam City -1.jpg.webp",
    facts: [
      "Residential development",
      "Green open spaces",
      "Designed for belonging",
    ],
    body: "Paloma Greens brings nature closer to daily life. The project pairs practical homes with a calmer setting and the dependable service that defines Pal Colonisers.",
  },
  "/industries/car-dealerships/pal-skoda-haldwani": {
    type: "pal-skoda",
    eyebrow: "Car Dealerships · Skoda",
    title: "Pal Skoda\nHaldwani.",
    intro:
      "Pal Skoda Haldwani brings Skoda's blend of performance, luxury, and safety to Uttarakhand, backed by a modern showroom and a dedicated service team. Whether you are choosing your first Skoda or your next one, Pal Skoda Haldwani is built to make the entire journey feel personal, not transactional.",
    image: "/assets/hero-gradient-images/pal-skoda-gradient.jpeg",
    facts: ["Skoda sales and service", "Haldwani", "Established in 2023"],
    body: "Pal Skoda Haldwani was established in 2023 under Pal Prateek Automobiles LLP, becoming the newest addition to SM Pal Group's car dealerships. We bring Skoda's blend of performance, luxury, and safety to Uttarakhand with a modern showroom and a dedicated service team.",
  },
  "/industries/car-dealerships/pal-nissan-haldwani": {
    type: "nissan",
    eyebrow: "Car Dealerships · Nissan",
    title: "Pal Nissan\nHaldwani.",
    intro:
      "A trusted Nissan showroom experience, with straightforward advice and support that stays close.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Nissan sales and service",
      "Haldwani",
      "A complete ownership journey",
    ],
    body: "Pal Nissan combines the confidence of the Nissan range with a local team committed to clear guidance, dependable service and a relationship that lasts beyond the showroom.",
  },
  "/industries/car-dealerships/pal-ford-haldwani": {
    type: "pal-ford",
    eyebrow: "Car Dealerships · Ford",
    title: "Pal Ford\nHaldwani.",
    intro:
      "Power, performance and trust: Pal Ford Haldwani has been keeping Fords on the road across Kumaon since 2009.",
    image: "/assets/journeywall-images/pal-ford-opening-haldwani-ceremony.webp",
    facts: ["Ford sales and service", "Haldwani", "First SM Pal Group dealership"],
    body: "Pal Ford Haldwani was established in 2009 as the first of SM Pal Group's car dealerships, and it has grown into one of the most trusted names for Ford service in the Kumaon region.",
  },
  "/contact": {
    type: "contact",
    eyebrow: "Let’s connect",
    title: "Good things\nstart here.",
    intro:
      "Whether you are looking to work with us, join us or simply learn more, we would love to hear from you.",
    image: "/assets/hero-gradient-images/contactus-bannergradient.webp",
    facts: [
      "Haldwani, Uttarakhand",
      "hello@smpalgroup.com",
      "Serving the Kumaon region",
    ],
    body: "Reach out to the SM Pal Group team and we will help connect your enquiry with the right business.",
  },
};

const businessRoutes = [
  "/industries/pal-stone-industries",
  "/industries/pal-colonisers/pal-sumeera-residency",
  "/industries/pal-frozen-foods/pal-fresh",
  "/industries/car-dealerships/pal-skoda-haldwani",
];


export { routePages, businessRoutes };
