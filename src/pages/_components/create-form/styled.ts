import { css, cva } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export const content = flex({
  flexWrap: "wrap",
  alignItems: "flex-end",
  mb: 2,
  "& label": {
    mr: 4,
  },
  _last: {
    mb: "unset",
  },
});

export const statusContent = flex({
  flexWrap: "nowrap",
  alignItems: "flex-end",
  mb: 2,
  "& label": {
    mr: 4,
    flexShrink: 1,
    minW: 0,
  },
  _last: {
    mb: "unset",
  },
});

export const textareaWrapper = css({
  w: "full!",
  h: "40 !",
});

export const remainingPoints = cva({
  variants: {
    minus: {
      true: {
        color: "accent.100",
      },
    },
  },
});

export const wideTextbox = css({ w: 60 });

export const noFormSection = css({
  px: "4",
  textAlign: "right",
  "& > h2": {
    lineHeight: "loose",
  },
  "& > button": {
    my: 4,
    ml: "auto",
  },
});
