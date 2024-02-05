/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "thistle-blue": "#CFBAE1",
        licorice: "#0D0106",
        lctrine: "#FFFD82",
        "light-green": "#2EC4B6",
        "orange-peel": "#FF9F1C",
        deepblue: "#011026",
        lightblue: {
          DEFAULT: "#1b76ff",
          50: "#f2f7ff",
          100: "#d7e7ff",
          150: "#bcd7ff",
          200: "#a1c7ff",
          250: "#86b7ff",
          300: "#6ba6ff",
          350: "#5096ff",
          400: "#3686ff",
          450: "#1b76ff",
          500: "#0066ff",
          550: "#005be4",
          600: "#0051c9",
          650: "#0046ae",
          700: "#003b94",
          750: "#003079",
          800: "#00265e",
          850: "#001b43",
          900: "#001028",
          950: "#00050d",
        },
        deepgreen: "#011400",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
