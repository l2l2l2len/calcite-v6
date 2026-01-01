/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                peach: { light: '#F7E6DE', DEFAULT: '#EABEAB' },
                coral: { light: '#E8A090', DEFAULT: '#D4857A', deep: '#C26A5E' },
                ocean: { light: '#A8D5E5', DEFAULT: '#7CC4D8', deep: '#3D7A8C' },
                gold: '#E8B864',
                mint: '#7ECEC4',
                cream: '#FDF8F5',
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                serif: ['Playfair Display', 'serif'],
            }
        }
    },
    plugins: [],
}
