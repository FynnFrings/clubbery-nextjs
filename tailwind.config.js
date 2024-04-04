/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			boxShadow: {
				input: "0 0 5px !important",
			},
		},
		animation: {
			fill: "fill 2s ease-out 1 forwards",
			popup: "popup 0.5s ease-in-out 1 forwards, popupDelay 0.5s ease-in-out 4s 1 forwards",
			// slide: "slide 0.5s ease 0s 1 normal forwards",
			// slideBack: "slideBack 0.5s ease 0s 1 normal forwards",
			// loader: "loader 1s linear infinite",
		},
		keyframes: {
			fill: {
				"0%": { width: "0%", borderBottomRightRadius: "0rem" },
				"100%": { width: "100%", borderBottomRightRadius: "0.5rem" },
			},
			popup: {
				"0%": {
					bottom: "-100%",
				},
				"100%": {
					bottom: "1rem",
				},
			},
			// popupDelay: {
			// 	"0%": {
			// 		bottom: "1rem",
			// 	},
			// 	"100%": {
			// 		bottom: "-100%",
			// 	},
			// },
			// slide: {
			// 	"0%": {
			// 		transform: "translateX(400px)",
			// 	},
			// 	"100%": {
			// 		transform: "translateX(0)",
			// 	},
			// },
			// slideBack: {
			// 	"0%": {
			// 		transform: "translateX(0)",
			// 	},
			// 	"100%": {
			// 		transform: "translateX(600px)",
			// 	},
			// },
			// loader: {
			// 	"0%": {
			// 		transform: "translateX(-100%)" /* Start from the left side */,
			// 	},
			// 	"50%": {
			// 		transform: "translateX(100%)" /* Move to the right side */,
			// 	},
			// 	"100%": {
			// 		transform: "translateX(200%)" /* Move to the right side */,
			// 	},
			// },
		},
	},
	plugins: [require("tailwindcss-animated")],
};
