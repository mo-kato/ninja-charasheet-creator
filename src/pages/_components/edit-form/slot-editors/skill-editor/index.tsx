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

function SkillEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "skillSlot",
  });

  const skills = useWatch({ control, name: "skillSlot" });

  const havingSkillCostSum = skills
    .filter(skill => skill.has)
    .reduce((acc, cur) => acc + (cur.name.match(/◉/g) || []).length, 0);

  const memorizedSkillCostSum = skills
    .filter(skill => !skill.has)
    .reduce((acc, cur) => acc + (cur.name.match(/◉/g) || []).length, 0);

  const max = Math.min(useWatch({ control, name: "base.wazamae" }), 8);
  const neuron = useWatch({ control, name: "base.neuron" });

  return (
    <>
      <span>
        スロット使用状況： 所持（
        <span className={havingSkillCostSum > max ? css({ color: "foreground.accent", fontWeight: "bold" }) : ""}>
          {havingSkillCostSum}
        </span>
        &nbsp;/{max}） 記憶（
        <span className={memorizedSkillCostSum > neuron ? css({ color: "foreground.accent", fontWeight: "bold" }) : ""}>
          {memorizedSkillCostSum}
        </span>
        &nbsp;/{neuron}）
      </span>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th>所持</th>
            <th className="left">スキル名</th>
            <th className="left">補正値</th>
            <th className={`left ${css({ w: "full" })}`}>効果</th>
            <th>移動</th>
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
      <IconButton type="button" onClick={() => append({ name: "", has: false, correction: [], effect: "" })}>
        <MdAdd size={20} />
        <div>スキル追加</div>
      </IconButton>
    </>
  );
}

export default memo(SkillEditor);
