import { cx } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { type ComponentPropsWithRef, memo } from "react";
import { Link } from "waku";

interface Props extends ComponentPropsWithRef<typeof Link> {
  buttonType?: "primary" | "secondary" | "tertiary";
  classNames?: string[];
}

function IconButtonLink({ classNames, children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      className={cx(
        flex({
          alignItems: "center",
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
    </Link>
  );
}

export default memo(IconButtonLink);
