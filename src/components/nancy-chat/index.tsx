import { css, cx } from "@/styled-system/css";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<"div"> {
  classNames?: string[];
}

function NancyChat({ classNames, children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cx(
        css({
          bgColor: "#9ec200",
          color: "black",
          fontFamily: `"DotGothic16", sans-serif`,
          fontSize: "sm",
          borderStyle: "ridge",
          borderWidth: "5px",
          borderColor: "text.200",
          "& *.caret": {
            animation: "tikatika 1s step-end infinite",
          },
        }),
        ...(classNames ?? []),
      )}
    >
      {children}
    </div>
  );
}

export default NancyChat;
