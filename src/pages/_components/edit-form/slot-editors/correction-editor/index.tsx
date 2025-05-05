"use client";

import { memo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { MdAdd, MdRemove } from "react-icons/md";
import * as styled from "./styled";

import Selectbox from "@/components/correction-selectbox";
import { LABEL_NAMES } from "@/constants";
import { computedDataKeySchema } from "@/schema";
import type { CommonSlotProps, ComputedDataKey } from "@/type";

interface Props extends CommonSlotProps {
  name:
    | `armor.${number}.correction`
    | `weapon.${number}.passiveCorrection`
    | `weapon.${number}.equippedCorrection`
    | `skillSlot.${number}.correction`
    | `jitsuSlot.${number}.correction`;
}

function CorrectionEditor({ name, register, control }: Props) {
  const [selectedKey, setSelectedKey] = useState<ComputedDataKey>("karateDice");
  const [correctionSize, setCorrectionSize] = useState<number>(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((corr, index) => (
        <span key={corr.id} className={styled.skill}>
          <input type="hidden" {...register(`${name}.${index}.key`)} readOnly />
          <input type="hidden" {...register(`${name}.${index}.size`)} readOnly />
          {`${LABEL_NAMES[corr.key]} ${corr.size > 0 ? "+" : ""}${corr.size} `}
          <button type="button" className={styled.button} onClick={() => remove(index)}>
            <MdRemove size={16} />
          </button>
        </span>
      ))}
      <div className={styled.correctionSelect}>
        <Selectbox
          options={[...computedDataKeySchema.exclude(["karate", "neuron", "wazamae", "jitsu"]).options]}
          value={selectedKey}
          onChange={e => setSelectedKey(e.target.value as ComputedDataKey)}
        />
        <input
          type="number"
          value={correctionSize}
          onChange={e => setCorrectionSize(Number(e.target.value))}
          className={styled.size}
        />
        <button
          type="button"
          className={styled.button}
          onClick={() => append({ key: selectedKey, size: correctionSize })}
          disabled={correctionSize === 0}
        >
          <MdAdd size={16} />
        </button>
      </div>
    </>
  );
}

export default memo(CorrectionEditor);
