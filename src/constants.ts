import type { ComputedDataKey, Equipment, Skill, StatusKey, Weapon } from "@/type";

export const APP_TITLE = "【非公式な】ニンジャクリエイシヨンツール◆";

export const ninjaNameA: string[][] = [
  ["ブラック", "ホワイト", "レッド", "ブルー", "グリーン", "イエロー"], // 1x
  ["デス", "ヘル", "ジゴク", "キル", "ドゥーム", "デッド"], // 2x
  ["マーシレス", "マッド", "クレイジー", "ブルータル", "ブラッド", "ダーク"], // 3x
  ["クイック", "ロング", "シャープ", "デジタル", "サイバー", "デッドリー"], // 4x
  ["スモーク", "ポイズン", "アイアン", "ゴールデン", "ブレード", "キリング"], // 5x
  ["アース", "ウインド", "ファイア", "アイス", "ヴォイド", "ライトニング"], // 6x
] as const;

// ニンジャ名Bパートの単語リスト
export const ninjaNameB: string[][] = [
  ["シャドウ", "ゴースト", "アサシン", "リーパー", "ウォーカー", "ランナー"], // 1x
  ["ハンド", "フィスト", "フィンガー", "ヘッド", "アイズ", "トゥース"], // 2x
  ["スリケン", "クナイ", "カタナ", "ソード", "アックス", "ボム"], // 3x
  ["メイヘム", "マサカー", "キラー", "マシーン", "ハッカー", "チェイサー"], // 4x
  ["ラット", "ライオン", "ドラゴン", "ウルフ", "ドッグ", "コブラ"], // 5x
  ["カッター", "ブレイカー", "クラッシャー", "ドミネイター", "シューター", "ブリンガー"], // 6x
] as const;

export const skills: { [key: string]: Skill } = {
  "◉常人の三倍の脚力": {
    name: "◉常人の三倍の脚力",
    correction: [
      {
        key: "mov",
        size: 1,
      },
      {
        key: "highMobilityDiceDifficulty",
        size: -1,
      },
    ],
  },
  "◉頑強なる肉体": {
    name: "◉頑強なる肉体",
    correction: [
      {
        key: "con",
        size: 2,
      },
    ],
    effect: "『抵抗判定』強化",
  },
  "◉ランスキック": {
    name: "◉ランスキック",
    effect: "ワザ。弾き飛ばしを発生させる。",
  },
  "◉魅了": {
    name: "◉魅了",
    effect: "モータル1体を無力化する。",
  },
  "◉ニンジャソウルの闇": {
    name: "◉ニンジャソウルの闇",
    correction: [
      {
        key: "con",
        size: 1,
      },
      {
        key: "attackDice",
        size: 1,
      },
      {
        key: "shootingDice",
        size: 1,
      },
      {
        key: "jitsuExecutionDice",
        size: 1,
      },
    ],
  },
  "◉kill-9": {
    name: "◉kill-9",
    effect: "戦闘兵器やクローンヤクザに自爆命令を下す。",
  },
} as const;

export const jitsuSystems = [
  "カトン・ジツ",
  "ヘンゲヨーカイ・ジツ",
  "カラテミサイル",
  "ムテキ・アティチュード",
  "カナシバリ・ジツ",
] as const;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const items: { [key: string]: any } = {
  家族の写真: {
    name: "家族の写真",
    type: "防具",
    part: "レリック",
    cyberneticLv: 0,
    correction: [
      {
        key: "pow",
        size: 1,
      },
    ],
    effect: "その他使い捨て効果あり",
    isWearing: true,
  } as Equipment,
  オーガニック・スシ: "sushi",
  トロ粉末: "toroPowder",
  ウイルス入りフロッピー: {
    name: "ウイルス入りフロッピー",
    slot: 1,
    effect: "ハッキング判定でダイス+3個",
    isWearing: true,
  } as Weapon,
  ZBRアドレナリン注射器: "zbr",
  カタナ: {
    name: "カタナ",
    slot: 1,
    equippedCorrection: [
      {
        key: "highMobilityDiceDifficulty",
        size: 1,
      },
    ],
    effect: `ダメージと基本攻撃難易度：1ダメージ、NORMAL

◇装備時の獲得スタイル◇
『●戦闘スタイル：強攻撃』：全攻撃が『攻撃判定』難易度+1となり、全攻撃が『痛打+1』となる。連続攻撃上限3。
『●戦闘スタイル：精密攻撃』：【ワザマエ】値で『攻撃判定』を行う。『サツバツ！』は【6,6,6】、『ナムアミダブツ！』は【6,6,6,6】となる。いずれの場合も『痛打』は発生しない。`,
    isWearing: true,
  } as Weapon,
} as const;

export const cybernetics: { [key: string]: Equipment } = {
  "▶︎テッコLV1": {
    name: "▶︎テッコLV1",
    part: "腕部",
    type: "戦闘用サイバネ",
    cyberneticLv: 1,
    isWearing: true,
    correction: [
      {
        key: "karateDice",
        size: 1,
      },
      {
        key: "dodge",
        size: 1,
      },
    ],
  },
  "▶︎ヒキャクLV1": {
    name: "▶︎ヒキャクLV1",
    part: "脚部",
    type: "戦闘用サイバネ",
    cyberneticLv: 1,
    isWearing: true,
    correction: [
      {
        key: "mov",
        size: 1,
      },
      {
        key: "dodge",
        size: 1,
      },
    ],
  },
  "▶︎サイバネアイLV1": {
    name: "▶︎サイバネアイLV1",
    type: "戦闘用サイバネ",
    part: "頭部",
    cyberneticLv: 1,
    isWearing: true,
    correction: [
      {
        key: "wazamaeDice",
        size: 1,
      },
      {
        key: "shootingDice",
        size: 1,
      },
    ],
  },
  "▶︎生体LAN端子LV1": {
    name: "▶︎生体LAN端子LV1",
    type: "戦闘用サイバネ",
    cyberneticLv: 1,
    part: "電脳",
    isWearing: true,
    correction: [
      {
        key: "initiative",
        size: 1,
      },
      { key: "neuronDice", size: 2 },
    ],
  },
  "▶︎クロームハートLV1": {
    name: "▶︎クロームハートLV1",
    type: "戦闘用サイバネ",
    cyberneticLv: 1,
    part: "胴体",
    isWearing: true,
    correction: [
      {
        key: "con",
        size: 1,
      },
      {
        key: "pow",
        size: 1,
      },
    ],
  },
  "▲▲戦闘用バイオサイバネLV1": {
    name: "▲▲戦闘用バイオサイバネLV1",
    type: "戦闘用バイオサイバネ",
    cyberneticLv: 2,
    part: "頭・腕",
    isWearing: true,
    correction: [
      {
        key: "negotiationDiceDifficulty",
        size: 1,
      },
    ],
    effect: "近接攻撃時のダメージ+1",
  },
} as const;

export const knowledgeData: string[][] = [
  // D1X: 流儀系
  [
    "◉知識：ストリートの流儀",
    "◉知識：ヤクザの流儀",
    "◉知識：公僕の流儀",
    "◉知識：ハッカーの流儀",
    "◉知識：サラリマンの流儀",
    "◉知識：貴族の流儀",
  ],
  // D2X: ギア系
  [
    "◉技術：銃器",
    "◉技術：サイバネティクス",
    "◉技術：ビークル",
    "◉技術：大型兵器",
    "◉技術：テックガジェット",
    "◉技術：電子ウイルス",
  ],
  // D3X: 趣味系
  [
    "◉趣味：ファッション",
    "◉趣味：現代的アート",
    "◉趣味：伝統的アート",
    "◉趣味：スポーツ",
    "◉趣味：高級嗜好品",
    "◉趣味：オイランドロイド",
  ],
  // D4X: 組織系
  [
    "◉組織：重工系メガコーポ",
    "◉組織：バイオ系メガコーポ",
    "◉組織：ソウカイヤ",
    "◉組織：ザイバツ",
    "◉組織：アマクダリ",
    "◉組織：独立小組織",
  ],
  // D5X: シノギ系
  [
    "◉シノギ：ドラッグ",
    "◉シノギ：犯罪",
    "◉シノギ：セキュリティ",
    "◉シノギ：宗教",
    "◉シノギ：オカルト",
    "◉シノギ：危険生物",
  ],
  // D6X: 地域系
  [
    "◉地域：カチグミエリア",
    "◉地域：水路港湾エリア",
    "◉地域：旧世紀地下道網",
    "◉地域：山岳エリア",
    "◉地域：IRCネットワーク",
    "◉地域：古代ニンジャ文明",
  ],
] as const;

export const LABEL_NAMES: { [P in ComputedDataKey | StatusKey]?: string } = {
  karate: "カラテ",
  neuron: "ニューロン",
  wazamae: "ワザマエ",
  jitsu: "ジツ",

  initiative: "機先",
  con: "体力",
  pow: "精神力",
  mov: "脚力",
  dodge: "回避",
  additionalDice: "即応ダイス",
  additionalDodgeDice: "緊急回避ダイス",

  karateDice: "カラテ判定",
  neuronDice: "ニューロン判定",
  wazamaeDice: "ワザマエ判定",
  attackDice: "攻撃",
  shootingDice: "射撃",
  hackingDice: "電脳",
  precisionDice: "精密",
  highMobilityDice: "連続側転",
  jitsuExecutionDice: "発動",
  negotiationDice: "交渉判定",
  knowledgeDice: "知識判定",
  researchDice: "調査判定",
  karateDiceDifficulty: "カラテ判定難易度",
  neuronDiceDifficulty: "ニューロン判定難易度",
  wazamaeDiceDifficulty: "ワザマエ判定難易度",
  attackDiceDifficulty: "攻撃判定難易度",
  shootingDiceDifficulty: "射撃判定難易度",
  hackingDiceDifficulty: "電脳判定難易度",
  precisionDiceDifficulty: "精密判定難易度",
  highMobilityDiceDifficulty: "連続側転難易度",
  jitsuExecutionDiceDifficulty: "発動判定難易度",
  negotiationDiceDifficulty: "交渉判定難易度",
  knowledgeDiceDifficulty: "知識判定難易度",
  researchDiceDifficulty: "調査判定難易度",
  dodgeDifficulty: "回避判定難易度",

  njName: "ニンジャネーム",
  njType: "種別",
  affiliation: "所属",
  background: "生い立ち",
  dkk: "DKK",
  fame: "名声",
  money: "万札",
  loan: "ふわふわローン",
  likeability: "親密度",
  sushi: "オーガニック・スシ",
  toroSushi: "オーガニック・トロスシ",
  toroPowder: "トロ粉末",
  cyberPainKiller: "電脳ペインキラー",
  cyberZazen: "電脳ザゼン",
  zbr: "ZBRアドレナリン",
  helmet: "頭部",
  gauntlets: "腕部",
  bodyArmor: "胴体",
  greaves: "脚部",
  relic: "レリック",
  weapon: "武器",
  skill: "スキル",
  cybernetic: "埋め込みサイバネ",
  jitsuSystem: "ジツ系統",
  knowledge: "知識",
  free: "メモ",
} as const;
