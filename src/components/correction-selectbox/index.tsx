import { type ComponentPropsWithRef, memo } from "react";

import { LABEL_NAMES } from "@/constants";
import { css } from "@/styled-system/css";
import type { ComputedDataKey } from "@/type";

interface Props extends ComponentPropsWithRef<"select"> {
  options: string[];
  labels?: string[];
}

function Selectbox({ options, labels, ref, ...rest }: Props) {
  return (
    <select
      ref={ref}
      {...rest}
      className={css({
        h: "full",
        borderRadius: "xs",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "foreground.mute",
        p: 1,
      })}
    >
      {options.map((key, i) => (
        <option key={`${name}-${key}`} value={key}>
          {!labels ? LABEL_NAMES[key as ComputedDataKey] : (labels[i] ?? "")}
        </option>
      ))}
    </select>
  );
}

export default memo(Selectbox);
