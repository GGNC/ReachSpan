import { Character, getGameData, getDifferentElements , getRandomNumber ,getRandomName ,getRandomDescription } from "./character.js";
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
const loadCharacterButton = document.querySelector(`#loadCharacterButton`);
const randomCharacterButton = document.querySelector(`#randomCharacterButton`);
const createCharacterButton = document.querySelector(`#createCharacterButton`);
if(localStorage.getItem('character')){
    loadCharacterButton.style.display = "block";
}
loadCharacterButton.addEventListener(`click`,()=>{
    window.location.href = "./character-sheet.html";
});
randomCharacterButton.addEventListener(`click`,()=>{
    document.querySelector("#landingPage").style.display = "none";
    document.querySelector("#randomCharacterPage").style.display = "block";
    document.querySelector("#createCharacterPage").style.display = "none";
});
createCharacterButton.addEventListener(`click`,()=>{
    document.querySelector("#landingPage").style.display = "none";
    document.querySelector("#randomCharacterPage").style.display = "none";
    document.querySelector("#createCharacterPage").style.display = "block";
})
//#endregion
//#region create Character Page
    //#region setup Fields
        //#region image
            let randomCharacterImageValue = getRandomNumber(1,109);
            const createCharacterImage = document.querySelector("#data-createCharacterImage");
            createCharacterImage.src = createCharacterImage.src.replace(/(\d+)(?!.*\d)/, randomCharacterImageValue);
        //#endregion
        //#region name
            const createCharacterNameSelection = document.querySelector("#createCharacterNameSelection");
            createCharacterNameSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const createCharacterNameInput = document.querySelector("#createCharacterNameInput");
            const randomCharacterNames = getRandomName(10).namePool;
            for (let index = 0; index < randomCharacterNames.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomCharacterNames[index];
                createCharacterNameSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region role
            const createCharacterRoleSelection = document.querySelector("#createCharacterRoleSelection");
            createCharacterRoleSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const createCharacterRoleInput = document.querySelector("#createCharacterRoleInput");
            const randomCharacterRoles = getDifferentElements(gameData.characterRole,8);
            for (let index = 0; index < randomCharacterRoles.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomCharacterRoles[index];
                createCharacterRoleSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region expertise
            const createCharacterExpertiseSelection = document.querySelector("#createCharacterExpertiseSelection");
            createCharacterExpertiseSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const createCharacterExpertiseInput = document.querySelector("#createCharacterExpertiseInput");
            const randomCharacterExperties = getDifferentElements(gameData.characterExpertise,8);
            for (let index = 0; index < randomCharacterExperties.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomCharacterExperties[index];
                createCharacterExpertiseSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region power
            const createCharacterPowerSelection = document.querySelector("#createCharacterPowerSelection");
            createCharacterPowerSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const createCharacterPowerInput = document.querySelector("#createCharacterPowerInput");
            const randomCharacterPowers = getDifferentElements(gameData.characterPower,10);
            for (let index = 0; index < randomCharacterPowers.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomCharacterPowers[index];
                createCharacterPowerSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region flaw
            const createCharacterFlawSelection = document.querySelector("#createCharacterFlawSelection");
            createCharacterFlawSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const createCharacterFlawInput = document.querySelector("#createCharacterFlawInput");
            const randomCharacterFlaws = getDifferentElements(gameData.characterFlaw,10);
            for (let index = 0; index < randomCharacterFlaws.length; index++) {
                const optionElemet = document.createElement("option");
                optionElemet.textContent = randomCharacterFlaws[index];
                createCharacterFlawSelection.appendChild(optionElemet);
            }
        //#endregion
        //#region description
            const createCharacterDescriptionInput = document.querySelector("#createCharacterDescriptionInput");
            createCharacterDescriptionInput.style.boxShadow = "none";
        //#endregion
        //#region stats
            //#region helper function
                function findElementsEndingWithNumber(number,origin) {
                    // Select all elements with an id attribute
                    const allElements = document.querySelectorAll('label[class="createCharacterStatValue"]');
                    const regex = new RegExp(`-${number}$`);
                    const matchingElements = [];
                
                    allElements.forEach((element) => {
                        let forValue = element.getAttribute("for");
                        if (regex.test(forValue)) {
                            matchingElements.push(element);
                        }
                    });
                
                    return matchingElements.filter(element => {
                        return element !== origin;
                    });
                }
                function handleClick(event, originButton , byWhoMessage) {
                    let buttonValue = originButton.getAttribute("value");
                    if (!buttonConfig[buttonValue].isSelected) {
                        //#region checkOther
                            for (let index = 2; index < 7; index++) {
                                if(buttonConfig[index].byWho === byWhoMessage){
                                    buttonConfig[index].isSelected=false;
                                    buttonConfig[index].byWho="";
                                    const otherButtons = findElementsEndingWithNumber(index,originButton);
                                    otherButtons.forEach(button=>{
                                        button.style.background = "#1d1e22";
                                        button.style.cursor = "pointer";
                                    });
                                }
                            }
                        //#endregion
                        buttonConfig[buttonValue].isSelected = true;
                        buttonConfig[buttonValue].byWho = byWhoMessage;
                        const otherButtons = findElementsEndingWithNumber(buttonValue,originButton);
                        otherButtons.forEach((button) => {
                        button.style.background = "#393a3f";
                        button.style.cursor = "default";
                        });
                    } else {
                        event.preventDefault();
                    }
                }
            //#endregion
            //#region radioButtons
                const buttonConfig = {
                    2 : {
                        isSelected : false,
                        byWho : ""
                    },
                    3 : {
                        isSelected : false,
                        byWho : ""
                    },
                    4 : {
                        isSelected : false,
                        byWho : ""
                    },
                    5 : {
                        isSelected : false,
                        byWho : ""
                    },
                    6 : {
                        isSelected : false,
                        byWho : ""
                    },
                }
                //#region Buttons
                    const intellectButtons = document.querySelectorAll('label[name="data-createCharacterIntellect"]');
                    intellectButtons.forEach(intellectButton => {
                        let byWhoMessage = "createCharacterIntellect";
                        intellectButton.addEventListener("click",(event)=>{
                            handleClick(event, intellectButton , byWhoMessage );
                        });
                    });
                    const charismaButtons = document.querySelectorAll('label[name="data-createCharacterCharisma"]');
                    charismaButtons.forEach(charismaButton => {
                        let byWhoMessage = "createCharacterCharisma";
                        charismaButton.addEventListener("click",(event)=>{
                            handleClick(event, charismaButton , byWhoMessage );
                        });
                    });
                    const nervesButtons = document.querySelectorAll('label[name="data-createCharacterNerves"]');
                    nervesButtons.forEach(nervesButton => {
                        let byWhoMessage = "createCharacterNerves";
                        nervesButton.addEventListener("click",(event)=>{
                            handleClick(event, nervesButton , byWhoMessage );
                        });
                    });
                //#endregion
            //#endregion
        //#endregion
    //#endregion
    //#region event Listeners
        //#region charaterImageButtons
            const createCharacterButtonLeft = document.querySelector("#createCharacterButtonLeft");
            if(randomCharacterImageValue === 1) createCharacterButtonLeft.src = "./images/arrow-images/left-arrow-0.png";
            createCharacterButtonLeft.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomCharacterImageValue-1)<=0)){
                    randomCharacterImageValue-=1;
                    if(randomCharacterImageValue===1){
                        createCharacterButtonLeft.src = "./images/arrow-images/left-arrow-0.png";
                        createCharacterButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    }else{
                        createCharacterButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        createCharacterButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    }
                    createCharacterImage.src = createCharacterImage.src.replace(/(\d+)(?!.*\d)/, randomCharacterImageValue);
                }
            });

            const createCharacterButtonRight = document.querySelector("#createCharacterButtonRight");
            if(randomCharacterImageValue === 108) createCharacterButtonRight.src = "./images/arrow-images/right-arrow-0.png";
            createCharacterButtonRight.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomCharacterImageValue+1)>108)){
                    randomCharacterImageValue +=1;
                    if(randomCharacterImageValue===108){
                        createCharacterButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        createCharacterButtonRight.src = "./images/arrow-images/right-arrow-0.png";
                    }else{
                        createCharacterButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        createCharacterButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    }
                    createCharacterImage.src = createCharacterImage.src.replace(/(\d+)(?!.*\d)/, randomCharacterImageValue);
                }
            });
        //#endregion
        //#region inputFields
            createCharacterNameInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterNameInput)){
                    createCharacterNameInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    createCharacterNameSelection.style.boxShadow = "none";
                }else{
                    createCharacterNameInput.style.boxShadow = "none";
                    createCharacterNameSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            createCharacterNameInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
            });
            createCharacterRoleInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterRoleInput)){
                    createCharacterRoleInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    createCharacterRoleSelection.style.boxShadow = "none";
                }else{
                    createCharacterRoleInput.style.boxShadow = "none";
                    createCharacterRoleSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            createCharacterRoleInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
            });
            createCharacterExpertiseInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterExpertiseInput)){
                    createCharacterExpertiseInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    createCharacterExpertiseSelection.style.boxShadow = "none";
                }else{
                    createCharacterExpertiseInput.style.boxShadow = "none";
                    createCharacterExpertiseSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            createCharacterExpertiseInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
            });
            createCharacterPowerInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterPowerInput)){
                    createCharacterPowerInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    createCharacterPowerSelection.style.boxShadow = "none";
                }else{
                    createCharacterPowerInput.style.boxShadow = "none";
                    createCharacterPowerSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            createCharacterPowerInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
            });
            createCharacterFlawInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterFlawInput)){
                    createCharacterFlawInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                    createCharacterFlawSelection.style.boxShadow = "none";
                }else{
                    createCharacterFlawInput.style.boxShadow = "none";
                    createCharacterFlawSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
                }
            });
            createCharacterFlawInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  event.preventDefault();
                }
            });
            createCharacterDescriptionInput.addEventListener("input",(event)=>{
                if (event.key === 'Enter') event.preventDefault();
                if(isInputEmpty(createCharacterDescriptionInput)){
                    createCharacterDescriptionInput.style.boxShadow = "0 0 15px 5px #8d75d3";
                }else{
                    createCharacterDescriptionInput.style.boxShadow = "none";
                }
            });
        //#endregion
        //#region submitButton
            const goToShipCreateButton = document.querySelector("#goToShipCreateButton");
            goToShipCreateButton.addEventListener("click",(event)=>{
                event.preventDefault();
                //#region process Data
                    let characterImage = randomCharacterImageValue;
                    character.setImage(characterImage);

                    let characterName = createCharacterNameInput.value.trim() || createCharacterNameSelection.value;
                    character.setName(characterName);

                    let characterRole = createCharacterRoleInput.value.trim() || createCharacterRoleSelection.value;
                    character.setRole(characterRole);

                    let characterExpertise = createCharacterExpertiseInput.value.trim() || createCharacterExpertiseSelection.value;
                    character.setExpertise(characterExpertise);

                    let characterPower = createCharacterPowerInput.value.trim() || createCharacterPowerSelection.value;
                    character.setPower(characterPower);

                    let characterFlaw = createCharacterFlawInput.value.trim() || createCharacterFlawSelection.value;
                    character.setFlaw(characterFlaw);

                    let characterDescription = createCharacterDescriptionInput.value.trim() || getRandomDescription(character.behavior,character.role,character.looks,character.background,character.backstory);
                    character.setDescription(characterDescription);

                    let allNumbers = [2,3,4,5,6];
                    let characterIntellect = 0;
                    if(document.querySelector('input[name="data-createCharacterIntellect"]:checked')){
                        characterIntellect = Number(document.querySelector('input[name="data-createCharacterIntellect"]:checked').value);
                        allNumbers = allNumbers.filter(number => number !==characterIntellect);
                    }else{
                        const randomStat = allNumbers[getRandomNumber(0,allNumbers.length)];
                        characterIntellect = randomStat;
                        allNumbers = allNumbers.filter(number => number !==randomStat);
                    }
                    character.setIntellect(characterIntellect);

                    let characterCharisma = 0;
                    if(document.querySelector('input[name="data-createCharacterCharisma"]:checked')){
                        characterCharisma = Number(document.querySelector('input[name="data-createCharacterCharisma"]:checked').value);
                        allNumbers = allNumbers.filter(number => number !==characterCharisma);
                    }else{
                        const randomStat = allNumbers[getRandomNumber(0,allNumbers.length)];
                        characterCharisma = randomStat;
                        allNumbers = allNumbers.filter(number => number !==randomStat);
                    }
                    character.setCharisma(characterCharisma);

                    let characterNerves = 0;
                    if(document.querySelector('input[name="data-createCharacterNerves"]:checked')){
                        characterNerves = Number(document.querySelector('input[name="data-createCharacterNerves"]:checked').value);
                        allNumbers = allNumbers.filter(number => number !==characterNerves);
                    }else{
                        const randomStat = allNumbers[getRandomNumber(0,allNumbers.length)];
                        characterNerves = randomStat;
                        allNumbers = allNumbers.filter(number => number !==randomStat);
                    }
                    character.setNerves(characterNerves);

                    character.setStats(characterIntellect,characterCharisma,characterNerves);

                //#endregion
                document.querySelector("#landingPage").style.display = "none";
                document.querySelector("#randomCharacterPage").style.display = "block";
                document.querySelector("#createCharacterPage").style.display = "none";
            });
        //#endregion
    //#endregion
//#endregion
//#region create Ship Page
    //#region setup Fields
        //#region image
            let randomShipImageValue = getRandomNumber(1,101);
            const randomShipImage = document.querySelector("#data-randomShipImage");
            randomShipImage.src = randomShipImage.src.replace(/(\d+)(?!.*\d)/, randomShipImageValue);
        //#endregion
        //#region name 
            const randomShipNameSelection = document.querySelector("#randomShipNameSelection");
            randomShipNameSelection.style.boxShadow = "0 0 15px 5px #8d75d3";
            const randomShipNameInput = document.querySelector("#randomShipNameInput");
            const randomShipNames = getDifferentElements(gameData.shipName,8);
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
            const randomSpecialFeatures = getDifferentElements(gameData.shipFeature,8);
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
            const randomShipProblems = getDifferentElements(gameData.shipProblem,8);
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
            if(randomShipImageValue === 1) randomShipButtonLeft.src = "./images/arrow-images/left-arrow-0.png";
            randomShipButtonLeft.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomShipImageValue-1)<=0)){
                    randomShipImageValue -=1;
                    if(randomShipImageValue === 1) {
                        randomShipButtonLeft.src = "./images/arrow-images/left-arrow-0.png";
                        randomShipButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    }else{
                        randomShipButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        randomShipButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    } 
                    randomShipImage.src = randomShipImage.src.replace(/(\d+)(?!.*\d)/, randomShipImageValue);
                }
            });

            const randomShipButtonRight = document.querySelector("#randomShipButtonRight");
            if(randomShipImageValue === 100) randomShipButtonRight.src = "./images/arrow-images/right-arrow-0.png";
            randomShipButtonRight.addEventListener("click",(event)=>{
                event.preventDefault();
                if(!((randomShipImageValue+1)>100)){
                    randomShipImageValue +=1;
                    if(randomShipImageValue === 100) {
                        randomShipButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        randomShipButtonRight.src = "./images/arrow-images/right-arrow-0.png";
                    }else{
                        randomShipButtonLeft.src = "./images/arrow-images/left-arrow-1.png";
                        randomShipButtonRight.src = "./images/arrow-images/right-arrow-1.png";
                    } 
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
        //#region backMainMenu
            const backMainMenuButtons = document.querySelectorAll("#backMainMenuButton");
            backMainMenuButtons.forEach(button =>{
                button.addEventListener("click",(event)=>{
                    event.preventDefault();
                    document.querySelector("#landingPage").style.display = "block";
                    document.querySelector("#randomCharacterPage").style.display = "none";
                    document.querySelector("#createCharacterPage").style.display = "none";
                });
            })
        //#endregion
        //#region submitButton
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