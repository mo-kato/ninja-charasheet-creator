import { colors, semanticColors } from "@/foundations/token/colors";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors,
      },
      keyframes: {
        tikatika: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      semanticTokens: {
        colors: semanticColors,
      },
    },
  },

  globalCss: {
    "html,body": {
      bgColor: "background",
      color: "white",
      minH: "100vh",
      width: "100vw",
      fontFamily: '"IBM Plex Sans JP", sans-serif',
    },
    button: {
      cursor: "pointer",
      _disabled: {
        cursor: "default",
      },
    },
    input: {
      _readOnly: {
        cursor: "default",
      },
      _disabled: {
        cursor: "default",
      },
    },
    select: {
      cursor: "pointer",
      _disabled: {
        cursor: "default",
      },
    },
    h1: {
      fontSize: "2xl",
      fontWeight: "bold",
      lineHeight: "loose",
    },
    h2: {
      fontSize: "xl",
      fontWeight: "bold",
      lineHeight: "loose",
    },
    h3: {
      fontSize: "lg",
      fontWeight: "bold",
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "md",
      fontWeight: "bold",
      lineHeight: 1.5,
    },
    summary: {
      listStyle: "none",
      cursor: "pointer",
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
