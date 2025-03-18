import { defineSemanticTokens, defineTokens } from "@pandacss/dev";

export const colors = defineTokens.colors({
  primary: {
    "100": { value: "#00FFFF" },
    "200": { value: "#00e0e0" },
    "300": { value: "#00999b" },
    "400": { value: "#006465" },
  },
  accent: {
    "100": { value: "#FF00FF" },
    "200": { value: "#ffd6ff" },
  },
  text: {
    "100": { value: "#FFFFFF" },
    "200": { value: "#e0e0e0" },
  },
  base: {
    "100": { value: "#0A0A0A" },
    "200": { value: "#1b1b1b" },
    "300": { value: "#323232" },
    "300a": { value: "#323232A6" },
  },
});

export const semanticColors = defineSemanticTokens.colors({
  background: {
    DEFAULT: { value: "{colors.base.100}" },
    subtle: { value: "{colors.base.200}" },
    light: { value: "{colors.base.300}" },
    modal: { value: "{colors.base.300a}" },
  },
  foreground: {
    DEFAULT: { value: "{colors.text.100}" },
    subtle: { value: "{colors.text.200}" },
    accent: { value: "{colors.accent.100}" },
    mute: { value: "{colors.primary.400}" },
    "mute-accent": { value: "{colors.accent.200}" },
  },
  button: {
    DEFAULT: { value: "{colors.primary.200}" },
    accent: { value: "{colors.accent.100}" },
    dark: { value: "{colors.primary.300}" },
  },
});
