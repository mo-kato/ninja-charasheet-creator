"use client";

import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import CommonTable from "@/components/common-table";
import IconButton from "@/components/icon-button";
import { css } from "@/styled-system/css";
import type { CommonSlotProps } from "@/type";

function LikeabilityEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "wealth.likeability",
  });

  return (
    <>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th className="left">人名</th>
            <th className="left">親密度</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((like, index) => (
            <tr key={like.id}>
              <td className="left">
                <input type="text" {...register(`wealth.likeability.${index}.name`)} placeholder="人名" />
              </td>
              <td className="left">
                <input
                  type="number"
                  {...register(`wealth.likeability.${index}.likeability`, { valueAsNumber: true })}
                />
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
      <IconButton type="button" onClick={() => append({ name: "", likeability: 0 })}>
        <MdAdd size={20} />
        <div>親密度追加</div>
      </IconButton>
    </>
  );
}

export default memo(LikeabilityEditor);
