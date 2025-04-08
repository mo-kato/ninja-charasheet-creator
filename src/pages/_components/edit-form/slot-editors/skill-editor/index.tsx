"use client";

import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import CommonTable from "@/components/common-table";
import IconButton from "@/components/icon-button";
import CorrectionEditor from "@/pages/_components/edit-form/slot-editors/correction-editor";
import { css } from "@/styled-system/css";
import type { CommonSlotProps } from "@/type";

function SkillEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillSlot",
  });

  return (
    <>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th>所持</th>
            <th className="left">スキル名</th>
            <th className="left">補正値</th>
            <th className={`left ${css({ w: "full" })}`}>効果</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((skill, index) => (
            <tr key={skill.id}>
              <td>
                <Checkbox {...register(`skillSlot.${index}.has`)} defaultChecked={!!skill.has} />
              </td>
              <td className="left">
                <input
                  type="text"
                  {...register(`skillSlot.${index}.name`)}
                  defaultValue={skill.name}
                  placeholder="スキル名"
                />
              </td>
              <td className="left">
                <CorrectionEditor
                  {...{
                    name: `skillSlot.${index}.correction`,
                    register,
                    control,
                  }}
                />
              </td>
              <td className="left">
                <textarea {...register(`skillSlot.${index}.effect`)} defaultValue={skill.effect || ""} />
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
      <IconButton type="button" onClick={() => append({ name: "", has: false, correction: [], effect: "" })}>
        <MdAdd size={20} />
        <div>スキル追加</div>
      </IconButton>
    </>
  );
}

export default memo(SkillEditor);
