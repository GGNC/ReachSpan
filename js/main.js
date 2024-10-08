import { Character, getGameData, getDifferentElements , getRandomNumber } from "./character.js";
const character = new Character();
//#region helperFunctions
const gameData = await getGameData();
function isInputEmpty(inputElement) {
    // Trim the input to remove any extra spaces
    return !(inputElement.value.trim() === '');
}
//#endregion

//#region landing Page
const infoMessage = document.querySelector(`#infoMessage`);
const randomCharacterButton = document.querySelector(`#randomCharacterButton`);
const loadCharacterButton = document.querySelector(`#loadCharacterButton`);
if(localStorage.getItem('character')){
    loadCharacterButton.style.display = "block";
}
loadCharacterButton.addEventListener(`click`,()=>{
    window.location.href = "./character-sheet.html";
});
randomCharacterButton.addEventListener(`click`,()=>{
    document.querySelector("#landingPage").style.display = "none";
    document.querySelector("#randomCharacterPage").style.display = "block";
});
//#endregion
//#region random Character Page
    //#region setup Fields
        //#region image
            let randomShipImageValue = getRandomNumber(1,19);
            const randomShipImage = document.querySelector("#data-randomShipImage");
            randomShipImage.src = randomShipImage.src.replace(/(\d+)(?!.*\d)/, randomShipImageValue);
        //#endregion
        //#region name 
            const randomShipNameSelection = document.querySelector("#randomShipNameSelection");
            randomShipNameSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const randomShipNameInput = document.querySelector("#randomShipNameInput");
            const randomShipNames = getDifferentElements(gameData.shipName,7);
            for (let index = 0; index < randomShipNames.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomShipNames[index];
                randomShipNameSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region feature
            const randomShipSpecialFeatureSelection = document.querySelector("#randomShipSpecialFeatureSelection");
            randomShipSpecialFeatureSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const randomShipSpecialFeatureInput = document.querySelector("#randomShipSpecialFeatureInput");
            const randomSpecialFeatures = getDifferentElements(gameData.shipFeature,7);
            for (let index = 0; index < randomSpecialFeatures.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomSpecialFeatures[index];
                randomShipSpecialFeatureSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region problem
            const randomShipProblemSelection = document.querySelector("#randomShipProblemSelection");
            randomShipProblemSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const randomShipProblemInput = document.querySelector("#randomShipProblemInput");
            const randomShipProblems = getDifferentElements(gameData.shipProblem,7);
            for (let index = 0; index < randomShipProblems.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomShipProblems[index];
                randomShipProblemSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region module
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const maxAllowed = 3;
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
                    if (checkedCount > maxAllowed) {
                        this.checked = false;  // Uncheck the latest one if more than 3 are selected
                        alert('You can only select up to ' + maxAllowed + ' modules.');
                    }
                });
            });
            const labels = document.querySelectorAll(".randomShipModuleImage");
            labels.forEach(label =>{
                label.addEventListener('mousemove',(event)=>{
                    infoMessage.style.display = 'block';
                    infoMessage.style.width = "auto";
                    infoMessage.style.left = event.pageX + 'px';
                    infoMessage.style.top = event.pageY + 'px';
                    infoMessage.textContent = label.getAttribute("data-description");
                });
                label.addEventListener('mouseout',(event)=>{
                    infoMessage.style.display = 'none';
                    infoMessage.style.width = "20vw";
                });
            });
            const randomModuleNameHolder = document.querySelector("#randomModuleNameHolder");
            randomModuleNameHolder.addEventListener('mousemove',(event)=>{
                infoMessage.style.display = 'block';
                infoMessage.style.width = "auto";
                infoMessage.style.left = event.pageX + 'px';
                infoMessage.style.top = event.pageY + 'px';
                infoMessage.textContent = "Up to 3";
            });
            randomModuleNameHolder.addEventListener('mouseout',(event)=>{
                infoMessage.style.display = 'none';
                infoMessage.style.width = "20vw";
            });
        //#endregion
    //#endregion
    //#region event Listeners
        //#region shipImageButtons
            const randomShipButtonLeft = document.querySelector("#randomShipButtonLeft");
            randomShipButtonLeft.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomShipImageValue-1)<=0)){
                    randomShipImageValue -=1;
                    randomShipImage.src = randomShipImage.src.replace(/(\d+)(?!.*\d)/, randomShipImageValue);
                }
            });

            const randomShipButtonRight = document.querySelector("#randomShipButtonRight");
            randomShipButtonRight.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomShipImageValue+1)>18)){
                    randomShipImageValue +=1;
                    randomShipImage.src = randomShipImage.src.replace(/(\d+)(?!.*\d)/, randomShipImageValue);
                }
            });
        //#endregion
        //#region inputFields
            randomShipNameInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(randomShipNameInput)){
                    randomShipNameInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    randomShipNameSelection.style.boxShadow = "none";
                }else{
                    randomShipNameInput.style.boxShadow = "none";
                    randomShipNameSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            randomShipNameInput.addEventListener("keydown", (event) => {
              if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
              }
            });
            randomShipSpecialFeatureInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(randomShipSpecialFeatureInput)){
                    randomShipSpecialFeatureInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    randomShipSpecialFeatureSelection.style.boxShadow = "none";
                }else{
                    randomShipSpecialFeatureInput.style.boxShadow = "none";
                    randomShipSpecialFeatureSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            randomShipSpecialFeatureInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
              });
            randomShipProblemInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(randomShipProblemInput)){
                    randomShipProblemInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    randomShipProblemSelection.style.boxShadow = "none";
                }else{
                    randomShipProblemInput.style.boxShadow = "none";
                    randomShipProblemSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            randomShipProblemInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
              });
        //#endregion
        //#region Back Main Menu
            const randomBackMainMenuButton = document.querySelector("#randomBackMainMenuButton");
            randomBackMainMenuButton.addEventListener("click",(event)=>{
                event.preventDefault();
                document.querySelector("#landingPage").style.display = "block";
                document.querySelector("#randomCharacterPage").style.display = "none";
            })
        //#endregion
        //#region submit button
            const createRandomCharacterButton = document.querySelector("#createRandomCharacterButton");
            createRandomCharacterButton.addEventListener("click",(event)=>{
                event.preventDefault();
                let lastID = 0;
                let shipImage = randomShipImageValue;
                character.setShipImage(shipImage);
                let shipName = randomShipNameInput.value.trim() || randomShipNameSelection.value;
                character.setShipName(shipName);
                let shipSpecialFeature = randomShipSpecialFeatureInput.value.trim() || randomShipSpecialFeatureSelection.value;
                character.setShipFeature(shipSpecialFeature);
                let shipProblem = randomShipProblemInput.value.trim() || randomShipProblemSelection.value;
                character.setShipProblem(shipProblem);
                for (const module of document.querySelectorAll("input[type='checkbox']:checked")){
                    let moduleName = "";
                    let moduleTag = "";
                    let moduleClockType = 0;
                    switch(module.name){
                        case "360° Gun Turret":
                            moduleName = "360° Gun Turret";
                            moduleTag = "Gear, Accurate"
                            moduleClockType = 4;
                            break;
                        case "Brig":
                            moduleName = "Brig";
                            moduleTag = "Construct, Durable"
                            moduleClockType = 2;
                            break;
                        case "Extra Cargo Hold":
                            moduleName = "Extra Cargo Hold";
                            moduleTag = "Construct, Large"
                            moduleClockType = 4;
                            break;
                        case "Hidden Compartments":
                            moduleName = "Hidden Compartments";
                            moduleTag = "Construct, Concealed"
                            moduleClockType = 2;
                            break;
                        case "Science Lab":
                            moduleName = "Science Lab";
                            moduleTag = "Gear, Chart"
                            moduleClockType = 6;
                            break;
                        case "Network Link":
                            moduleName = "Network Link";
                            moduleTag = "Gear, Chart"
                            moduleClockType = 8;
                            break;
                        case "Afterburners":
                            moduleName = "Afterburners";
                            moduleTag = "Gear, Overheating"
                            moduleClockType = 4;
                            break;
                        case "Medbay":
                            moduleName = "Medbay";
                            moduleTag = "Gear, Supply"
                            moduleClockType = 6;
                            break;
                    }
                    character.setModules([
                        ...character.shipModules,
                        {
                            id : ++lastID,
                            name : moduleName,
                            tag : moduleTag,
                            clockType : moduleClockType,
                            clockStage : 0,
                        }
                    ]);
                }
                localStorage.setItem("character", JSON.stringify(character));
                window.location.href = "./character-sheet.html";
            });
        //#endregion
    //#endregion
//#endregion