"use client";

import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import CommonTable from "@/components/common-table";
import IconButton from "@/components/icon-button";
import { css } from "@/styled-system/css";
import type { CommonSlotProps } from "@/type";

function JitsuEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "jitsuSlot",
  });

  return (
    <>
      <CommonTable classNames={[css({ mt: 2, mb: 3 })]}>
        <thead>
          <tr>
            <th className="left">ジツ名</th>
            <th className="left">効果</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((jitsu, index) => (
            <tr key={jitsu.id}>
              <td className="left">
                <input type="text" {...register(`jitsuSlot.${index}.name`)} placeholder="ジツ名" />
              </td>
              <td className="left">
                <textarea {...register(`jitsuSlot.${index}.effect`)} />
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
        <div>ジツ追加</div>
      </IconButton>
    </>
  );
}

export default memo(JitsuEditor);
