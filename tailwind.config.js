/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderRadius: {
        inner: "1vw", // Custom value
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }) {
      addUtilities({
        ".clip-pole": {
          "clip-path":
            "polygon(50% 0, 60% 10%, 60% 90%, 100% 100%, 0% 100%, 40% 90%, 40% 20%, 40% 10%)",
        },
        ".clip-flag": {
          "clip-path":
            "polygon(0% 50%, 10% 0,100% 0,100% 100%, 10% 100%)",
        },
        ".clip-flag-right": {
          "clip-path":
            "polygon(0% 0%, 90% 0,100% 50%,90% 100%, 0% 100%)",
        },
      });
    },
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
