import { Character } from "./character.js";
//#region 
function saveCharacterData(){
    localStorage.setItem('character', JSON.stringify(character));
}
//#endregion
const character = new Character();

const randomCharacterButton = document.querySelector(`#randomCharacterButton`) ;
console.log(randomCharacterButton)

randomCharacterButton.addEventListener(`click`,()=>{
    saveCharacterData();
    window.location.href = "./character-sheet.html";
});