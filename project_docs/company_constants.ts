/**
 * Ventrue Technologies - Brand Constants
 *
 * Source of truth: project_docs/company_branding.md
 * Mirror format: project_docs/company_branding.json
 *
 * When you change anything here, update the .md and .json in the same commit.
 *
 * Version: 2.0.0
 * Updated: 2026-05-24
 */

export const COMPANY = {
  name: 'Ventrue Technologies',
  shortName: 'Ventrue Tech',
  legalName: 'Ventrue Technologies S.A.S.',
  founded: 2024,
  founder: {
    name: 'Erick Escobar',
    role: 'Founder & Principal Engineer',
    disciplines: [
      'Full-Stack Software Engineering',
      'Cloud Architecture',
      'DevOps & Site Reliability',
      'AI & Automation Engineering',
    ],
  },
  headquarters: 'Quito, Ecuador',
  industry: 'Engineering practice — software, cloud, DevOps, AI/automation',
  website: 'https://ventrue.tech',
  email: 'hello@ventrue.tech',
  phone: '+593 99 202 4767',
  social: {
    twitter: '@ventrue_tech',
    github: 'ventrue-tech',
    linkedin: '',
    tiktok: '',
  },
  positioning: {
    es: 'Ventrue Tech es una práctica de ingeniería liderada por su fundador que entrega software, arquitectura cloud, DevOps y automatización con IA como un único servicio. Operamos como tu equipo de ingeniería bajo demanda — desde el diseño técnico hasta la operación en producción.',
    en: 'Ventrue Tech is a founder-led engineering practice that delivers software, cloud architecture, DevOps, and AI-driven automation as a single service. We operate as your on-demand engineering team — from technical design through production operations.',
  },
  taglines: {
    es: 'Software, cloud y automatización como servicio.',
    en: 'Software, cloud, and automation — delivered as a service.',
  },
  taglinesSecondary: {
    es: 'Diseñamos, construimos y operamos sistemas de extremo a extremo.',
    en: 'We design, build, and operate end-to-end systems.',
  },
} as const;

export const MISSION = {
  es: 'Ayudar a empresas y equipos técnicos a construir, escalar y operar software de calidad — sin tener que ensamblar tres proveedores distintos.',
  en: 'Help companies and technical teams build, scale, and operate quality software — without having to assemble three separate vendors.',
} as const;

export const VISION = {
  es: 'Ser la práctica de ingeniería de referencia en Latinoamérica para empresas que necesitan velocidad sin sacrificar arquitectura.',
  en: 'Be the reference engineering practice in Latin America for companies that need speed without sacrificing architecture.',
} as const;

export const VALUES = {
  ownership: {
    key: 'ownership',
    es: 'Responsabilidad',
    en: 'Ownership',
    description: {
      es: 'Asumimos el resultado de extremo a extremo — desde la decisión de arquitectura hasta el page de las 3 AM cuando algo se rompe.',
      en: 'We own the outcome end-to-end — from the architecture decision to the 3 AM page when something breaks.',
    },
  },
  quality: {
    key: 'quality',
    es: 'Calidad',
    en: 'Quality',
    description: {
      es: 'Escribimos código, escribimos tests y escribimos runbooks. Los tres.',
      en: 'We write code, write tests, and write runbooks. All three.',
    },
  },
  transparency: {
    key: 'transparency',
    es: 'Transparencia',
    en: 'Transparency',
    description: {
      es: 'Estimaciones honestas, alcance honesto, tradeoffs honestos — aunque cueste el contrato.',
      en: 'Honest estimates, honest scope, honest tradeoffs — even when it costs the engagement.',
    },
  },
  pragmatism: {
    key: 'pragmatism',
    es: 'Pragmatismo',
    en: 'Pragmatism',
    description: {
      es: 'Elegimos la arquitectura más simple que resuelve el problema real, no la más impresionante.',
      en: 'We pick the simplest architecture that solves the actual problem, not the most impressive one.',
    },
  },
} as const;

export const COLORS = {
  primary: {
    dark: '#0a0a0f',
    darker: '#050508',
  },
  accent: {
    cyan: '#00d4ff',
    purple: '#7c3aed',
    blue: '#0ea5e9',
  },
  surface: {
    default: '#1e293b',
    light: '#334155',
    border: '#475569',
  },
  text: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    muted: '#64748b',
  },
  cmyk: {
    primaryDark: 'C75 M70 Y65 K90',
    accentCyan: 'C70 M5 Y0 K0',
    secondaryPurple: 'C72 M85 Y0 K0',
    primaryBlue: 'C82 M30 Y0 K0',
  },
  tailwind: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    ventrue: {
      dark: '#0a0a0f',
      darker: '#050508',
      accent: '#00d4ff',
      secondary: '#7c3aed',
    },
  },
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #7c3aed 100%)',
  dark: 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)',
  accent: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #00d4ff 100%)',
  purple: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0ea5e9 100%)',
} as const;

export const TYPOGRAPHY = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Cal Sans', 'Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const ANIMATIONS = {
  gradient: { name: 'gradient', duration: '8s', easing: 'ease infinite' },
  float: { name: 'float', duration: '6s', easing: 'ease-in-out infinite' },
  glow: { name: 'glow', duration: '2s', easing: 'ease-in-out infinite alternate' },
} as const;

export const PRODUCTS = {
  finhelper: {
    name: 'FinHelper',
    description: 'Personal finance management app (Flutter + .NET + AdMob)',
    status: 'active',
  },
  ventrueSocial: {
    name: 'Ventrue Social',
    description: 'Multi-client AI-driven social content automation SaaS (TikTok, Instagram, LinkedIn)',
    status: 'in-development',
    note: 'Working name; pending TikTok production review',
  },
  ventrueWeb: {
    name: 'Ventrue Web',
    description: 'Corporate website builder platform',
    status: 'backlog',
  },
} as const;

export const SERVICES = {
  cloudArchitecture: {
    name: { es: 'Arquitectura Cloud', en: 'Cloud Architecture' },
    description: {
      es: 'Diseño multi-región y migración cloud-native sobre AWS o Azure.',
      en: 'Multi-region, cloud-native design + migration on AWS or Azure.',
    },
    // INTERNAL ONLY — never render to the public site. See feedback_no_public_prices memory.
    targetMarket: 'CTOs, growth-stage startups',
    internalPriceUsd: '$4k – $30k',
    timeline: '2–6 weeks',
    pricingConfirmed: false,
  },
  devopsSre: {
    name: { es: 'DevOps & SRE', en: 'DevOps & SRE' },
    description: {
      es: 'CI/CD, IaC (Terraform), observabilidad y playbooks de on-call. Proyecto o retainer mensual.',
      en: 'CI/CD, IaC (Terraform), observability, on-call playbooks. Project or monthly retainer.',
    },
    targetMarket: 'Engineering leads, ops-light teams',
    internalPriceUsd: '$3k – $25k or $2.5k/mo retainer',
    timeline: '2–8 weeks',
    pricingConfirmed: false,
  },
  aiAutomation: {
    name: { es: 'IA & Automatización', en: 'AI & Automation' },
    description: {
      es: 'Integraciones con LLMs, workflows agénticos, automatización de herramientas internas y pipelines de contenido.',
      en: 'LLM integrations, agentic workflows, internal-tool automation, content pipelines.',
    },
    targetMarket: 'Operators, marketing & content teams',
    internalPriceUsd: '$5k – $50k',
    timeline: '3–12 weeks',
    pricingConfirmed: false,
  },
  mobileApplications: {
    name: { es: 'Apps Móviles', en: 'Mobile Applications' },
    description: {
      es: 'iOS y Android con Flutter o React Native + backend.',
      en: 'iOS & Android with Flutter or React Native + backend.',
    },
    targetMarket: 'Companies needing mobile apps',
    internalPriceUsd: '$15k – $60k',
    timeline: '8–16 weeks',
    pricingConfirmed: true,
  },
  apiBackend: {
    name: { es: 'APIs y Backend', en: 'APIs & Backend' },
    description: {
      es: 'Backends RESTful y event-driven escalables.',
      en: 'Scalable RESTful + event-driven backends.',
    },
    targetMarket: 'Developers, enterprises',
    internalPriceUsd: '$5k – $25k',
    timeline: '4–10 weeks',
    pricingConfirmed: true,
  },
  corporateWebsites: {
    name: { es: 'Web Corporativa', en: 'Corporate Websites' },
    description: {
      es: 'Sitios optimizados para conversión con SEO + analytics + CMS.',
      en: 'Conversion-optimized sites with SEO + analytics + CMS.',
    },
    targetMarket: 'Businesses, startups',
    internalPriceUsd: '$800 – $3.5k',
    timeline: '2–6 weeks',
    pricingConfirmed: true,
  },
  fractionalCto: {
    name: { es: 'CTO Fraccional / Consultoría Técnica', en: 'Fractional CTO / Tech Advisory' },
    description: {
      es: 'Estrategia, auditorías de arquitectura, hiring técnico y liderazgo fraccional.',
      en: 'Strategy, architecture audits, hiring, fractional leadership.',
    },
    targetMarket: 'Founders, technical leaders',
    internalPriceUsd: '$2k – $50k',
    timeline: '2–8 weeks',
    pricingConfirmed: true,
  },
} as const;

export const SOVI = {
  framework: {
    name: 'SOVI 2.0',
    description: 'Solution-Oriented, Omnichannel Engagement, Value-Driven, Informative',
  },
  principles: {
    solutionOriented: { key: 'S', name: 'Solution-Oriented', description: 'Focus on solving high-value problems' },
    omnichannel: { key: 'O', name: 'Omnichannel Engagement', description: 'Seamless presence across all touchpoints' },
    valueDriven: { key: 'V', name: 'Value-Driven', description: 'Communicate inherent value, not just price' },
    informative: { key: 'I', name: 'Informative', description: 'Build trust through transparency and education' },
  },
} as const;

export const ASSET_SIZES = {
  favicon: { size: '32x32, 16x16', format: 'ICO/PNG' },
  appIconTikTok: { size: '1024x1024', format: 'PNG' },
  appIconPlayStore: { size: '512x512', format: 'PNG' },
  appIconAppStore: { size: '1024x1024', format: 'PNG' },
  cardFront: { size: '85x55mm + 3mm bleed', format: 'PDF (CMYK)' },
  openGraph: { size: '1200x630', format: 'PNG' },
} as const;

export const CONTENT_STRATEGY = {
  blog: {
    focus: 'Technical tutorials, industry insights, company news',
    languages: { primary: 'Spanish', secondary: 'English' },
    frequency: 'Daily automated posting',
    channels: ['Blog', 'Twitter/X', 'GitHub', 'TikTok'],
  },
  socialMedia: [
    { platform: 'Twitter/X', handle: '@ventrue_tech', purpose: 'Tech news, updates, engagement' },
    { platform: 'GitHub', handle: 'ventrue-tech', purpose: 'Open source, code showcase' },
    { platform: 'TikTok', handle: '', purpose: 'Short-form dev content; dogfood surface for Ventrue Social' },
    { platform: 'LinkedIn', handle: '', purpose: 'B2B reach, founder thought leadership' },
  ],
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTagline(lang: 'es' | 'en'): string {
  return COMPANY.taglines[lang];
}

export function getPositioning(lang: 'es' | 'en'): string {
  return COMPANY.positioning[lang];
}

export function getMission(lang: 'es' | 'en'): string {
  return MISSION[lang];
}

export function getVision(lang: 'es' | 'en'): string {
  return VISION[lang];
}

export function getValueDescription(valueKey: keyof typeof VALUES, lang: 'es' | 'en'): string {
  return VALUES[valueKey].description[lang];
}

export function getAllValues(lang: 'es' | 'en'): Array<{ key: string; name: string; description: string }> {
  return Object.values(VALUES).map((value) => ({
    key: value.key,
    name: value[lang],
    description: value.description[lang],
  }));
}

/**
 * Public-safe service list. The `internalPriceUsd` field is deliberately stripped here
 * so accidental rendering on a page never leaks pricing. Use getInternalServices() for
 * sales proposals where prices are needed.
 */
export function getAllServices(lang: 'es' | 'en') {
  return Object.entries(SERVICES).map(([key, service]) => ({
    key,
    name: service.name[lang],
    description: service.description[lang],
    targetMarket: service.targetMarket,
    timeline: service.timeline,
  }));
}

/** Sales-internal use only. Do not render the result on any public page. */
export function getInternalServices(lang: 'es' | 'en') {
  return Object.entries(SERVICES).map(([key, service]) => ({
    key,
    name: service.name[lang],
    description: service.description[lang],
    targetMarket: service.targetMarket,
    internalPriceUsd: service.internalPriceUsd,
    timeline: service.timeline,
    pricingConfirmed: service.pricingConfirmed,
  }));
}

const BRANDING = {
  COMPANY,
  MISSION,
  VISION,
  VALUES,
  COLORS,
  GRADIENTS,
  TYPOGRAPHY,
  ANIMATIONS,
  PRODUCTS,
  SERVICES,
  SOVI,
  ASSET_SIZES,
  CONTENT_STRATEGY,
  getTagline,
  getPositioning,
  getMission,
  getVision,
  getValueDescription,
  getAllValues,
  getAllServices,
  getInternalServices,
} as const;

export default BRANDING;
