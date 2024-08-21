class Character{
    constructor(name,backstory,role,expertise,power,flaw,shipName,shipFeature,shipProblem){
        this.name=name;
        this.backstory=backstory;
        this.role = role ||getRandomData(gameData.characterRole);
        this.expertise = expertise || getRandomData(gameData.characterExpertise);
        this.power=power||getRandomData(gameData.characterPower);
        this.flaw=flaw || getRandomData(gameData.characterFlaw);
        this.stats = setStats();
        this.intellect=this.stats[0];
        this.charisma=this.stats[1];
        this.nerves=this.stats[2];
        this.moxie = 3;
        this.shipName = shipName || getRandomData(gameData.shipName);
        this.shipFeature = shipFeature || getRandomData(gameData.shipFeature);
        this.shipProblem = shipProblem || getRandomData(gameData.shipProblem);
    }
}
async function getGameData() {
    const response = await fetch('../data/data.json');
    const data = await response.json();

    const newData = {};
    for (let key in data) {
        newData[key] = data[key];
    }
    return newData;
}
function getRandomData(dataArray){
    return dataArray[getRandomNumber(0,dataArray.length)];
}
function setStats(){
    const numbers = [];
    while (numbers.length < 3) {
        const rand = Math.floor(Math.random() * 5) + 2; // Random number between 2 and 6
        if (!numbers.includes(rand)) {
            numbers.push(rand);
        }
    }
    return numbers;
}
function getRandomNumber(min,max){
    return  Math.floor(Math.random() * (max-min) + min);
}

const gameData = await getGameData();
const character = new Character();
console.log(character);