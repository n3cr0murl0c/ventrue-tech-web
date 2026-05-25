/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Blue Scale
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
        // Ventrue Brand Colors
        ventrue: {
          dark: '#0a0a0f',
          darker: '#050508',
          accent: '#00d4ff',
          secondary: '#7c3aed',
          blue: '#0ea5e9',
        },
        // Surface Colors
        surface: {
          DEFAULT: '#1e293b',
          light: '#334155',
          border: '#475569',
        },
        // Text Colors
        text: {
          primary: '#ffffff',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        // Sci-fi / schematic system (Stitch-approved design direction)
        tactical: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #7c3aed 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #00d4ff 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 40px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Sci-fi / schematic
        'scan-vertical': 'scanVertical 4s linear infinite',
        'scan-horizontal': 'scanHorizontal 3s linear infinite',
        'node-pulse': 'nodePulse 2s infinite',
        'flicker': 'flicker 0.2s infinite alternate',
        'radar-sweep': 'spin 4s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        scanVertical: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(200vh)' },
        },
        scanHorizontal: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        nodePulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.8)' },
          '70%': { boxShadow: '0 0 0 12px rgba(0, 212, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0)' },
        },
        flicker: {
          '0%': { opacity: '0.95' },
          '5%': { opacity: '0.85' },
          '10%': { opacity: '1' },
          '15%': { opacity: '0.9' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
