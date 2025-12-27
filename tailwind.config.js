/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#C9A66B',
          dark: '#A8854A',
        },
        surface: {
          DEFAULT: '#FAFAFA',
          white: '#FFFFFF',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        border: {
          DEFAULT: '#E5E5E5',
          light: '#F3F4F6',
        },
        code: {
          bg: '#F5F5F0',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1A1A1A',
            lineHeight: '1.75',
            a: {
              color: '#C9A66B',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 150ms ease',
              '&:hover': {
                color: '#A8854A',
              },
            },
            h1: {
              color: '#1A1A1A',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h2: {
              color: '#1A1A1A',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              color: '#1A1A1A',
              fontWeight: '600',
            },
            strong: {
              color: '#1A1A1A',
              fontWeight: '600',
            },
            code: {
              color: '#1A1A1A',
              backgroundColor: '#F5F5F0',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#F5F5F0',
              color: '#1A1A1A',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
            },
            blockquote: {
              borderLeftColor: '#C9A66B',
              color: '#6B7280',
              fontStyle: 'italic',
            },
            hr: {
              borderColor: '#E5E5E5',
            },
            'ul > li::marker': {
              color: '#C9A66B',
            },
            'ol > li::marker': {
              color: '#C9A66B',
            },
          },
        },
      },
      transitionDuration: {
        '150': '150ms',
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.05em',
        'wider': '0.1em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
