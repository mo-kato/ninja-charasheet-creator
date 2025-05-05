"use client";

import { memo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import CommonTable from "@/components/common-table";
import IconButton from "@/components/icon-button";
import CorrectionEditor from "@/pages/_components/edit-form/slot-editors/correction-editor";
import { css } from "@/styled-system/css";
import type { CommonSlotProps } from "@/type";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function WeaponEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "weapon",
  });
  const slot = useWatch({ control, name: "weapon" }).reduce((acc, cur) => acc + cur.slot, 0);

  return (
    <>
      <span>
        スロット使用状況（
        <span className={slot > 6 ? css({ color: "foreground.accent", fontWeight: "bold" }) : ""}>{slot}</span>
        &nbsp;/6）
      </span>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th>装備</th>
            <th className="left">名称</th>
            <th>占有数</th>
            <th className="left">所持補正値</th>
            <th className="left">装備補正値</th>
            <th className={`left ${css({ w: "full" })}`}>効果</th>
            <th>移動</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((weapon, index) => (
            <tr key={weapon.id}>
              <td>
                <Checkbox {...register(`weapon.${index}.isWearing`)} />
              </td>
              <td className="left">
                <input type="text" placeholder="名称" {...register(`weapon.${index}.name`)} />
              </td>
              <td className="left">
                <input type="number" {...register(`weapon.${index}.slot`, { valueAsNumber: true })} />
              </td>
              <td className="left">
                <CorrectionEditor
                  {...{
                    name: `weapon.${index}.passiveCorrection`,
                    register,
                    control,
                  }}
                />
              </td>
              <td className="left">
                <CorrectionEditor
                  {...{
                    name: `weapon.${index}.equippedCorrection`,
                    register,
                    control,
                  }}
                />
              </td>
              <td className="left">
                <textarea {...register(`weapon.${index}.effect`)} />
              </td>
              <td>
                {index !== 0 && (
                  <Button type="button" buttonType="tertiary" onClick={() => move(index, index - 1)}>
                    <FaChevronUp size={15} />
                  </Button>
                )}
                {index !== fields.length - 1 && (
                  <Button type="button" buttonType="tertiary" onClick={() => move(index, index + 1)}>
                    <FaChevronDown size={15} />
                  </Button>
                )}
              </td>
              <td>
                <Button type="button" buttonType="tertiary" onClick={() => remove(index)}>
                  <MdDelete size={24} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </CommonTable>
      <IconButton
        type="button"
        onClick={() =>
          append({
            name: "",
            isWearing: false,
            slot: 1,
          })
        }
      >
        <MdAdd size={20} />
        <div>武器追加</div>
      </IconButton>
    </>
  );
}

export default memo(WeaponEditor);
