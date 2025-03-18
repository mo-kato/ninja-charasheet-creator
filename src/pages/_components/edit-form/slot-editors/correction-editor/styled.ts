import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export const skill = css({
  display: "inline-flex",
  alignItems: "end",
  lineHeight: 1,
  mr: 2,
  _last: {
    mr: "unset",
  },
});

export const button = css({
  bgColor: "button",
  borderRadius: "xs",
  w: 4,
  h: 4,
  verticalAlign: "text-top",
  color: "foreground.mute!",
  _disabled: {
    bgColor: "button.dark",
  },
});

export const corrections = css({
  ml: 1.5,
  _first: {
    ml: "unset",
  },
  whiteSpace: "nowrap",
  "&+div": {
    mt: 1,
  },
});

export const correctionSelect = flex({
  alignItems: "center",
  h: 7,
});

export const size = css({
  mx: 1.5,
  borderRadius: "xs",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "white",
  px: 1,
  h: "full",
  w: 14,
});
