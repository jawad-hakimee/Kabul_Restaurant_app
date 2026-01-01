/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FFD700', // Gold/Yellow for branding
                secondary: '#000000', // Black
                accent: '#F5F5F5', // Light Gray
            }
        },
    },
    plugins: [],
}
