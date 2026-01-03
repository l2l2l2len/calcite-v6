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
                // AI71 Enterprise Color Palette
                navy: {
                    light: '#1E3A5F',
                    DEFAULT: '#0A1628',
                    deep: '#050D18',
                },
                slate: {
                    light: '#64748B',
                    DEFAULT: '#334155',
                },
                accent: {
                    light: '#60A5FA',
                    DEFAULT: '#3B82F6',
                    deep: '#2563EB',
                    purple: '#6366F1',
                    violet: '#8B5CF6',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F8FAFC',
                    tertiary: '#F1F5F9',
                },
                // Legacy compatibility (mapped to new colors)
                coral: { light: '#60A5FA', DEFAULT: '#3B82F6', deep: '#2563EB' },
                ocean: { light: '#818CF8', DEFAULT: '#6366F1', deep: '#4F46E5' },
                gold: '#F59E0B',
                mint: '#10B981',
                cream: '#F8FAFC',
                peach: { light: '#F8FAFC', DEFAULT: '#F1F5F9' },
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'],
                mono: ['SF Mono', 'JetBrains Mono', 'monospace'],
                serif: ['SF Pro Display', '-apple-system', 'Inter', 'sans-serif'],
            },
            boxShadow: {
                'enterprise': '0 1px 3px rgba(0, 0, 0, 0.05)',
                'enterprise-hover': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'accent': '0 10px 40px rgba(59, 130, 246, 0.3)',
            }
        }
    },
    plugins: [],
}
