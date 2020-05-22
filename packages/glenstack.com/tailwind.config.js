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
      colors: {
        'glenstackprimary': '#86c232',
        'glenstacksecondary': '#72a330',
        'glenstacktertiary': '#618a30',
        'glenstackbase': '#3a4a26',
        'glenstackhighlight': '#7afdd6',
      }
    }
  },
  plugins: [require("@tailwindcss/ui")],
};
