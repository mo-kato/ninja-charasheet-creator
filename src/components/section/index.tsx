import { css, cx } from "@/styled-system/css";
import { type ComponentPropsWithoutRef, memo } from "react";

interface Props extends ComponentPropsWithoutRef<"section"> {
  classNames?: string[];
}

function Section({ classNames, children, ...rest }: Props) {
  return (
    <section
      {...rest}
      className={cx(
        css({
          bgColor: "background.light",
          pt: 4,
          pb: 6,
          px: 6,
          borderRadius: "lg",
          mb: 6,
          _last: {
            mb: "unset",
          },
        }),
        ...(classNames ?? []),
      )}
    >
      {children}
    </section>
  );
}

export default memo(Section);
