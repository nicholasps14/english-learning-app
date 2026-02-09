/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // iOS-inspired minimal color palette
        primary: {
          DEFAULT: "#007AFF", // iOS system blue
          light: "#5AC8FA",
          dark: "#0051D5",
        },
        tech: {
          primary: "#007AFF",
          light: "#5AC8FA",
          dark: "#0051D5",
          bg: "#F2F2F7", // iOS grouped background
          pastel: "#E3F2FF", // Very light blue (iCloud-style)
        },
        life: {
          primary: "#34C759", // iOS system green
          light: "#30D158",
          dark: "#248A3D",
          bg: "#F2F2F7",
          pastel: "#E8F7F0", // Very light green (iCloud-style)
        },
        success: {
          DEFAULT: "#34C759",
          light: "#30D158",
          dark: "#248A3D",
        },
        error: {
          DEFAULT: "#FF3B30",
          light: "#FF6961",
          dark: "#D70015",
        },
        warning: {
          DEFAULT: "#FF9500",
          light: "#FFCC00",
          dark: "#FF6D00",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F2F2F7", // iOS secondary background
          200: "#E5E5EA", // iOS separator
          300: "#D1D1D6",
          400: "#C7C7CC",
          500: "#AEAEB2",
          600: "#8E8E93", // iOS secondary label
          700: "#636366",
          800: "#48484A",
          900: "#1C1C1E", // iOS label
        },
      },
      fontFamily: {
        sans: ["Inter"],
      },
      fontSize: {
        // iOS typography scale
        xs: ["11px", { lineHeight: "16px" }], // Caption 2
        "body-sm": ["13px", { lineHeight: "18px" }], // Footnote
        body: ["17px", { lineHeight: "22px" }], // Body (iOS default)
        "body-lg": ["19px", { lineHeight: "24px" }],
        h3: ["22px", { lineHeight: "28px", fontWeight: "600" }], // Title 3
        h2: ["28px", { lineHeight: "34px", fontWeight: "700" }], // Title 2
        h1: ["34px", { lineHeight: "41px", fontWeight: "700" }], // Large Title
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      borderRadius: {
        DEFAULT: "10px", // iOS standard
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        // Subtle iOS-style shadows
        sm: "0 1px 3px rgba(0,0,0,0.04)",
        md: "0 2px 8px rgba(0,0,0,0.06)",
        lg: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
