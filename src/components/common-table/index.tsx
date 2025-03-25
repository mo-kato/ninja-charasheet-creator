import { css, cx } from "@/styled-system/css";
import { type ComponentPropsWithoutRef, memo } from "react";

interface Props extends ComponentPropsWithoutRef<"table"> {
  classNames?: string[];
}

function CommonTable({ classNames, children, ...rest }: Props) {
  return (
    <table
      {...rest}
      className={cx(
        css({
          borderCollapse: "collapse",
          borderRadius: "sm",
          bgColor: "background.subtle",
          tableLayout: "fixed",
          fontSize: "sm",
          "& th, td": {
            p: 2,
            textAlign: "center",
            whiteSpace: "pre-wrap",
            "&.left": {
              textAlign: "left!",
            },
            _first: {
              pl: 5,
            },
            _last: {
              pr: 5,
            },
          },
          "& thead": {
            color: "button",
            borderBottom: "3px solid var(--colors-background-light)",
            "& th": {
              textWrap: "nowrap",
              _first: {
                borderRadius: "var(--radii-sm) 0 0 0",
              },
              _last: {
                borderRadius: "0 var(--radii-sm) 0 0",
              },
            },
          },
          "& tbody": {
            "& tr": {
              "&:not(:last-child)": {
                borderBottom: "1px dashed var(--colors-background-light)",
              },
              "& td": {
                "& img": {
                  m: "auto",
                },
                '& > input[type="checkbox"]': {
                  display: "block",
                  m: "auto",
                },
                '& > input[type="text"], input[type="number"], textarea': {
                  borderRadius: "xs",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "foreground.mute",
                  p: 1,
                },
                '& > input[type="number"]': {
                  w: 14,
                },
              },
              "& th": {
                color: "foreground.subtle",
              },
              _last: {
                "& > th": {
                  borderRadius: "0 0 0 var(--radii-sm)",
                },
                "& td": {
                  _last: {
                    borderRadius: "0 0 var(--radii-sm) 0",
                  },
                },
              },
            },
          },
        }),
        ...(classNames ?? []),
      )}
    >
      {children}
    </table>
  );
}

export default memo(CommonTable);
