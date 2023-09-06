/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        manitocolor: colors.lime,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "mobile-landscape": {
          raw: "(orientation: landscape) and (max-height: 767px)",
        },
        "mobile-highres-landscape": {
          raw: "(orientation: landscape) and (max-height: 800px)",
        },
      },
      scrollbar: (theme) => ({
        thin: "thin",
        thumb: "rounded-lg",
        DEFAULT: {
          background: "transparent",
          thumb: theme("backgroundColor.gray.200"),
          track: theme("backgroundColor.transparent"),
        },
      }),
    },
  },
  plugins: [],
};
