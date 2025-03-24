"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useRouter_UNSTABLE as useRouter } from "waku";
import * as styled from "./styled";

import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Section from "@/components/section";
import SelectToggle from "@/components/select-toggle";
import TextboxLabel from "@/components/textbox-label";
import { cybernetics, items, jitsuSystems, knowledgeData, ninjaNameA, ninjaNameB, skills } from "@/constants";
import { css, cx } from "@/styled-system/css";
import type { NinjaData, Status } from "@/type";
import { computeStatus, createNewStatus, roll1D6 } from "@/utils";

type CreateForm = {
  plName: string;
  njName: string;
  njType: string;
  affiliation: string;
  background: string;
  goodKarma: boolean;
  karate: number;
  neuron: number;
  wazamae: number;
  jitsu: number;
  point: number;
  skill: string;
  jitsuSystem: string;
  item: string;
  cybernetic: string;
  knowledge: string;
};

function CreateForm() {
  const router = useRouter();
  const modeOptions = ["ランダム", "スクラッチビルド"];
  const [mode, setMode] = useState("ランダム");
  const [jitsuSystemRolled, setJitsuSystemRolled] = useState<number | null>(null);
  const {
    register,
    setValue,
    getValues,
    resetField,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<CreateForm>({
    mode: "onBlur",
    defaultValues: {
      plName: "",
      njName: "",
      njType: "ニンジャ",
      affiliation: "ソウカイヤ",
      background: "",
      goodKarma: false,
      karate: 0,
      neuron: 0,
      wazamae: 0,
      jitsu: 0,
      point: 11,
      jitsuSystem: "",
      item: "",
      cybernetic: "",
      knowledge: "",
      skill: "",
    },
  });
  const watchiJitsu = Number(watch("jitsu"));
  const watchCybernetic = watch("cybernetic");

  const handleNameGeneratorClick = () => {
    const A1 = roll1D6() - 1;
    const A2 = roll1D6() - 1;
    const partA = ninjaNameA[A1]?.[A2];
    const B1 = roll1D6() - 1;
    const B2 = roll1D6() - 1;
    const partB = ninjaNameB[B1]?.[B2];

    setValue("njName", `${partA}${partB}`, { shouldValidate: true });
  };

  const handleModeChange = (mode: string) => {
    setMode(mode);
    resetField("karate");
    resetField("neuron");
    resetField("wazamae");
    resetField("jitsu");
    resetField("jitsuSystem");
    resetField("skill");
    setJitsuSystemRolled(null);
  };

  const handleRandomClick = () => {
    const karate = roll1D6();
    const neuron = roll1D6();
    const wazamae = roll1D6();
    const jitsu = Math.max(0, roll1D6() - 3);

    setValue("karate", karate, { shouldValidate: true });
    setValue("neuron", neuron, { shouldValidate: true });
    setValue("wazamae", wazamae, { shouldValidate: true });
    setValue("jitsu", jitsu, { shouldValidate: true });
  };

  const handleAbilityD6Click = (stat: "karate" | "neuron" | "wazamae") => {
    const newValue = roll1D6();
    setValue(stat, newValue, { shouldValidate: true });
  };

  const handleD6Minus3Click = () => {
    setValue("jitsu", Math.max(0, roll1D6() - 3), { shouldValidate: true });
  };

  const handleAbilityChange = () => {
    const values = getValues(["karate", "neuron", "wazamae", "jitsu"]);
    values[3] = values[3] * 2;
    setValue(
      "point",
      values.reduce((accumulator, currentValue) => accumulator - currentValue, 11),
      { shouldValidate: true },
    );
  };

  const handleEquipD6Click = (stat: "skill" | "jitsuSystem" | "item" | "cybernetic") => {
    const diceResult = roll1D6() - 1;
    setValue(stat, TABLE[stat]?.[diceResult]!, { shouldValidate: true });
  };

  const handleJitsuSystemD6Click = () => {
    const diceResult = roll1D6() - 1;
    setJitsuSystemRolled(diceResult);
    setValue("jitsuSystem", TABLE.jitsuSystem[diceResult]!, { shouldValidate: true });
  };

  const handleCyberneticChange = () => {
    handleEquipD6Click("cybernetic");
    const diceResult = roll1D6() - 1;
    setValue("cybernetic", TABLE.cybernetic[diceResult]!);
    if (diceResult === 5) {
      resetField("item");
      resetField("skill");
    }
  };

  const handleKnowledgeD66Click = () => {
    const A1 = roll1D6() - 1;
    const A2 = roll1D6() - 1;

    setValue("knowledge", knowledgeData[A1]?.[A2]!);
  };

  const onSubmit: SubmitHandler<CreateForm> = formData => {
    const id = Date.now().toString();
    const status: Status = createNewStatus({
      id,
      plName: formData.plName,
      person: {
        njName: formData.njName,
        njType: formData.njType,
        affiliation: formData.affiliation,
        background: formData.background,
        goodKarma: formData.goodKarma,
      },
      base: {
        karate: Number(formData.karate),
        neuron: Number(formData.neuron),
        wazamae: Number(formData.wazamae),
        jitsu: Number(formData.jitsu),
      },
      skillSlot: !formData.skill || formData.jitsu > 0 ? [] : [{ ...skills[formData.skill]!, has: true }],
      armor: !formData.cybernetic ? [] : [cybernetics[formData.cybernetic]!],
      jitsuSlot: !formData.jitsuSystem || formData.jitsu === 0 ? [] : [{ name: `☆${formData.jitsuSystem} LV1` }],
    });
    formData.knowledge && status.skillSlot.push({ name: formData.knowledge, has: true });

    switch (formData.item) {
      case TABLE.item[0]!:
        status.armor.push(items[formData.item]);
        break;
      case TABLE.item[3]!:
      case TABLE.item[5]!:
        status.weapon.push(items[formData.item]);
        break;
      case TABLE.item[1]!:
      case TABLE.item[2]!:
      case TABLE.item[4]!:
        status.potion[items[formData.item] as "sushi" | "toroPowder" | "zbr"] = 1;
        break;
      default:
        break;
    }

    const computedData = computeStatus(status);

    // バイオサイバネがある場合は即応ダイスを減らす
    if (formData.cybernetic === Object.keys(cybernetics)[5]) {
      computedData.additionalDice -= 1;
    }

    const ninja: NinjaData = {
      status,
      computedData,
    };

    window?.localStorage.setItem(id, JSON.stringify(ninja));
    router.push(`/view?id=${id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h1>◆キャラクターメイキング◆</h1>
      <p className={css({ textIndent: 4 })}>
        <a
          href="https://diehardtales.com/n/n1bcbb1ace214"
          target="_blank"
          rel="noreferrer"
          className={css({ textDecorationLine: "underline" })}
        >
          コア・ルール
        </a>
        に則った、最も基本的なキャラクター作成
      </p>
      <p className={css({ mb: 3, textIndent: 4 })}>個人情報や機密情報は入力しないでください。</p>

      <Section>
        <h2>人物設定</h2>
        <div className={styled.content}>
          <TextboxLabel labelName="ニンジャネーム">
            <input type="text" {...register("njName", { required: true })} />
            <Button type="button" onClick={handleNameGeneratorClick}>
              生成
            </Button>
          </TextboxLabel>
          <TextboxLabel labelName="種別">
            <input type="text" {...register("njType", { required: true })} />
          </TextboxLabel>
          <TextboxLabel labelName="所属">
            <input type="text" {...register("affiliation", { required: true })} />
          </TextboxLabel>
          <TextboxLabel labelName="プレイヤーネーム">
            <input type="text" {...register("plName", { required: true })} />
          </TextboxLabel>
          <TextboxLabel labelName="カルマ：善">
            <Checkbox {...register("goodKarma")} />
          </TextboxLabel>
        </div>
        <TextboxLabel labelName="生い立ちなど">
          <textarea {...register("background")} className={styled.textareaWrapper} />
        </TextboxLabel>
      </Section>

      <Section>
        <div
          className={cx(
            css({
              justifyContent: "space-between",
            }),
            styled.content,
          )}
        >
          <h2>能力値</h2>
          <SelectToggle options={modeOptions} onChange={handleModeChange} />
        </div>

        {mode === "ランダム" ? (
          <>
            <div className={styled.content}>
              <Button type="button" onClick={handleRandomClick}>
                全部ランダム
              </Button>
            </div>
            <div className={styled.statusContent}>
              <TextboxLabel labelName="カラテ">
                <input
                  type="number"
                  readOnly
                  {...register("karate", {
                    required: true,
                    min: 1,
                    max: 6,
                    valueAsNumber: true,
                  })}
                />
                <Button type="button" onClick={() => handleAbilityD6Click("karate")}>
                  1D6
                </Button>
              </TextboxLabel>
              <TextboxLabel labelName="ニューロン">
                <input
                  type="number"
                  readOnly
                  {...register("neuron", {
                    required: true,
                    min: 1,
                    max: 6,
                    valueAsNumber: true,
                  })}
                />
                <Button type="button" onClick={() => handleAbilityD6Click("neuron")}>
                  1D6
                </Button>
              </TextboxLabel>
              <TextboxLabel labelName="ワザマエ">
                <input
                  type="number"
                  readOnly
                  {...register("wazamae", {
                    required: true,
                    min: 1,
                    max: 6,
                    valueAsNumber: true,
                  })}
                />
                <Button type="button" onClick={() => handleAbilityD6Click("wazamae")}>
                  1D6
                </Button>
              </TextboxLabel>
              <TextboxLabel labelName="ジツ">
                <input
                  type="number"
                  readOnly
                  {...register("jitsu", {
                    required: true,
                    min: 0,
                    max: 3,
                    valueAsNumber: true,
                  })}
                />
                <Button type="button" onClick={handleD6Minus3Click}>
                  1D6-3
                </Button>
              </TextboxLabel>
            </div>
          </>
        ) : (
          <>
            <h3 className={css({ mb: 2, lineHeight: "var(--spacing-8)" })}>
              残りポイント：
              <span className={styled.remainingPoints({ minus: getValues("point") < 0 })}>
                <input
                  type="number"
                  readOnly
                  {...register("point", { min: 0, max: 11, valueAsNumber: true })}
                  min="0"
                  max="11"
                />
              </span>
            </h3>
            <div className={styled.statusContent}>
              <TextboxLabel labelName="カラテ">
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("karate", {
                    required: true,
                    min: 1,
                    max: 5,
                    onChange: handleAbilityChange,
                    valueAsNumber: true,
                  })}
                />
              </TextboxLabel>
              <TextboxLabel labelName="ニューロン">
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("neuron", {
                    required: true,
                    min: 1,
                    max: 5,
                    onChange: handleAbilityChange,
                    valueAsNumber: true,
                  })}
                />
              </TextboxLabel>
              <TextboxLabel labelName="ワザマエ">
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("wazamae", {
                    required: true,
                    min: 1,
                    max: 5,
                    onChange: handleAbilityChange,
                    valueAsNumber: true,
                  })}
                />
              </TextboxLabel>
              <TextboxLabel labelName="ジツ">
                <input
                  type="number"
                  min="0"
                  max="3"
                  {...register("jitsu", {
                    required: true,
                    min: 0,
                    max: 3,
                    onChange: handleAbilityChange,
                    valueAsNumber: true,
                  })}
                />
              </TextboxLabel>
            </div>
          </>
        )}
      </Section>

      <Section>
        <h2>初期装備</h2>
        <div className={styled.content}>
          {watchiJitsu === 0 ? (
            <TextboxLabel labelName="初期スキル">
              <select
                {...register("skill", {
                  disabled: (() => {
                    return watchCybernetic === TABLE.cybernetic[5];
                  })(),
                  required: true,
                })}
              >
                <option value="" disabled>
                  {""}
                </option>
                {TABLE.skill.map((skill, i) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={() => handleEquipD6Click("skill")}
                disabled={watchCybernetic === TABLE.cybernetic[5]}
              >
                1D6
              </Button>
            </TextboxLabel>
          ) : (
            <TextboxLabel labelName="ジツ系統">
              {jitsuSystemRolled && jitsuSystemRolled === 5 ? (
                <select {...register("jitsuSystem", { required: true })}>
                  {TABLE.jitsuSystem.map(jitsuSystem => (
                    <option key={jitsuSystem} value={jitsuSystem}>
                      {jitsuSystem}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" readOnly {...register("jitsuSystem", { required: true })} />
              )}
              <Button type="button" onClick={handleJitsuSystemD6Click}>
                1D6
              </Button>
            </TextboxLabel>
          )}
          <TextboxLabel labelName="初期アイテム">
            <input
              type="text"
              readOnly
              {...register("item", {
                disabled: (() => {
                  return watchCybernetic === TABLE.cybernetic[5];
                })(),
              })}
            />
            <Button
              type="button"
              onClick={() => handleEquipD6Click("item")}
              disabled={watchCybernetic === TABLE.cybernetic[5]}
            >
              1D6
            </Button>
            <Button type="button" onClick={() => resetField("item")}>
              <MdClose size={24} />
            </Button>
          </TextboxLabel>
          <TextboxLabel labelName="初期サイバネ">
            <input type="text" readOnly className={styled.wideTextbox} {...register("cybernetic")} />
            <Button type="button" onClick={handleCyberneticChange}>
              1D6
            </Button>
            <Button type="button" onClick={() => resetField("cybernetic")}>
              <MdClose size={24} />
            </Button>
          </TextboxLabel>
          <TextboxLabel labelName="初期知識">
            <input readOnly type="text" className={styled.wideTextbox} {...register("knowledge")} />
            <Button type="button" onClick={handleKnowledgeD66Click}>
              生成
            </Button>
            <Button type="button" onClick={e => resetField("knowledge")}>
              <MdClose size={24} />
            </Button>
          </TextboxLabel>
        </div>
      </Section>

      <div className={styled.noFormSection}>
        <h2>できた？</h2>
        <p>オツカレサマドスエ！</p>
        <p>ボタンを押したらキミだけのニンジャの出来上がりだ！</p>
        <Button type="submit" buttonType="primary" disabled={!isValid}>
          新規作成な
        </Button>
      </div>
    </form>
  );
}

export default CreateForm;

const TABLE = {
  skill: Object.keys(skills),
  jitsuSystem: jitsuSystems,
  item: Object.keys(items),
  cybernetic: Object.keys(cybernetics),
} as const;
