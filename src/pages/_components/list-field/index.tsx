"use client";

import { type MouseEvent, type ReactEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever, MdEditDocument, MdRemoveRedEye } from "react-icons/md";
import * as styled from "./styled";

import Button from "@/components/button";
import IconButton from "@/components/icon-button";
import IconButtonLink from "@/components/icon-button-link";
import NancyChat from "@/components/nancy-chat";
import { fileSchema, idSchema, ninjaDataSchema } from "@/schema";
import type { FormData, NinjaData } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";

function ListField() {
  const [ninjas, setNinjas] = useState<NinjaData[]>([]);
  const [deleteId, setDeleteId] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    resolver: zodResolver(fileSchema),
  });

  useEffect(() => {
    const ninjaAry = [];
    for (const key of Object.keys(localStorage).filter(key => idSchema.safeParse(key).success).sort((a, b) => Number(b) - Number(a))) {
      const data = window.localStorage.getItem(key)!;
      let ninja: NinjaData;
      try {
        ninja = JSON.parse(data);
        ninjaAry.push(ninja);
      } catch (e) {
        return;
      }
    }
    setNinjas(ninjaAry);
  }, []);

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsedData: NinjaData = ninjaDataSchema.parse(JSON.parse(e.target?.result as string) ?? "");
        clearErrors("file");
        const name = Date.now().toString();
        parsedData.status.id = name;
        window?.localStorage.setItem(name, JSON.stringify(parsedData));
        setNinjas([parsedData, ...ninjas]);
        resetField("file");
        window?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        setError("file", { type: "manual", message: "JSONのフォーマットが正しくありません。" });
      }
    };
    reader.readAsText(file);
  };

  const date = (dateStr: string) => new Date(Number(dateStr)).toLocaleString("ja");

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>, key: string) => {
    event.stopPropagation();
    window?.localStorage.removeItem(key);
    setNinjas(ninjas.filter(ninja => ninja.status.id !== key));
    setDeleteId("");
  };

  const cancel: ReactEventHandler<HTMLDivElement> = ev => ev.stopPropagation();

  return (
    <>
      <ul className={styled.listWrapper}>
        {ninjas.map((ninja, i) => (
          <li key={`${i}-${ninja.status.id}`} className={styled.listItem}>
            <div className={styled.info}>
              <div>
                <h2>◆{ninja.status.person.njName}</h2>
                {ninja.status.plName}／{ninja.status.person.affiliation}／{ninja.status.person.njType}
                <span className={styled.status}>
                  カラテ：{ninja.status.base.karate}
                  ／ニューロン：{ninja.status.base.neuron}
                  ／ワザマエ：{ninja.status.base.wazamae}
                  ／ジツ：{ninja.status.base.jitsu}
                </span>
              </div>
              <div>作成：{date(ninja.status.id!)}</div>
            </div>
            <div className={styled.buttonArea}>
              <IconButtonLink to={`/edit?id=${ninja.status.id}`}>
                <MdEditDocument size={20} />
                <div>編集</div>
              </IconButtonLink>
              <IconButtonLink to={`/view?id=${ninja.status.id}`}>
                <MdRemoveRedEye size={20} />
                <div>閲覧</div>
              </IconButtonLink>
              <IconButton type="button" onClick={() => setDeleteId(ninja.status.id ?? "")}>
                <MdDeleteForever size={20} />
                <div>削除</div>
              </IconButton>
            </div>
          </li>
        ))}
        <li className={styled.listItem}>
          <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
            <div>
              <label>
                <h2>ニンジャデータをインポートする</h2>
                <input type="file" accept="application/json" {...register("file")} className={styled.uploadButton} />
              </label>
              {errors.file && <p style={{ color: "red" }}>{errors.file.message}</p>}
            </div>
            <div>
              <Button buttonType="primary" type="submit">
                アップロード
              </Button>
            </div>
          </form>
        </li>
      </ul>
      {deleteId && (
        <section className={styled.modalWrapper} onClick={() => setDeleteId("")} onKeyUp={() => setDeleteId("")}>
          <NancyChat classNames={[styled.modal]} onClick={cancel}>
            <p>＠YCNAN：後悔しないわね？</p>
            {"＞"}
            <button type="button" onClick={ev => handleDeleteClick(ev, deleteId)} className={styled.realDeleteButton}>
              Yes
            </button>
            {" / "}
            <button type="button" onClick={() => setDeleteId("")} className={styled.realDeleteButton}>
              やめる
            </button>
            <span className="caret">┃</span>
          </NancyChat>
        </section>
      )}
    </>
  );
}

export default ListField;
