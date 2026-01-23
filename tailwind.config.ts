import type { Config } from "tailwindcss";

export default {
  content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      colors: {
        bg: "#ecddc6",
        sand: "#c8ad7f",
        cream: "#e1c699",
        cocoa: "#5b3c11",
      },
      boxShadow: {
        soft: "5px 5px 30px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
