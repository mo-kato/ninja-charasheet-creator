"use client";

import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useRouter_UNSTABLE as useRouter } from "waku";
import * as styled from "./styled";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Section from "@/components/section";
import TextboxLabel from "@/components/textbox-label";
import { LABEL_NAMES } from "@/constants";
import useParams from "@/hooks/use-params";
import ArmorEditor from "@/pages/_components/edit-form/slot-editors/armor-editor";
import JitsuEditor from "@/pages/_components/edit-form/slot-editors/jitsu-editor";
import LikeabilityEditor from "@/pages/_components/edit-form/slot-editors/likeability-editor";
import SkillEditor from "@/pages/_components/edit-form/slot-editors/skill-editor";
import WeaponEditor from "@/pages/_components/edit-form/slot-editors/weapon-editor";
import { idSchema, statusSchema } from "@/schema";
import { css } from "@/styled-system/css";
import type { NinjaData, Status } from "@/type";
import { computeStatus, createNewStatus } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

function EditForm() {
  const router = useRouter();
  const params = useParams();
  const { control, register, handleSubmit, reset, getValues } = useForm<Status>({
    defaultValues: createNewStatus({}),
    resolver: zodResolver(statusSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const result = idSchema.safeParse(params.get("id"));
    const idStr = result.success ? result.data : "";
    if (!idStr) return;
    const dataStr = window.localStorage.getItem(idStr ?? "") ?? "";
    let data: NinjaData;
    try {
      data = JSON.parse(dataStr);
      reset(data.status);
    } catch (e) {
      return;
    }
  }, [params, reset]);

  const existNinja = () => {
    return getValues("id");
  };

  const onSubmit: SubmitHandler<Status> = status => {
    const ninja: NinjaData = {
      status,
      computedData: computeStatus(status),
    };

    window?.localStorage.setItem(status.id!, JSON.stringify(ninja));
    router.push(`/view?id=${status.id}`);
  };

  return (
    <>
      {!existNinja() && (
        <>
          <br />
          <h2>お探しのニンジャはいないようです</h2>
          <Link to="/create">新規作成な →</Link>
        </>
      )}
      {existNinja() && (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h1 className={css({ mb: 2 })}>◆キャラクターエディッティング◆</h1>
          <Section>
            <h2>人物設定</h2>
            <div className={styled.content}>
              <TextboxLabel labelName="ニンジャネーム">
                <input type="text" {...register("person.njName", { required: true })} />
              </TextboxLabel>
              <TextboxLabel labelName="種別">
                <input type="text" {...register("person.njType", { required: true })} />
              </TextboxLabel>
              <TextboxLabel labelName="所属">
                <input type="text" {...register("person.affiliation", { required: true })} />
              </TextboxLabel>
              <TextboxLabel labelName="プレイヤーネーム">
                <input type="text" {...register("plName", { required: true })} />
              </TextboxLabel>
              <TextboxLabel labelName="カルマ：善">
                <Checkbox {...register("person.goodKarma")} />
              </TextboxLabel>
            </div>
            <div>
              <TextboxLabel labelName="生い立ちなど">
                <textarea className={styled.textareaWrapper} {...register("person.background")} />
              </TextboxLabel>
            </div>
          </Section>

          <Section>
            <h2>能力値</h2>
            <div className={styled.content}>
              <span>
                <TextboxLabel labelName="カラテ">
                  <input type="number" {...register("base.karate")} />
                </TextboxLabel>
                <TextboxLabel labelName="メモ">
                  <input type="text" {...register("memo.karate")} />
                </TextboxLabel>
              </span>
              <span>
                <TextboxLabel labelName="ニューロン">
                  <input type="number" {...register("base.neuron")} />
                </TextboxLabel>
                <TextboxLabel labelName="メモ">
                  <input type="text" {...register("memo.neuron")} />
                </TextboxLabel>
              </span>
              <span>
                <TextboxLabel labelName="ワザマエ">
                  <input type="number" {...register("base.wazamae")} />
                </TextboxLabel>
                <TextboxLabel labelName="メモ">
                  <input type="text" {...register("memo.wazamae")} />
                </TextboxLabel>
              </span>
              <span>
                <TextboxLabel labelName="ジツ">
                  <input type="number" {...register("base.jitsu")} />
                </TextboxLabel>
                <TextboxLabel labelName="メモ">
                  <input type="text" {...register("memo.jitsu")} />
                </TextboxLabel>
              </span>
            </div>
          </Section>

          <Section>
            <h2>防具スロット</h2>
            <ArmorEditor {...{ register, control }} />
          </Section>

          <Section>
            <h2>武器スロット</h2>
            <WeaponEditor {...{ register, control }} />
          </Section>

          <Section>
            <h2>スキルスロット</h2>
            <SkillEditor {...{ register, control }} />
          </Section>

          <Section>
            <h2>ジツスロット</h2>
            <JitsuEditor {...{ register, control }} />
          </Section>

          <Section>
            <h2>回復アイテム</h2>
            <div className={styled.content}>
              {(["sushi", "toroSushi", "toroPowder", "cyberPainKiller", "cyberZazen", "zbr"] as const).map(key => (
                <span key={key}>
                  <TextboxLabel labelName={LABEL_NAMES[key] ?? ""}>
                    <input type="number" {...register(`potion.${key}`)} min="0" />
                  </TextboxLabel>
                </span>
              ))}
            </div>
          </Section>

          <Section>
            <h2>累積値</h2>
            <div className={styled.content}>
              {(["dkk", "fame", "money", "loan"] as const).map(key => (
                <span key={key}>
                  <TextboxLabel labelName={LABEL_NAMES[key] ?? ""}>
                    <input type="number" {...register(`wealth.${key}`)} min="0" />
                  </TextboxLabel>
                </span>
              ))}
            </div>
          </Section>

          <Section>
            <h2>親密度</h2>
            <LikeabilityEditor {...{ register, control }} />
          </Section>

          <Section>
            <h2>備考欄</h2>
            <TextboxLabel labelName="ココフォリアのメモ欄に反映されます">
              <textarea className={styled.textareaWrapper} {...register("free")} />
            </TextboxLabel>
          </Section>
          <Button type="submit" buttonType="primary" classNames={[css({ display: "block", ml: "auto", mr: 4, mt: 8 })]}>
            Take this !!
          </Button>
        </form>
      )}
    </>
  );
}

export default EditForm;
