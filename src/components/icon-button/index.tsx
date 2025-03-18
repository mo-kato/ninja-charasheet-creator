import { cx } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { type ComponentPropsWithRef, memo } from "react";

interface Props extends ComponentPropsWithRef<"button"> {
  buttonType?: "primary" | "secondary" | "tertiary";
  classNames?: string[];
}

function IconButton({ classNames, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cx(
        flex({
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "sm",
          whiteSpace: "nowrap",
          bgColor: "button",
          border: 0,
          px: 2,
          py: 1,
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
          "& > div": {
            pt: "2px",
          },
        }),
        ...(classNames ?? []),
      )}
    >
      {children}
    </button>
  );
}

export default memo(IconButton);
