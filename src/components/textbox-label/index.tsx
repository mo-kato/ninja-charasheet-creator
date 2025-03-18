import { type ReactNode, memo } from "react";
import * as styled from "./styled";

function TextboxLabel({ labelName, children }: { labelName: string; children: ReactNode }) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label className={styled.label}>
      <span className={styled.labelName}>{labelName}</span>
      <span className={styled.inputs}> {children}</span>
    </label>
  );
}

export default memo(TextboxLabel);
