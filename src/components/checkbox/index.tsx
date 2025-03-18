import { css, cx } from "@/styled-system/css";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  classNames?: string[];
}

function Checkbox({ classNames, ...rest }: Props) {
  return (
    <input
      type="checkbox"
      {...rest}
      className={cx(
        css({
          WebkitAppearance: "none",
          display: "inline-block",
          h: 5,
          _before: {
            display: "block",
            h: "full",
            cursor: "pointer",
            content: "url('/check_box_outline_blank.svg')",
          },
          _checked: {
            _before: {
              content: "url('/select_check_box.svg')",
            },
          },
        }),
        ...(classNames ?? []),
      )}
    />
  );
}

export default Checkbox;
