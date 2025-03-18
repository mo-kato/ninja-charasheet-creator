import { APP_TITLE } from "@/constants";
import { css } from "@/styled-system/css";

export default function About() {
  return (
    <div
      className={css({
        textAlign: "left",
        whiteSpace: "pre-line",
        maxW: "50rem",
        mx: "auto",
        lineHeight: "loose",
      })}
    >
      <h1
        className={css({
          textAlign: "center",
          lineHeight: "2.5",
        })}
      >
        {"◆ 説明な ◆"}
      </h1>
      <p>
        {APP_TITLE}
        は、あなたのニンジャスレイヤーTRPGのキャラクターシートの作成を助けます。個人が作った非公式・非公認のファンメイドツールです。公式とは一切関係がない。
      </p>
      <p>以下ゴメンナサイ事項です。</p>
      <ul
        className={css({
          "& > li": {
            textIndent: "4",
            _before: {
              content: "'● '",
            },
          },
        })}
      >
        <li>作成されたニンジャは、あなたのローカル環境に保存されます。誰とも共有されません。</li>
        <li>IRC端末のような小さい画面での表示はまだ対応できていません。</li>
        <li>画像アップロード機能があったら便利なのは十分に理解しています。</li>
        <li>予告なくサービスを終了する場合があります。</li>
      </ul>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
