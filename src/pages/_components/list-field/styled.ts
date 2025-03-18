import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export const listWrapper = css({});

export const listItem = css({
  bgColor: "background.light",
  borderRadius: "lg",
  mb: 4,
  px: 6,
  py: 4,
  _last: {
    mb: "unset",
  },
});

export const form = flex({
  justifyContent: "center",
  "& > div": {
    _first: {
      mr: 4,
    },
    _last: {
      pt: 2,
    },
  },
});

export const info = flex({
  alignItems: "baseline",
  justifyContent: "space-between",
});

export const buttonArea = flex({
  alignItems: "center",
  mt: 2,
  "& > a": {
    mr: 2,
  },
});

export const status = css({
  ml: 4,
});

export const uploadButton = css({
  _file: {
    bgColor: "button",
    border: 0,
    px: 2,
    py: 1,
    borderRadius: "sm",
    color: "foreground.mute",
    fontWeight: "bold",
    cursor: "pointer",
    _disabled: {
      bgColor: "button.dark",
    },
    "&:not([disabled])": {
      _active: {
        bgColor: "button.dark",
      },
    },
    mr: 2,
  },
});

export const modalWrapper = css({
  position: "fixed",
  w: "100vw",
  h: "100vh",
  top: 0,
  left: 0,
  bgColor: "background.modal",
  zIndex: 1,
});

export const modal = css({
  zIndex: 2,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  w: "fit",
  p: 6,
});

export const realDeleteButton = css({
  textDecoration: "underline",
  _hover: {
    textDecoration: "none",
  },
});
