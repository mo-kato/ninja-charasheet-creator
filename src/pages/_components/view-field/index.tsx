"use client";

import { type ReactEventHandler, useCallback } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "waku";
import * as styled from "./styled";

import Button from "@/components/button";
import CommonTable from "@/components/common-table";
import IconButton from "@/components/icon-button";
import NancyChat from "@/components/nancy-chat";
import Section from "@/components/section";
import { LABEL_NAMES } from "@/constants";
import useNinja from "@/hooks/use-ninja";
import { css } from "@/styled-system/css";

function ViewField() {
  const { ninja, id } = useNinja();

  const showDifficulty = useCallback((difficulty: number): string => {
    if (difficulty <= 1) {
      return "K";
    }
    if (difficulty >= 5) {
      return "UH";
    }
    switch (difficulty) {
      case 2:
        return "E";
      case 3:
        return "N";
      case 4:
        return "H";
      default:
        return "";
    }
  }, []);

  const handleExportClick: ReactEventHandler<HTMLButtonElement> = () => {
    if (!ninja) return;
    const ccfoliaContent = {
      kind: "character",
      data: {
        name: ninja.status.person.njName,
        initiative: ninja.computedData.initiative,
        memo: `◆${ninja.status.person.njName}（種別：${ninja.status.person.njType}）
カラテ　　　　${ninja.status.base.karate}　　体力　　　${ninja.computedData.con}
ニューロン　　${ninja.status.base.neuron}　　精神力　　${ninja.computedData.pow}
ワザマエ　　　${ninja.status.base.wazamae}　　脚力　　　${ninja.computedData.mov}/${showDifficulty(ninja.computedData.highMobilityDiceDifficulty)}
ジツ　　　　　${ninja.status.base.jitsu}　　万札　　　${ninja.status.wealth.money}
攻撃/射撃/機先/電脳　　${ninja.computedData.additionalDice}/${ninja.computedData.shootingDice}/${ninja.computedData.initiative}/${ninja.computedData.hackingDice}
回避/精密/側転/発動　　${ninja.computedData.dodge}/${ninja.computedData.precisionDice}/${ninja.computedData.highMobilityDice}/${ninja.computedData.jitsuExecutionDice}
◇メモ
${ninja.status.free}
`,
        status: [
          {
            label: "体力",
            value: ninja.computedData.con,
            max: ninja.computedData.con,
          },
          {
            label: "精神力",
            value: ninja.computedData.pow,
            max: ninja.computedData.pow,
          },
          {
            label: "回避",
            value: ninja.computedData.dodge,
            max: ninja.computedData.dodge,
          },
          {
            label: "即応",
            value: ninja.computedData.additionalDice,
            max: ninja.computedData.additionalDice,
          },
          {
            label: "緊急",
            value: ninja.computedData.additionalDodgeDice,
          },
          {
            label: "DKK",
            value: ninja.status.wealth.dkk,
            max: 12,
          },
        ],
        params: [
          {
            label: `脚力(側転:${showDifficulty(ninja.computedData.highMobilityDiceDifficulty)})`,
            value: String(ninja.computedData.mov),
          },
          {
            label: "近接攻撃",
            value: String(ninja.computedData.attackDice),
          },
          {
            label: "射撃",
            value: String(ninja.computedData.shootingDice),
          },
          {
            label: "電脳",
            value: String(ninja.computedData.hackingDice),
          },
          {
            label: "精密",
            value: String(ninja.computedData.precisionDice),
          },
          {
            label: "連続側転",
            value: String(ninja.computedData.highMobilityDice),
          },
          {
            label: "ジツ発動",
            value: String(ninja.computedData.jitsuExecutionDice),
          },
          {
            label: "カラテ",
            value: String(ninja.computedData.karateDice),
          },
          {
            label: "ニューロン",
            value: String(ninja.computedData.neuronDice),
          },
          {
            label: "ワザマエ",
            value: String(ninja.computedData.wazamaeDice),
          },
          {
            label: "ジツ",
            value: String(ninja.status.base.jitsu),
          },
        ],
        commands: `${showDifficulty(ninja.computedData.dodgeDifficulty)}{回避} ◆回避判定
${showDifficulty(ninja.computedData.highMobilityDiceDifficulty)}{連続側転} ◆連続側転判定
${showDifficulty(ninja.computedData.karateDiceDifficulty)}{近接攻撃}[S] ◆近接攻撃判定
${showDifficulty(ninja.computedData.shootingDiceDifficulty)}{射撃} ◆射撃判定
${showDifficulty(ninja.computedData.jitsuExecutionDiceDifficulty)}{ジツ発動} ◆ジツ発動判定
${showDifficulty(ninja.computedData.hackingDiceDifficulty)}{電脳} ◆ハッキング判定
${showDifficulty(ninja.computedData.precisionDiceDifficulty)}{精密} ◆精密判定
${showDifficulty(ninja.computedData.negotiationDiceDifficulty)}${ninja.computedData.negotiationDice} ◆交渉判定判定
${showDifficulty(ninja.computedData.knowledgeDiceDifficulty)}${ninja.computedData.knowledgeDice} ◆知識判定判定
${showDifficulty(ninja.computedData.researchDiceDifficulty)}${ninja.computedData.researchDice} ◆調査判定判定
${showDifficulty(ninja.computedData.karateDiceDifficulty)}{カラテ} ◆カラテ判定判定
${showDifficulty(ninja.computedData.neuronDiceDifficulty)}{ニューロン} ◆ニューロン判定判定
${showDifficulty(ninja.computedData.wazamaeDiceDifficulty)}{ワザマエ} ◆ワザマエ判定判定
`,
      },
    };
    navigator.clipboard.writeText(JSON.stringify(ccfoliaContent));
  };

  const handleDlClick = () => {
    const fileName = `ninja-${id}.json`;
    const data = new Blob([JSON.stringify(ninja)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {!ninja && (
        <>
          <br />
          <h2>お探しのニンジャはいないようです</h2>
          <Link to="/create">新規作成な →</Link>
        </>
      )}
      {ninja && (
        <>
          <NancyChat classNames={[styled.nancy]}>
            <p>＠YCNAN：このニンジャのデータを書き換えたい？</p>＞ <Link to={`/edit?id=${id}`}>Yes</Link>
            <span className="caret">┃</span>
          </NancyChat>
          <Section classNames={[styled.section, styled.header]}>
            <div>
              <h1>
                {"◆ "}
                {ninja.status.person.njName}
              </h1>
              <div>プレイヤーネーム：{ninja.status.plName}</div>
              <div>
                種別：{ninja.status.person.njType}
                {"／"}
                所属：{ninja.status.person.affiliation}
                {ninja.status.person.goodKarma && "／カルマ：善"}
              </div>
              <p className={styled.preWrap}>{ninja.status.person.background}</p>
            </div>
            <div className={styled.buttonArea}>
              <Button
                type="button"
                buttonType="primary"
                onClick={handleExportClick}
                classNames={[styled.primaryButton]}
              >
                ココフォリア駒出力
              </Button>
              <IconButton type="button" onClick={handleDlClick}>
                <MdOutlineFileDownload size={24} />
                <div>JSONエクスポート</div>
              </IconButton>
            </div>
          </Section>
          <Section classNames={[styled.section]}>
            <div>
              <CommonTable>
                <caption className={styled.surikenText}>基礎能力値</caption>
                <thead>
                  <tr>
                    <th scope="col" className="left">
                      基礎能力
                    </th>
                    <th scope="col">合計</th>
                    <th scope="col">メモ</th>
                  </tr>
                </thead>
                <tbody>
                  {(["karate", "neuron", "wazamae", "jitsu"] as const).map(key => (
                    <tr key={key}>
                      <th className="left">{LABEL_NAMES[key]}</th>
                      <td>{ninja.computedData[key]}</td>
                      <td>{ninja.status.memo[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </CommonTable>
              <CommonTable>
                <caption className={styled.surikenText}>副次能力値</caption>
                <thead>
                  <tr>
                    <th scope="col" className="left">
                      副次能力
                    </th>
                    <th scope="col">合計</th>
                  </tr>
                </thead>
                <tbody>
                  {(["initiative", "con", "pow", "mov", "dodge", "additionalDodgeDice", "additionalDice"] as const).map(
                    key => (
                      <tr key={key}>
                        <th className="left">{LABEL_NAMES[key]}</th>
                        <td>{ninja.computedData[key]}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </CommonTable>
            </div>
            <div>
              <CommonTable>
                <caption className={styled.surikenText}>判定早見表</caption>
                <thead>
                  <tr>
                    <th scope="col" className="left">
                      判定
                    </th>
                    <th scope="col">難易度</th>
                    <th scope="col">ダイス合計</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      "karateDice",
                      "neuronDice",
                      "wazamaeDice",
                      "attackDice",
                      "shootingDice",
                      "hackingDice",
                      "precisionDice",
                      "highMobilityDice",
                      "jitsuExecutionDice",
                      "negotiationDice",
                      "knowledgeDice",
                      "researchDice",
                    ] as const
                  ).map(key => (
                    <tr key={key}>
                      <th className="left">{LABEL_NAMES[key]}</th>
                      <td>{showDifficulty(ninja.computedData[`${key}Difficulty`])}</td>
                      <td>{ninja.computedData[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </CommonTable>
            </div>
            <div>
              <CommonTable>
                <caption className={styled.surikenText}>回復アイテム</caption>
                <thead>
                  <tr>
                    <th scope="col" className="left">
                      名称
                    </th>
                    <th scope="col">数量</th>
                  </tr>
                </thead>
                <tbody>
                  {(["sushi", "toroSushi", "toroPowder", "cyberPainKiller", "cyberZazen", "zbr"] as const).map(key => (
                    <tr key={key}>
                      <th className="left">{LABEL_NAMES[key]}</th>
                      <td>{ninja.status.potion[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </CommonTable>
              <CommonTable>
                <caption className={styled.surikenText}>累積値</caption>
                <thead>
                  <tr>
                    <th scope="col" className="left">
                      名称
                    </th>
                    <th scope="col">値</th>
                  </tr>
                </thead>
                <tbody>
                  {(["dkk", "fame", "money", "loan"] as const).map(key => (
                    <tr key={key}>
                      <th className="left">{LABEL_NAMES[key]}</th>
                      <td>{ninja.status.wealth[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </CommonTable>
            </div>
            <div>
              {ninja.status.wealth.likeability.length > 0 && (
                <CommonTable>
                  <caption className={styled.surikenText}>親密度</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="left">
                        人名
                      </th>
                      <th scope="col">値</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ninja.status.wealth.likeability.map(likeability => (
                      <tr key={likeability.name}>
                        <th className="left">親密度：{likeability.name}</th>
                        <td>{likeability.likeability}</td>
                      </tr>
                    ))}
                  </tbody>
                </CommonTable>
              )}
              {ninja.status.jitsuSlot.length > 0 && (
                <CommonTable>
                  <caption className={styled.surikenText}>ジツ</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="left">
                        ジツ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ninja.status.jitsuSlot.map(jitsu => (
                      <tr key={jitsu.name}>
                        <td>{jitsu.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </CommonTable>
              )}
            </div>
          </Section>

          <Section classNames={[styled.section]}>
            <div className={css({ w: "full" })}>
              {ninja.status.armor.length > 0 && (
                <CommonTable>
                  <caption className={styled.surikenText}>防具</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={`left ${css({ w: "7%" })}`}>
                        部位
                      </th>
                      <th scope="col" className={`left ${css({ w: "13%" })}`}>
                        名称
                      </th>
                      <th scope="col" className={`left ${css({ w: "10%" })}`}>
                        種別
                      </th>
                      <th scope="col" className={`left ${css({ w: "13%" })}`}>
                        判定補正値
                      </th>
                      <th scope="col" className={`left ${css({ w: "100%" })}`}>
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ninja.status.armor.map(armor => (
                      <tr key={armor.name}>
                        <td className="left">{armor.part}</td>
                        <td className="left">{armor.name}</td>
                        <td className="left">{armor.type}</td>
                        <td className="left">
                          {armor.correction?.map(correction => (
                            <span
                              key={`armor-${armor}-${correction.key}`}
                            >{`${LABEL_NAMES[correction.key]} ${correction.size > 0 ? "+" : ""}${correction.size} `}</span>
                          ))}
                        </td>
                        <td>
                          <div className={styled.effect}>{armor.effect}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </CommonTable>
              )}
              {ninja.status.weapon.length > 0 && (
                <CommonTable>
                  <caption className={styled.surikenText}>武器</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={css({ w: "1%" })}>
                        装備
                      </th>
                      <th scope="col" className={`left ${css({ w: "13%" })}`}>
                        名称
                      </th>
                      <th scope="col">スロット</th>
                      <th scope="col" className={`left ${css({ w: "10%" })}`}>
                        補正値:所持
                      </th>
                      <th scope="col" className={`left ${css({ w: "13%" })}`}>
                        補正値:装備
                      </th>
                      <th scope="col" className={`left ${css({ w: "100%" })}`}>
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ninja.status.weapon.map(weapon => (
                      <tr key={weapon.name}>
                        <td className={css({ w: "1%" })}>
                          {weapon.isWearing ? (
                            <img src="/images/select_check_box.svg" alt="装備中" />
                          ) : (
                            <img src="/images/check_box_outline_blank.svg" alt="所持" />
                          )}
                        </td>
                        <td className="left">{weapon.name}</td>
                        <td>{weapon.slot}</td>
                        <td>
                          {weapon.passiveCorrection?.map(correction => (
                            <span
                              key={`weapon-${weapon.name}-${correction.key}-key`}
                            >{`${LABEL_NAMES[correction.key]} ${correction.size > 0 ? "+" : ""}${correction.size} `}</span>
                          ))}
                        </td>
                        <td>
                          {weapon.equippedCorrection?.map(correction => (
                            <span
                              key={`weapon-${weapon.name}-${correction.key}-key`}
                            >{`${LABEL_NAMES[correction.key]} ${correction.size > 0 ? "+" : ""}${correction.size} `}</span>
                          ))}
                        </td>
                        <td className={`left ${css({ w: "100%" })}`}>
                          <div className={styled.effect}>{weapon.effect}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </CommonTable>
              )}

              {ninja.status.skillSlot.length > 0 && (
                <CommonTable>
                  <caption className={styled.surikenText}>スキル</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={css({ w: "1%" })}>
                        所持
                      </th>
                      <th scope="col" className={`left ${css({ w: "15%" })}`}>
                        名称
                      </th>
                      <th scope="col" className={`left ${css({ w: "13%" })}`}>
                        判定補正値
                      </th>
                      <th scope="col" className="left">
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ninja.status.skillSlot.map(skill => (
                      <tr key={skill.name}>
                        <td>
                          {skill.has ? (
                            <img src="/images/select_check_box.svg" alt="所持" />
                          ) : (
                            <img src="/images/check_box_outline_blank.svg" alt="記憶" />
                          )}
                        </td>
                        <td className="left">{skill.name}</td>
                        <td className="left">
                          {skill.correction?.map(correction => (
                            <span
                              key={`weapon-${skill.name}-${correction.key}-key`}
                            >{`${LABEL_NAMES[correction.key]} ${correction.size > 0 ? "+" : ""}${correction.size} `}</span>
                          ))}
                        </td>
                        <td>
                          <div className={styled.effect}>{skill.effect}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </CommonTable>
              )}

              <p className={styled.surikenText}>備考欄：ココフォリアのメモ欄に反映されます</p>
              <p className={styled.freeMemo}>{ninja.status.free}</p>
            </div>
          </Section>
        </>
      )}
    </>
  );
}

export default ViewField;
