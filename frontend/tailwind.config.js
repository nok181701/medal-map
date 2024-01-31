/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // 通常のサイズ
        md: "768px", // タブレットサイズ
        lg: "1024px", // ラップトップサイズ
        xl: "1280px", // デスクトップサイズ
        "2xl": "1536px", // 大型デスクトップサイズ
      },
      transitionProperty: {
        transform: "transform",
      },
      backgroundColor: {
        contentsBg: "#f9f9f9",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
