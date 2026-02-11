/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.025em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.025em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '-0.025em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '-0.025em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '-0.025em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '900' }]
            },
            fontFamily: {
                heading: "montserrat",
                paragraph: "lato-light"
            },
            colors: {
                accent: '#10b981',
                'light-gray': '#f2f2f2',
                destructive: '#dc2626',
                'destructive-foreground': '#ffffff',
                background: '#ffffff',
                secondary: '#1e3a5f',
                foreground: '#333333',
                'secondary-foreground': '#ffffff',
                'primary-foreground': '#ffffff',
                primary: '#0d4d3e'
            }
        }
    },
    future: {
        hoverOnlyWhenSupported: true
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')]
}
