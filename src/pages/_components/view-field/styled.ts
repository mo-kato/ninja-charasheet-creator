import { css } from "@/styled-system/css";

export const header = css({
  justifyContent: "space-between",
});

export const buttonArea = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

export const primaryButton = css({
  mb: 2,
});

export const section = css({
  minW: "100%",
  display: "flex",
  flexWrap: "wrap",
  w: "fit-content",
  "& > div:not(:last-child)": {
    mr: 6,
  },
});

export const freeMemo = css({
  bgColor: "background.subtle",
  p: 4,
  borderRadius: "sm",
  minH: 10,
  w: "full",
});

export const effect = css({
  maxH: 28,
  overflowX: "auto",
  minW: 40,
});

export const preWrap = css({
  whiteSpace: "pre-wrap",
  pt: 2,
  pl: 2,
});

export const surikenText = css({
  textAlign: "start",
  p: 2,
  textWrap: "nowrap",
  fontSize: "md",
  _before: {
    content: "url('/images/suriken.svg')",
    position: "relative",
    top: 1,
    left: -0.5,
  },
});

export const nancy = css({
  position: "fixed",
  p: 4,
  bottom: 6,
  right: 4,
  "& a": {
    fontSize: "md",
    textDecorationLine: "underline",
    _hover: {
      textDecorationLine: "none",
    },
  },
});
