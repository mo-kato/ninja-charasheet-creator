import { css, cva } from "@/styled-system/css";

export const buttonWrapper = css({
  display: "inline-flex",
  alignItems: "center",
});

export const button = cva({
  base: {
    "& button": {
      bgColor: "button.dark",
      border: 0,
      color: "foreground.subtle",
      py: 1.5,
      px: 2,
      fontWeight: "bold",
      fontSize: "sm",
    },
    _first: {
      "& button": {
        borderLeftRadius: "full",
        pl: 4,
      },
    },
    _last: {
      "& button": {
        borderRightRadius: "full",
        pr: 4,
      },
    },
  },
  variants: {
    selected: {
      true: {
        "& button": {
          bgColor: "button",
          color: "foreground.mute",
        },
      },
    },
  },
});
