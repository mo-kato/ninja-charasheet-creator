import { css } from "@/styled-system/css";

export const label = css({
  display: "flex",
  flexDirection: "column",
  minW: 0,
});

export const labelName = css({
  lineHeight: "loose",
  letterSpacing: "-0.5px",
  whiteSpace: "nowrap",
});

export const inputs = css({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",

  "& input[type='text'], input[type='number'], select, textarea": {
    bgColor: "background.subtle",
    p: 2,
    borderRadius: "sm",
    minW: 20,
    h: 10,
  },

  "&:not(:has(button)) input, input[disabled]": {
    _readOnly: {
      bgColor: "rgba(0, 0, 0, 0.35);",
    },
  },

  "& button": {
    my: "1px",
    ml: 2,
  },
});
