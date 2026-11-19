// ─────────────────────────────────────────────────────────────
//  YOUR PROJECTS — edit this file to add, remove or update work.
//
//  show:     true = appears on the site, false = hidden
//  featured: true = gets the large card at the top of the grid
//  images:   put screenshots in /public/projects/ and list them here
//  tags:     what the project is / what you used
//  repo:     GitHub link to the code — leave "" to hide the "Code" link
//  demo:     true = shows a small "Demo" badge (for fictional brands)
//
//  SCREENSHOTS: save them in /public/projects/ (e.g. apex-1.png) and list
//  them in images: ["/projects/apex-1.png", "/projects/apex-2.png"].
//  The first image becomes the card cover; the rest appear in Details.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "apex",
    title: "Apex National Bank",
    category: "Fintech · Web App",
    summary:
      "A full digital-banking experience — marketing site, sign-up, sign-in and a customer dashboard.",
    details:
      "A fictional bank built end-to-end as a portfolio piece: a landing page with products, security and FAQ sections, an account-opening flow, and a dashboard preview with balances and recent transactions. Clearly labelled as a demo project.",
    highlights: [
      "Landing page, auth flow and dashboard in one product",
      "Product, security and FAQ sections",
      "Clearly marked as a fictional demo",
    ],
    tags: ["Fintech UI", "Auth flow", "Dashboard", "Responsive"],
    link: "https://www.apex-national-bank.com",
    images: ["/projects/apex.webp"],
    repo: "",
    accent: "from-sky-500 to-indigo-600",
    featured: true,
    show: true,
  },
  {
    id: "validxpress",
    title: "ValidXpress",
    category: "Logistics · Tracking",
    summary: "A courier and logistics site with live shipment tracking, a delivery timeline and service pages.",
    details:
      "A logistics brand site built around tracking: a shipment-tracking widget with progress and route stops, a four-stage delivery timeline, and service pages for air, ground and ocean freight.",
    highlights: ["Shipment-tracking interface", "Delivery-journey timeline", "Air, ground and ocean freight pages"],
    tags: ["Logistics", "Tracking UI", "Responsive"],
    link: "https://www.validxpress.net",
    images: ["/projects/validxpress.webp"],
    repo: "",
    accent: "from-amber-500 to-orange-600",
    featured: false,
    show: true,
  },
  {
    id: "dashboard",
    title: "SaaS Admin Dashboard",
    category: "Dashboard · UI",
    summary: "An admin dashboard with analytics views and reusable UI components.",
    details:
      "An admin panel for a software product: analytics overview, user management screens, and a reusable component set for cards, tables and charts.",
    highlights: ["Analytics overview", "User management screens", "Reusable components"],
    tags: ["Dashboard", "Data UI", "Components"],
    link: "https://dashboard.obiresoffice.com",
    images: ["/projects/dashboard.webp"],
    repo: "",
    accent: "from-violet-500 to-fuchsia-600",
    featured: false,
    show: true,
  },
  {
    id: "smokehouse",
    title: "Nature Smokehouse",
    category: "E-commerce · Online Store",
    summary: "An online store for a wholesale and retail shop — product catalogue, category filters, search and cart.",
    details:
      "A full e-commerce storefront: a product catalogue organised into categories, product search, featured products, a shopping cart and customer accounts, plus a WhatsApp chat button for quick enquiries.",
    highlights: ["Product catalogue with category filters", "Search, cart and customer accounts", "WhatsApp chat for enquiries"],
    tags: ["E-commerce", "Product catalogue", "Cart", "Responsive"],
    link: "https://smokehouse.obiresoffice.com",
    images: ["/projects/smokehouse.webp"],
    repo: "",
    accent: "from-orange-500 to-red-600",
    featured: false,
    show: true,
  },
  {
    id: "landing",
    title: "Business Landing Page",
    category: "Marketing · Landing Page",
    summary: "A conversion-focused website that helps a business turn visitors into customers.",
    details:
      "A landing page designed around one goal — getting visitors to get in touch. Clear offer, social proof and strong calls to action.",
    highlights: ["Conversion-focused layout", "Clear calls to action", "Fast and mobile-first"],
    tags: ["Landing page", "Marketing", "Responsive"],
    link: "https://landing.obiresoffice.com",
    images: ["/projects/landing.webp"],
    repo: "",
    accent: "from-emerald-500 to-teal-600",
    featured: false,
    show: true,
  },

  // ── Hidden until each live site shows a "fictional demo project" notice
  //    (like the one in Apex National Bank's footer). Then set show: true.
  {
    id: "securebank",
    title: "SecureBank",
    category: "Fintech · Web App",
    summary: "A banking web app with authentication, a dashboard and transfers.",
    details:
      "A mobile-style banking demo with sign-in, account overview, transfers and a bottom tab bar.",
    highlights: ["Sign-in flow", "Account dashboard", "Tab-bar navigation"],
    tags: ["Fintech UI", "Auth flow", "Mobile-first"],
    link: "https://securebank.obiresoffice.com",
    images: ["/projects/securedbank.webp", "/projects/securebank-dashboard.png", "/projects/securebank-menu.png"],
    repo: "",
    accent: "from-cyan-500 to-blue-700",
    featured: false,
    show: false,
  },
];
