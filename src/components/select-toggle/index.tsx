import { memo, useCallback, useState } from "react";
import * as styled from "./styled";

interface OptionItemProps {
  option: string;
  selected: boolean;
  onClick: (option: string) => void;
}

const OptionItem = memo(({ option, selected, onClick }: OptionItemProps) => {
  return (
    <li className={styled.button({ selected })}>
      <button type="button" onClick={() => onClick(option)}>
        {String(option)}
      </button>
    </li>
  );
});

interface Props {
  options: string[];
  onChange: (value: string) => void;
}

function SelectToggle({ options, onChange }: Props) {
  const [selected, setSelected] = useState(options[0]!);

  const handleClick = useCallback(
    (option: string) => {
      if (option !== selected) {
        setSelected(option);
        onChange(option);
      }
    },
    [selected, onChange],
  );

  return (
    <ul className={styled.buttonWrapper}>
      {options.map(option => (
        <OptionItem key={String(option)} option={option} selected={option === selected} onClick={handleClick} />
      ))}
    </ul>
  );
}

export default memo(SelectToggle);
