const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.css",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      boxShadow: {
        "outline-glenstack": `0 0 0 3px rgba(170, 218, 103, 0.45)`,
      },
      colors: {
        glenstack: {
          "50": "#f3f9eb",
          "100": "#e6f4d2",
          "200": "#c3e298",
          "300": "#aada67",
          "400": "#86c232",
          "500": "#72a330",
          "600": "#527b18",
          "700": "#3f690c",
          "800": "#375e08",
          "900": "#305502",
        },
        glenstackhighlight: "#7afdd6",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/ui")],
};
