import { css, cx } from "@/styled-system/css";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  classNames?: string[];
}

function Checkbox({ classNames, ref, ...rest }: Props) {
  return (
    <input
      type="checkbox"
      ref={ref}
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
            content: "url('/images/check_box_outline_blank.svg')",
          },
          _checked: {
            _before: {
              content: "url('/images/select_check_box.svg')",
            },
          },
        }),
        ...(classNames ?? []),
      )}
    />
  );
}

export default Checkbox;
