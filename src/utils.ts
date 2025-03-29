import type { ComputedDataKey, ComputedData as DiceData, Status } from "@/type";

export const roll1D6 = () => Math.floor(Math.random() * 6) + 1;

export const createNewStatus = (data: Partial<Status>): Status => ({
  id: null,
  plName: "",
  person: {
    njName: "",
    njType: "",
    affiliation: "",
    background: "",
    goodKarma: false,
  },
  base: {
    karate: 0,
    neuron: 0,
    wazamae: 0,
    jitsu: 0,
  },
  memo: {
    karate: "",
    neuron: "",
    wazamae: "",
    jitsu: "",
  },
  wealth: {
    dkk: 0,
    fame: 1,
    money: 0,
    loan: (data.armor?.filter(armor => armor.type !== "防具").length ?? 0) > 0 ? 12 : 0,
    likeability: [],
  },
  potion: {
    sushi: 0,
    toroSushi: 0,
    toroPowder: 0,
    cyberPainKiller: 0,
    cyberZazen: 0,
    zbr: 0,
  },
  armor: [],
  weapon: [
    {
      name: "素手＆スリケン",
      isWearing: true,
      slot: 1,
    },
  ],
  skillSlot: [],
  jitsuSlot: [],
  free: "",
  ...data,
});

const createNewDiceData = (status: Status): DiceData => {
  return {
    karate: status.base.karate,
    neuron: status.base.neuron,
    wazamae: status.base.wazamae,
    jitsu: status.base.jitsu,
    con: status.base.karate,
    pow: status.base.neuron,
    mov: Math.max(2, Math.ceil(Math.max(status.base.karate, status.base.wazamae) / 2)),
    dodge: Math.max(status.base.karate, status.base.neuron, status.base.wazamae, status.base.jitsu),
    karateDice: status.base.karate,
    neuronDice: status.base.neuron,
    wazamaeDice: status.base.wazamae,
    jitsuExecutionDice: status.base.jitsu + status.base.neuron,
    attackDice: 0,
    shootingDice: 0,
    initiative: 0,
    hackingDice: 0,
    precisionDice: 0,
    highMobilityDice: 0,
    negotiationDice: 0,
    knowledgeDice: 0,
    researchDice: 0,
    additionalDodgeDice: 0,
    additionalDice: 5,
    karateDiceDifficulty: 3,
    neuronDiceDifficulty: 3,
    wazamaeDiceDifficulty: 3,
    attackDiceDifficulty: 3,
    shootingDiceDifficulty: 3,
    hackingDiceDifficulty: 3,
    precisionDiceDifficulty: 3,
    highMobilityDiceDifficulty: 3,
    jitsuExecutionDiceDifficulty: 3,
    negotiationDiceDifficulty: 3,
    knowledgeDiceDifficulty: 3,
    researchDiceDifficulty: 3,
    dodgeDifficulty: 3,
  };
};

export const computeStatus = (status: Status): DiceData => {
  const computedData: DiceData = createNewDiceData(status);

  // correction を集計する関数
  const applyCorrection = (corrections?: { key: ComputedDataKey; size: number }[] | null) => {
    if (corrections) {
      for (const { key, size } of corrections) {
        computedData[key] += size;
      }
    }
  };

  // 装備（アーマー・武器・スキル）を走査し補正値を適用
  for (const item of [
    ...status.skillSlot.filter(skill => skill.has),
    ...status.armor.filter(armor => armor.isWearing),
  ]) {
    applyCorrection(item.correction);
  }

  for (const weapon of status.weapon.filter(weapon => weapon.isWearing)) {
    applyCorrection(weapon.passiveCorrection);
    applyCorrection(weapon.equippedCorrection);
  }

  // 基礎値の合算
  computedData.attackDice += computedData.karateDice;
  computedData.shootingDice += computedData.wazamaeDice;
  computedData.highMobilityDice += computedData.wazamaeDice;
  computedData.precisionDice += computedData.wazamaeDice;
  computedData.negotiationDice += computedData.wazamaeDice;
  computedData.initiative += computedData.neuronDice;
  computedData.hackingDice += computedData.neuronDice;
  computedData.knowledgeDice += computedData.neuronDice;
  computedData.researchDice += Math.max(computedData.wazamaeDice, computedData.neuronDice);

  // 即応ダイスの計算
  // 「素手・スリケン」の分は数えないので初期値6として計算
  computedData.additionalDice = status.weapon.reduce((accumulator, current) => accumulator - current.slot, 6);
  
  return computedData;
};
