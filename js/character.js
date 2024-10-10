export class Character {
  constructor() {
    this.name = getRandomName(5).singleName;
    this.image = getRandomNumber(1, 109);
    this.role = getRandomData(gameData.characterRole);
    this.expertise = getRandomData(gameData.characterExpertise);
    this.power = getRandomData(gameData.characterPower);
    this.flaw = getRandomData(gameData.characterFlaw);
    this.behavior = getRandomData(gameData.characterBehaviors);
    this.background = getRandomData(gameData.characterBackground);
    this.looks = getRandomData(gameData.characterLooks);
    this.backstory = getRandomData(gameData.characterBackstory);
    this.description = getRandomDescription(
      this.role,
      this.expertise,
      this.power,
      this.flaw,
      this.behavior,
      this.background,
      this.looks,
      this.backstory,
    );
    this.credit = 3;
    this.items = [
      { id: 0, name: "Suit", tag: "Gear", clockType: 1, clockStage: 0 },
    ];
    this.stats = getStats();
    this.intellect = this.stats[0];
    this.charisma = this.stats[1];
    this.nerves = this.stats[2];
    this.moxie = 3;
    this.conditions = "";
    this.heat = 0;
    this.shipName = getRandomData(gameData.shipName);
    this.shipFeature = getRandomData(gameData.shipFeature);
    this.shipProblem = getRandomData(gameData.shipProblem);
    this.shipImage = getRandomNumber(1, 101);
    this.shipModules = [

    ];
    this.shipCargos = [
      
    ]
    this.logs = "";
  }
  //#region BuilderPatern
  setName(name) {
    this.name = name;
    return this;
  }
  setImage(image) {
    this.image = image;
    return this;
  }
  setRole(role) {
    this.role = role;
    return this;
  }
  setExpertise(expertise) {
    this.expertise = expertise;
    return this;
  }
  setPower(power) {
    this.power = power;
    return this;
  }
  setFlaw(flaw) {
    this.flaw = flaw;
    return this;
  }
  setBehavior(behavior) {
    this.behavior = behavior;
    return this;
  }
  setBackground(background) {
    this.background = background;
    return this;
  }
  setLooks(looks) {
    this.looks = looks;
    return this;
  }
  setBackstory(backstory) {
    this.backstory = backstory;
    return this;
  }
  setDescription(description) {
    this.description = description;
    return this;
  }
  setCredit(credit) {
    this.credit = credit;
    return this;
  }
  setItems(items) {
    this.items = items;
    return this;
  }
  setIntellect(intellect) {
    this.intellect = intellect;
    return this;
  }
  setCharisma(charisma) {
    this.charisma = charisma;
    return this;
  }
  setNerves(nerves) {
    this.nerves = nerves;
    return this;
  }
  setStats(intellect, charisma, nerves) {
    this.stats = [intellect, charisma, nerves];
    return this;
  }
  setMoxie(moxie) {
    this.moxie = moxie;
    return this;
  }
  setConditions(conditions) {
    this.conditions = conditions;
    return this;
  }
  setHeat(heat) {
    this.heat = heat;
    return this;
  }
  setShipName(shipName) {
    this.shipName = shipName;
    return this;
  }
  setShipFeature(shipFeature) {
    this.shipFeature = shipFeature;
    return this;
  }
  setShipProblem(shipProblem) {
    this.shipProblem = shipProblem;
    return this;
  }
  setShipImage(shipImage) {
    this.shipImage = shipImage;
    return this;
  }
  setModules(shipModules) {
    this.shipModules = shipModules;
    return this;
  }
  setCargos(shipCargos) {
    this.shipCargos = shipCargos;
    return this;
  }
  setLogs(logs) {
    this.logs = logs;
    return this;
  }
  //#endregion
}

//#region helper functions
export async function getGameData() {
  const response = await fetch("../data/data.json");
  const data = await response.json();

  const newData = {};
  for (let key in data) {
    newData[key] = data[key];
  }
  return newData;
}
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function getRandomData(dataArray) {
  return dataArray[getRandomNumber(0, dataArray.length)];
}
export function getDifferentElements(dataArray, quantity) {
  const result = [];
  const usedIndices = new Set();
  while (result.length < quantity) {
    const randIndex = Math.floor(Math.random() * dataArray.length);
    if (!usedIndices.has(randIndex)) {
      result.push(dataArray[randIndex]);
      usedIndices.add(randIndex);
    }
  }
  return result;
}
export function getRandomName(quantity) {
  const namePool = [];
  const tempNames = getDifferentElements(gameData.characterName, quantity);
  const tempAlias = getDifferentElements(gameData.characterAlias, quantity);
  const tempUniqueNames = getDifferentElements(gameData.uniqueNames, quantity);
  for (let i = 0; i < quantity; i++) {
    namePool.push(`${tempNames[i]} ${tempAlias[i]}`);
    namePool.push(tempUniqueNames[i]);
  }
  return {
    namePool : namePool,
    singleName : namePool[getRandomNumber(0, namePool.length)]
  }
}
export function getRandomDescription(role,expertise,power,flaw,behavior,background,looks,backstory) {
  role = role.toLowerCase();
  expertise = expertise.toLowerCase();
  power = power.toLowerCase();
  flaw = flaw.toLowerCase();
  behavior = behavior.toLowerCase();
  background = background.toLowerCase();
  looks = looks.toLowerCase();
  backstory = backstory.toLowerCase();
  const descriptionPool = [
    `A ${behavior} ${role}, who appears ${looks}. Once a ${background}, ${backstory}. Now, venturing to settle a spacemonger identity.`,
    `A ${looks} ${role}, with ${behavior} vibes. Back then a ${background}, ${backstory}. After deciding the path to move on, now ready for any voyage.`,
    `A ${role}, looking ${looks} yet ${behavior}. Formerly a ${background}, ${backstory}. Following the events, with determined plans the route is clear.`,
    `A ${role}, with a ${looks} appearance and a ${behavior} personality. Formerly a ${background}. Being ${flaw} has shaped the knowledge ${expertise}, and ready to face the unknown.`,
    `A ${role}, seemingly ${looks} and ${behavior}. But beneath the surface lies a ${background} past. Now wandering with a resolute mind to follow.`,
    `A ${looks} ${role}, driven by ${power}. Being a ${background} forced a ${behavior} nature inside. Now on the path of seeking answers and new adventures.`,
    `A ${behavior} ${role}, known for being ${behavior}. Torn between a ${background} background and a new goal, now struggle with being ${flaw} yet still eager to exploit opportunities.`,
    `A ${looks} ${role}, with ${behavior} personality. Already forgotten about the ${background} past and succumbed to dreams, now willing to fulfill an aspiration with clear intent.`,
    `A ${behavior} ${role}, seeming lost. Experience in ${expertise} uncovered a potency of ${power} powers. Taking the ${background} past for granted, aiming to put the skills on test as striving for growth.`,
    `A ${role} at one point serving as a ${background}, ${backstory}. Scarred by the events, the ${looks} impression and ${behavior} habit reflects the foregone. Fueled by the ${power} talents, decided to head on a journey for a new beginning.`
  ];
  const characterDescription = descriptionPool[getRandomNumber(0, descriptionPool.length)];
  return characterDescription;
}
function getStats() {
  const numbers = [];
  while (numbers.length < 3) {
    const randomNumber = Math.floor(Math.random() * 5) + 2;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}
//#endregion

const gameData = await getGameData();