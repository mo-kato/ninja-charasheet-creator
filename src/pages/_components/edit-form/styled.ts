import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export const plusButton = css({
  mt: "auto",
  mb: "3px",
});

export const content = flex({
  flexWrap: "nowrap",
  alignItems: "flex-end",
  mb: 2,
  "& > span": {
    minW: 0,
    flexShrink: 1,
  },
  "& label": {
    mr: 4,
  },
  _last: {
    mb: "unset",
  },
});

export const textareaWrapper = css({
  w: "full!",
  h: "40 !",
});
