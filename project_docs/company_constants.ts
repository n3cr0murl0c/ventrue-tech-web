/**
 * Ventrue Technologies - Brand Constants
 * 
 * This file provides programmatic access to all company branding information.
 * Import these constants in any project to maintain consistent branding.
 * 
 * Version: 1.0.0
 * Updated: 2026-02-17
 */

// ============================================
// COMPANY INFORMATION
// ============================================

export const COMPANY = {
  name: 'Ventrue Technologies',
  shortName: 'Ventrue Tech',
  legalName: 'Ventrue Technologies S.A.S.',
  founded: 2024,
  headquarters: 'Ecuador',
  industry: 'Technology / Software Development / Digital Solutions',
  website: 'https://ventrue.tech',
  email: 'hello@ventrue.tech',
  social: {
    twitter: '@ventrue_tech',
    github: 'ventrue-tech',
    linkedin: '',
  },
  taglines: {
    es: 'Transformamos ideas en soluciones digitales innovadoras',
    en: 'We transform ideas into innovative digital solutions',
  },
} as const;

// ============================================
// MISSION & VISION
// ============================================

export const MISSION = {
  es: 'Empoderar a empresas y desarrolladores con herramientas tecnológicas de vanguardia que impulsan la innovación y el crecimiento sostenible.',
  en: 'Empowering companies and developers with cutting-edge technological tools that drive innovation and sustainable growth.',
} as const;

export const VISION = {
  es: 'Ser líderes globales en soluciones tecnológicas que transforman la forma en que el mundo desarrolla software.',
  en: 'To be global leaders in technological solutions that transform how the world develops software.',
} as const;

// ============================================
// CORE VALUES
// ============================================

export const VALUES = {
  innovation: {
    key: 'innovation',
    es: 'Innovación',
    en: 'Innovation',
    description: {
      es: 'Constantemente pushing boundaries and exploring new technologies',
      en: 'Constantly pushing boundaries and exploring new technologies',
    },
  },
  quality: {
    key: 'quality',
    es: 'Calidad',
    en: 'Quality',
    description: {
      es: 'Entregando excelencia en cada línea de código y proyecto',
      en: 'Delivering excellence in every line of code and project',
    },
  },
  integrity: {
    key: 'integrity',
    es: 'Integridad',
    en: 'Integrity',
    description: {
      es: 'Transparente, honesto y ético en todos los tratos',
      en: 'Transparent, honest, and ethical in all dealings',
    },
  },
  collaboration: {
    key: 'collaboration',
    es: 'Colaboración',
    en: 'Collaboration',
    description: {
      es: 'Trabajando juntos para lograr resultados extraordinarios',
      en: 'Working together to achieve extraordinary results',
    },
  },
} as const;

// ============================================
// BRAND COLORS
// ============================================

export const COLORS = {
  // Primary Colors
  primary: {
    dark: '#0a0a0f',
    darker: '#050508',
  },
  // Accent Colors
  accent: {
    cyan: '#00d4ff',
    purple: '#7c3aed',
    blue: '#0ea5e9',
  },
  // Surface Colors
  surface: {
    default: '#1e293b',
    light: '#334155',
    border: '#475569',
  },
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    muted: '#64748b',
  },
  // Tailwind Extended Colors
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

// ============================================
// GRADIENTS
// ============================================

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #7c3aed 100%)',
  dark: 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)',
  accent: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #00d4ff 100%)',
  purple: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0ea5e9 100%)',
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

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

// ============================================
// ANIMATIONS
// ============================================

export const ANIMATIONS = {
  gradient: {
    name: 'gradient',
    duration: '8s',
    easing: 'ease infinite',
  },
  float: {
    name: 'float',
    duration: '6s',
    easing: 'ease-in-out infinite',
  },
  glow: {
    name: 'glow',
    duration: '2s',
    easing: 'ease-in-out infinite alternate',
  },
} as const;

// ============================================
// PRODUCTS & SERVICES
// ============================================

export const PRODUCTS = {
  finhelper: {
    name: 'FinHelper',
    description: 'Personal finance management app',
    status: 'active',
  },
  ventrueWeb: {
    name: 'Ventrue Web',
    description: 'Corporate website builder platform',
    status: 'development',
  },
} as const;

export const SERVICES = {
  corporateWebsites: {
    name: 'Corporate Websites',
    description: 'Custom web solutions',
    targetMarket: 'Businesses, startups',
  },
  mobileApplications: {
    name: 'Mobile Applications',
    description: 'iOS/Android development',
    targetMarket: 'Companies needing mobile apps',
  },
  apiBackend: {
    name: 'APIs & Backend',
    description: 'Scalable server solutions',
    targetMarket: 'Developers, enterprises',
  },
  consulting: {
    name: 'Technical Consulting',
    description: 'Strategy and architecture',
    targetMarket: 'CTOs, technical leaders',
  },
} as const;

// ============================================
// SOVI MARKETING FRAMEWORK
// ============================================

export const SOVI = {
  framework: {
    name: 'SOVI 2.0',
    description: 'Solution-Oriented, Omnichannel Engagement, Value-Driven, Informative',
  },
  principles: {
    solutionOriented: {
      key: 'S',
      name: 'Solution-Oriented',
      description: 'Focus on solving high-value problems',
    },
    omnichannel: {
      key: 'O',
      name: 'Omnichannel Engagement',
      description: 'Seamless presence across all touchpoints',
    },
    valueDriven: {
      key: 'V',
      name: 'Value-Driven',
      description: 'Communicate inherent value, not just price',
    },
    informative: {
      key: 'I',
      name: 'Informative',
      description: 'Build trust through transparency and education',
    },
  },
} as const;

// ============================================
// CONTENT STRATEGY
// ============================================

export const CONTENT_STRATEGY = {
  blog: {
    focus: 'Technical tutorials, industry insights, company news',
    languages: {
      primary: 'Spanish',
      secondary: 'English',
    },
    frequency: 'Daily automated posting',
    channels: ['Blog', 'Twitter/X', 'GitHub'],
  },
  socialMedia: [
    {
      platform: 'Twitter/X',
      handle: '@ventrue_tech',
      purpose: 'Tech news, updates, engagement',
    },
    {
      platform: 'GitHub',
      handle: 'ventrue-tech',
      purpose: 'Open source, code showcase',
    },
  ],
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get tagline based on language
 */
export function getTagline(lang: 'es' | 'en'): string {
  return COMPANY.taglines[lang];
}

/**
 * Get mission based on language
 */
export function getMission(lang: 'es' | 'en'): string {
  return MISSION[lang];
}

/**
 * Get vision based on language
 */
export function getVision(lang: 'es' | 'en'): string {
  return VISION[lang];
}

/**
 * Get value description based on language
 */
export function getValueDescription(
  valueKey: keyof typeof VALUES,
  lang: 'es' | 'en'
): string {
  return VALUES[valueKey].description[lang];
}

/**
 * Get all values as array
 */
export function getAllValues(lang: 'es' | 'en'): Array<{
  key: string;
  name: string;
  description: string;
}> {
  return Object.values(VALUES).map((value) => ({
    key: value.key,
    name: value[lang],
    description: value.description[lang],
  }));
}

// ============================================
// EXPORT DEFAULT OBJECT
// ============================================

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
  CONTENT_STRATEGY,
  getTagline,
  getMission,
  getVision,
  getValueDescription,
  getAllValues,
} as const;

export default BRANDING;
