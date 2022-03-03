module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false,
	theme: {
		fontFamily: {
			sans: ["Geometria", "Lato", "sans-serif"],
		},
		boxShadow: {},
		screens: {
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1440px",
			"3xl": "2560px",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			black: "#000000",
			purple: {
				DEFAULT: "#8E2DE2",
				dark: "#4A00E0",
				darker: "#060213",
				darkest: "#14073B",
			},
			gray: {
				light: "#E0E3E5",
				DEFAULT: "#2A445A",
				darker: "#1C1819",
			},
		},
		letterSpacing: {
			widest: "0.4rem",
		},
	},
	variants: {
		extend: {
			fontSize: {
				"7xl": "10rem",
			},
		},
	},
	plugins: [],
};
