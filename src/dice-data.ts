import type { ComputedDataKey, Correction, Status } from "@/type";

export class DiceData {
  private _karate: number;
  private _neuron: number;
  private _wazamae: number;
  private _jitsu: number;
  private _con: number;
  private _pow: number;
  private _mov: number;
  private _dodge: number;
  private _karateDice: number;
  private _neuronDice: number;
  private _wazamaeDice: number;
  private _attackDice: number;
  private _shootingDice: number;
  private _initiative: number;
  private _hackingDice: number;
  private _precisionDice: number;
  private _highMobilityDice: number;
  private _jitsuExecutionDice: number;
  private _negotiationDice: number;
  private _knowledgeDice: number;
  private _researchDice: number;
  private _additionalDodgeDice: number;
  private _additionalDice: number;
  private _karateDiceDifficulty: number;
  private _neuronDiceDifficulty: number;
  private _wazamaeDiceDifficulty: number;
  private _attackDiceDifficulty: number;
  private _shootingDiceDifficulty: number;
  private _hackingDiceDifficulty: number;
  private _precisionDiceDifficulty: number;
  private _highMobilityDiceDifficulty: number;
  private _jitsuExecutionDiceDifficulty: number;
  private _negotiationDiceDifficulty: number;
  private _knowledgeDiceDifficulty: number;
  private _researchDiceDifficulty: number;
  private _dodgeDifficulty: number;

  constructor(init?: Partial<DiceData>) {
    this._karate = init?.karate ?? 0;
    this._neuron = init?.neuron ?? 0;
    this._wazamae = init?.wazamae ?? 0;
    this._jitsu = init?.jitsu ?? 0;
    this._con = init?.con ?? 0;
    this._pow = init?.pow ?? 0;
    this._mov = init?.mov ?? 0;
    this._dodge = init?.dodge ?? 0;
    this._karateDice = init?.karateDice ?? 0;
    this._neuronDice = init?.neuronDice ?? 0;
    this._wazamaeDice = init?.wazamaeDice ?? 0;
    this._attackDice = init?.attackDice ?? 0;
    this._shootingDice = init?.shootingDice ?? 0;
    this._initiative = init?.initiative ?? 0;
    this._hackingDice = init?.hackingDice ?? 0;
    this._precisionDice = init?.precisionDice ?? 0;
    this._highMobilityDice = init?.highMobilityDice ?? 0;
    this._jitsuExecutionDice = init?.jitsuExecutionDice ?? 0;
    this._negotiationDice = init?.negotiationDice ?? 0;
    this._knowledgeDice = init?.knowledgeDice ?? 0;
    this._researchDice = init?.researchDice ?? 0;
    this._additionalDodgeDice = init?.additionalDodgeDice ?? 0;
    this._additionalDice = init?.additionalDice ?? 0;
    this._karateDiceDifficulty = init?.karateDiceDifficulty ?? 0;
    this._neuronDiceDifficulty = init?.neuronDiceDifficulty ?? 0;
    this._wazamaeDiceDifficulty = init?.wazamaeDiceDifficulty ?? 0;
    this._attackDiceDifficulty = init?.attackDiceDifficulty ?? 0;
    this._shootingDiceDifficulty = init?.shootingDiceDifficulty ?? 0;
    this._hackingDiceDifficulty = init?.hackingDiceDifficulty ?? 0;
    this._precisionDiceDifficulty = init?.precisionDiceDifficulty ?? 0;
    this._highMobilityDiceDifficulty = init?.highMobilityDiceDifficulty ?? 0;
    this._jitsuExecutionDiceDifficulty = init?.jitsuExecutionDiceDifficulty ?? 0;
    this._negotiationDiceDifficulty = init?.negotiationDiceDifficulty ?? 0;
    this._knowledgeDiceDifficulty = init?.knowledgeDiceDifficulty ?? 0;
    this._researchDiceDifficulty = init?.researchDiceDifficulty ?? 0;
    this._dodgeDifficulty = init?.dodgeDifficulty ?? 0;
  }

  set karate(value: number) {
    this._karate = value;
  }
  get karate(): number {
    return this._karate;
  }
  set neuron(value: number) {
    this._neuron = value;
  }
  get neuron(): number {
    return this._neuron;
  }
  set wazamae(value: number) {
    this._wazamae = value;
  }
  get wazamae(): number {
    return this._wazamae;
  }
  set jitsu(value: number) {
    this._jitsu = value;
  }
  get jitsu(): number {
    return this._jitsu;
  }
  set con(value: number) {
    this._con = value;
  }
  get con(): number {
    return this._con;
  }
  set pow(value: number) {
    this._pow = value;
  }
  get pow(): number {
    return this._pow;
  }
  set mov(value: number) {
    this._mov = value;
  }
  get mov(): number {
    return this._mov;
  }
  set dodge(value: number) {
    this._dodge = value;
  }
  get dodge(): number {
    return this._dodge;
  }
  set karateDice(value: number) {
    this._karateDice = value;
  }
  get karateDice(): number {
    return this._karateDice;
  }
  set neuronDice(value: number) {
    this._neuronDice = value;
  }
  get neuronDice(): number {
    return this._neuronDice;
  }
  set wazamaeDice(value: number) {
    this._wazamaeDice = value;
  }
  get wazamaeDice(): number {
    return this._wazamaeDice;
  }
  set attackDice(value: number) {
    this._attackDice = value;
  }
  get attackDice(): number {
    return this._attackDice;
  }
  set shootingDice(value: number) {
    this._shootingDice = value;
  }
  get shootingDice(): number {
    return this._shootingDice;
  }
  set initiative(value: number) {
    this._initiative = value;
  }
  get initiative(): number {
    return this._initiative;
  }
  set hackingDice(value: number) {
    this._hackingDice = value;
  }
  get hackingDice(): number {
    return this._hackingDice;
  }
  set precisionDice(value: number) {
    this._precisionDice = value;
  }
  get precisionDice(): number {
    return this._precisionDice;
  }
  set highMobilityDice(value: number) {
    this._highMobilityDice = value;
  }
  get highMobilityDice(): number {
    return this._highMobilityDice;
  }
  set jitsuExecutionDice(value: number) {
    this._jitsuExecutionDice = value;
  }
  get jitsuExecutionDice(): number {
    return this._jitsuExecutionDice;
  }
  set negotiationDice(value: number) {
    this._negotiationDice = value;
  }
  get negotiationDice(): number {
    return this._negotiationDice;
  }
  set knowledgeDice(value: number) {
    this._knowledgeDice = value;
  }
  get knowledgeDice(): number {
    return this._knowledgeDice;
  }
  set researchDice(value: number) {
    this._researchDice = value;
  }
  get researchDice(): number {
    return this._researchDice;
  }
  set additionalDodgeDice(value: number) {
    this._additionalDodgeDice = value;
  }
  get additionalDodgeDice(): number {
    return this._additionalDodgeDice;
  }
  set additionalDice(value: number) {
    this._additionalDice = value;
  }
  get additionalDice(): number {
    return this._additionalDice;
  }
  set karateDiceDifficulty(value: number) {
    this._karateDiceDifficulty = value;
  }
  get karateDiceDifficulty(): number {
    return this._karateDiceDifficulty;
  }
  set neuronDiceDifficulty(value: number) {
    this._neuronDiceDifficulty = value;
  }
  get neuronDiceDifficulty(): number {
    return this._neuronDiceDifficulty;
  }
  set wazamaeDiceDifficulty(value: number) {
    this._wazamaeDiceDifficulty = value;
  }
  get wazamaeDiceDifficulty(): number {
    return this._wazamaeDiceDifficulty;
  }
  set attackDiceDifficulty(value: number) {
    this._attackDiceDifficulty = value;
  }
  get attackDiceDifficulty(): number {
    return this._attackDiceDifficulty;
  }
  set shootingDiceDifficulty(value: number) {
    this._shootingDiceDifficulty = value;
  }
  get shootingDiceDifficulty(): number {
    return this._shootingDiceDifficulty;
  }
  set hackingDiceDifficulty(value: number) {
    this._hackingDiceDifficulty = value;
  }
  get hackingDiceDifficulty(): number {
    return this._hackingDiceDifficulty;
  }
  set precisionDiceDifficulty(value: number) {
    this._precisionDiceDifficulty = value;
  }
  get precisionDiceDifficulty(): number {
    return this._precisionDiceDifficulty;
  }
  set highMobilityDiceDifficulty(value: number) {
    this._highMobilityDiceDifficulty = value;
  }
  get highMobilityDiceDifficulty(): number {
    return this._highMobilityDiceDifficulty;
  }
  set jitsuExecutionDiceDifficulty(value: number) {
    this._jitsuExecutionDiceDifficulty = value;
  }
  get jitsuExecutionDiceDifficulty(): number {
    return this._jitsuExecutionDiceDifficulty;
  }
  set negotiationDiceDifficulty(value: number) {
    this._negotiationDiceDifficulty = value;
  }
  get negotiationDiceDifficulty(): number {
    return this._negotiationDiceDifficulty;
  }
  set knowledgeDiceDifficulty(value: number) {
    this._knowledgeDiceDifficulty = value;
  }
  get knowledgeDiceDifficulty(): number {
    return this._knowledgeDiceDifficulty;
  }
  set researchDiceDifficulty(value: number) {
    this._researchDiceDifficulty = value;
  }
  get researchDiceDifficulty(): number {
    return this._researchDiceDifficulty;
  }
  set dodgeDifficulty(value: number) {
    this._dodgeDifficulty = value;
  }
  get dodgeDifficulty(): number {
    return this._dodgeDifficulty;
  }

  public applyCorrection(corrections?: Correction[] | null) {
    if (corrections) {
      for (const { key, size } of corrections) {
        this[key] += size;
      }
    }
  }

  public static createNewDiceData(status: Status) {
    const computedData = new DiceData({
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
    });

    // 装備（アーマー・武器・スキル）を走査し補正値を適用
    for (const item of [...status.skillSlot, ...status.armor]) {
      computedData.applyCorrection(item.correction);
    }

    for (const weapon of status.weapon) {
      computedData.applyCorrection(weapon.passiveCorrection);
      computedData.applyCorrection(weapon.equippedCorrection);
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

    return computedData;
  }
}
