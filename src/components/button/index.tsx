import { cva, cx } from "@/styled-system/css";
import { type ComponentPropsWithRef, memo } from "react";

interface Props extends ComponentPropsWithRef<"button"> {
  buttonType?: "primary" | "secondary" | "tertiary";
  classNames?: string[];
}

function Button({ buttonType, classNames, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cx(
        cva({
          base: {
            borderRadius: "sm",
            whiteSpace: "nowrap",
          },
          variants: {
            buttonType: {
              primary: {
                border: "1px solid #fff",
                px: 6,
                py: 4,
                color: "white",
                display: "inline-block",
                _active: {
                  boxShadow: "unset",
                  textShadow: "unset",
                },
                "&:not([disabled])": {
                  boxShadow: `0 0 5px #fff inset,
                0 0 5px #fff inset,
                0 0 5px #fff,
                0 0 5px var(--colors-button-accent) inset,
                0 0 5px var(--colors-button-accent) inset,
                0 0 5px var(--colors-button-accent),
                0 0 20px var(--colors-button-accent)`,
                  textShadow:
                    "0 0 10px #fff, 0 0 0px #fff, 0 0 0px var(--colors-button-accent), 0 0 0px var(--colors-button-accent), 0 0 10px var(--colors-button-accent),0 0 10px var(--colors-button-accent), 0 0 20px var(--colors-button-accent)",
                },
              },
              secondary: {
                bgColor: "button",
                border: 0,
                px: 2,
                py: 1,
                borderRadius: "sm",
                color: "foreground.mute",
                fontWeight: "bold",
                _disabled: {
                  bgColor: "button.dark",
                },
                "&:not([disabled])": {
                  _active: {
                    bgColor: "button.dark",
                  },
                },
              },
              tertiary: {
                bgColor: "background.light",
                border: 0,
                px: 2,
                py: 1,
              },
            },
          },
          defaultVariants: {
            buttonType: "secondary",
          },
        })({ buttonType }),
        ...(classNames ?? []),
      )}
    >
      {children}
    </button>
  );
}

export default memo(Button);
