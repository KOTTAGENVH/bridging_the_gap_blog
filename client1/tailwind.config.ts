import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'bg-gradient-one': 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        'bg-gradient-two': 'linear-gradient(to top, #09203f 0%, #537895 100%)'
      },
    },
  },
  plugins: [],
} satisfies Config;
