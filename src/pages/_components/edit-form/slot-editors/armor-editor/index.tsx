"use client";

import { memo, useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";

import Button from "@/components/button";
import CommonTable from "@/components/common-table";
import Selectbox from "@/components/correction-selectbox";
import IconButton from "@/components/icon-button";
import CorrectionEditor from "@/pages/_components/edit-form/slot-editors/correction-editor";
import { armorPartSchema, armorTypeSchema } from "@/schema";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import type { CommonSlotProps } from "@/type";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function ArmorEditor({ register, control }: CommonSlotProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "armor",
  });

  const armors = useWatch({ control, name: "armor" });
  const combatCyberneticLvSum = armors
    .filter(item => item.type.includes("サイバネ"))
    .reduce((acc, cur) => acc + (cur.name.match(/▶︎|▷/g) || []).length, 0);
  const bioCyberneticLvSum = armors
    .filter(item => item.type.includes("サイバネ"))
    .reduce((acc, cur) => acc + (cur.name.match(/▲|△/g) || []).length, 0);
  const cyberneticLvSum = combatCyberneticLvSum + bioCyberneticLvSum;

  const penalty = useMemo(() => {
    if (cyberneticLvSum >= 18) return "プレイヤーニンジャのサイバネ限界点";
    if (cyberneticLvSum >= 15) return "「☆」使用不能。";
    if (cyberneticLvSum >= 12) return "「◉◉戦闘兵器化」または「◉危険生物化」が可能。\n「★」使用不能。";
    if (cyberneticLvSum >= 9)
      return "「◉◉グレーター級ソウルの力」使用不能（「★★」使用不能）。\n「☆◉」のシンボルを持つ「ジツ系スキル』使用不能。";
    if (cyberneticLvSum >= 6)
      return "強制的な「◉重サイバネ化」または「◉バイオニンジャ化」の開始。\n種別「効果継続」を持つ「変身系」「エンハンス系」能力の発動精神力コストが+1（常時強化系は例外）。";
    if (cyberneticLvSum >= 4)
      return "「◉◉アーチ級ソウルの力」使用不能（「★★★」使用不能）。\n「★◉」〜「★★★◉」のシンボルを持つジツ系スキル使用不能。";
    if (cyberneticLvSum >= 1) return "「◉◉戦闘系ソウルの力」使用不能。「◉◉アーチ級ソウルの力」一部使用不能。";
    return "なし";
  }, [cyberneticLvSum]);

  const powPenalty = useMemo(() => {
    if (cyberneticLvSum >= 18) return "-8";
    if (cyberneticLvSum >= 16) return "-7";
    if (cyberneticLvSum >= 14) return "-6";
    if (cyberneticLvSum >= 12) return "-5";
    if (cyberneticLvSum >= 10) return "-4";
    if (cyberneticLvSum >= 8) return "-3";
    if (cyberneticLvSum >= 6) return "-2";
    if (cyberneticLvSum >= 4) return "-1";
    return "±0";
  }, [cyberneticLvSum]);

  return (
    <>
      <ul
        className={flex({
          my: 2,
          flexWrap: "wrap",
        })}
      >
        <li className={css({ mr: 3 })}>戦闘用サイバネ埋込数：{combatCyberneticLvSum}</li>
        <li className={css({ mr: 3 })}>戦闘用バイオサイバネ埋込数：{bioCyberneticLvSum}</li>
        <li className={css({ mr: 3 })}>
          サイバネ合計埋込数：
          <span className={cyberneticLvSum > 18 ? css({ color: "foreground.accent", fontWeight: "bold" }) : ""}>
            {cyberneticLvSum}
            {cyberneticLvSum > 18 && "（警告：サイバネ埋込数の上限を超えています）"}
          </span>
        </li>
        <li>精神力：{powPenalty}</li>
      </ul>
      <div
        className={css({
          mb: 2,
          textIndent: "-6rem",
          pl: "6rem",
        })}
      >
        ペナルティ：
        <span
          className={css({
            color: "foreground.mute-accent",
            whiteSpace: "break-spaces",
          })}
        >
          {penalty}
        </span>
      </div>
      <CommonTable classNames={[css({ mb: 3 })]}>
        <thead>
          <tr>
            <th className="left">部位</th>
            <th className="left">名称</th>
            <th className="left">種別</th>
            <th className="left">補正値</th>
            <th className={`left ${css({ w: "full" })}`}>効果</th>
            <th>移動</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((armor, index) => (
            <tr key={armor.id}>
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
        classNames={[css({ mb: 2 })]}
        onClick={() =>
          append({
            name: "",
            isWearing: true,
            correction: [],
            effect: "",
            part: "頭部",
            type: "防具",
          })
        }
      >
        <MdAdd size={20} />
        <div>追加</div>
      </IconButton>
      <span className={css({ fontSize: "sm" })}>
        ※特に入力制限はしませんが、同一部位に対して防具とサイバネを同時にセットすることは通常できません。
      </span>
    </>
  );
}

export default memo(ArmorEditor);
