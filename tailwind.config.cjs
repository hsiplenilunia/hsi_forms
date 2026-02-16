/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Montserrat', 'sans-serif']
		}
		,
		extend: {
			colors: {
				purple: "#7758AC",
				'purple-text': "#7244B4",
				apple: "#C2D293",
				guacamole: "#C2D293",
				guacamole2: "#B7D280",
				'guacamole-light': "#D9E4BB",
				'apple-dark':"#B7D280",
				'pink-fresh':"#F8C5FE",
				'black-text': "#020202",
				capuchino: "#EBE5DD",
				'light-text': "#FAF9F9"
			}
		},
	},
	plugins: [],
}
