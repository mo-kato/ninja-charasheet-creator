"use client";

import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import CommonTable from "@/components/common-table";
import Selectbox from "@/components/correction-selectbox";
import IconButton from "@/components/icon-button";
import CorrectionEditor from "@/pages/_components/edit-form/slot-editors/correction-editor";
import { armorPartSchema, armorTypeSchema } from "@/schema";
import { css } from "@/styled-system/css";
import type { CommonSlotProps } from "@/type";

function ArmorEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "armor",
  });
  return (
    <>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th>装備</th>
            <th className="left">部位</th>
            <th className="left">名称</th>
            <th className="left">種別</th>
            <th className="left">補正値</th>
            <th className={`left ${css({ w: "full" })}`}>効果</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((armor, index) => (
            <tr key={armor.id}>
              <td>
                <Checkbox {...register(`armor.${index}.isWearing`)} />
              </td>
              <td className="left">
                <Selectbox
                  {...register(`armor.${index}.part`)}
                  options={armorPartSchema.options}
                  labels={armorPartSchema.options}
                />
              </td>
              <td className="left">
                <input type="text" {...register(`armor.${index}.name`)} placeholder="名称" />
              </td>
              <td className="left">
                <Selectbox
                  {...register(`armor.${index}.type`)}
                  options={armorTypeSchema.options}
                  labels={armorTypeSchema.options}
                />
              </td>
              <td className="left">
                <CorrectionEditor
                  {...{
                    name: `armor.${index}.correction`,
                    register,
                    control,
                  }}
                />
              </td>
              <td className="left">
                <textarea {...register(`armor.${index}.effect`)} />
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
            correction: [],
            effect: "",
            part: "頭部",
            type: "防具",
            cyberneticLv: 0,
          })
        }
      >
        <MdAdd size={20} />
        <div>防具追加</div>
      </IconButton>
    </>
  );
}

export default memo(ArmorEditor);
