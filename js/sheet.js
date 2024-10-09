import { Character } from "./character.js";
async function loadData() {
  const characterData = localStorage.getItem(`character`);
  if (characterData) {
    //#region processData
    const parsedCharacter = JSON.parse(characterData);
    const character = new Character()
      .setName(parsedCharacter.name)
      .setImage(parsedCharacter.image)
      .setRole(parsedCharacter.role)
      .setExpertise(parsedCharacter.expertise)
      .setPower(parsedCharacter.power)
      .setFlaw(parsedCharacter.flaw)
      .setBehavior(parsedCharacter.behavior)
      .setBackground(parsedCharacter.background)
      .setLooks(parsedCharacter.looks)
      .setBackstory(parsedCharacter.backstory)
      .setDescription(parsedCharacter.description)
      .setCredit(parsedCharacter.credit)
      .setItems(parsedCharacter.items)
      .setIntellect(parsedCharacter.intellect)
      .setCharisma(parsedCharacter.charisma)
      .setNerves(parsedCharacter.nerves)
      .setStats(
        parsedCharacter.intellect,
        parsedCharacter.charisma,
        parsedCharacter.nerves
      )
      .setMoxie(parsedCharacter.moxie)
      .setConditions(parsedCharacter.conditions)
      .setHeat(parsedCharacter.heat)
      .setShipName(parsedCharacter.shipName)
      .setShipFeature(parsedCharacter.shipFeature)
      .setShipProblem(parsedCharacter.shipProblem)
      .setShipImage(parsedCharacter.shipImage)
      .setModules(parsedCharacter.shipModules)
      .setCargos(parsedCharacter.shipCargos)
      .setLogs(parsedCharacter.logs);
    //#endregion
    //#region showDataOnWindow
    //#region load text
    const textConfig = [
      { label: "name", path: "characterName" },
      { label: "role", path: "characterRole" },
      { label: "expertise", path: "characterExpertise" },
      { label: "power", path: "characterPower" },
      { label: "flaw", path: "characterFlaw" },
      { label: "description", path: "characterDescription" },
      { label: "credit", path: "characterCredit" },
      { label: "intellect", path: "characterIntellect" },
      { label: "charisma", path: "characterCharisma" },
      { label: "nerves", path: "characterNerves" },
      { label: "moxie", path: "characterMoxie" },
      { label: "conditions", path: "characterConditions" },
      { label: "shipName", path: "shipName" },
      { label: "shipFeature", path: "shipSpecialFeature" },
      { label: "shipProblem", path: "shipProblem" },
      { label: "logs", path: "characterLogs" },
    ];
    for (const element of textConfig) {
      let el = document.querySelector(`#data-${element.path}`);
      el.textContent = character[`${element.label}`];
    }
    //#endregion
    //#region load images
    const imageConfig = [
      { label: "heat", path: "heatImage" },
      { label: "image", path: "characterImage" },
      { label: "shipImage", path: "shipImage" },
    ];
    for (const element of imageConfig) {
      let el = document.querySelector(`#data-${element.path}`);
      el.src = el.src.replace(/(\d+)(?!.*\d)/, character[`${element.label}`]);
    }
    //#endregion
    //#region load inventory
    const inventoryHolder = document.querySelector("#inventoryHolder");
    let lastSide = "leftBasedItem";
    let lastID = 0;
    for (const item of character.items) {
      item.id = ++lastID;
      //#region createHTML
      lastSide =
        lastSide === "rightBasedItem" ? "leftBasedItem" : "rightBasedItem";
      const divInventoryItem = document.createElement("div");
      divInventoryItem.className = "inventoryItem";
      divInventoryItem.id = lastSide;

      // Create the deleteButtonHolder div
      const divItemDeleteHolder = document.createElement("div");
      divItemDeleteHolder.className = "itemDeleteHolder";
      divItemDeleteHolder.oncontextmenu = () => {
        return false;
      };
      // Create the itemClockContainer div
      const divItemClockContainer = document.createElement("div");
      divItemClockContainer.className = "itemClockContainer";

      // Create the itemClockBorder div
      const divItemClockBorder = document.createElement("div");
      divItemClockBorder.className = "itemClockBorder";

      // Create the button
      const buttonItemClock = document.createElement("button");
      buttonItemClock.id = "data-itemClock";
      buttonItemClock.oncontextmenu = () => {
        return false;
      };
      buttonItemClock.style.backgroundImage = `url('/images/clock-images/${item.clockType}x-clock/clock-stage-${item.clockStage}.png')`;

      // Append the clockBorder and button to itemClockContainer
      divItemClockContainer.appendChild(divItemClockBorder);
      divItemClockContainer.appendChild(buttonItemClock);

      // Create the itemDataHolder div
      const divItemDataHolder = document.createElement("div");
      divItemDataHolder.className = "itemDataHolder";

      // Create the itemName p element
      const pItemName = document.createElement("p");
      pItemName.id = "data-itemName";
      pItemName.textContent = item.name;

      // Create the itemTags p element
      const pItemTags = document.createElement("p");
      pItemTags.id = "data-itemTags";
      pItemTags.textContent = item.tag;

      // Append the p elements to itemDataHolder
      divItemDataHolder.appendChild(pItemName);
      divItemDataHolder.appendChild(pItemTags);

      // Append itemClockContainer and itemDataHolder to inventoryItem div
      divInventoryItem.appendChild(divItemDeleteHolder);
      divInventoryItem.appendChild(divItemClockContainer);
      divInventoryItem.appendChild(divItemDataHolder);

      inventoryHolder.appendChild(divInventoryItem);
      //#endregion
      //#region add Event Listeners
      buttonItemClock.addEventListener("mousedown", (event) => {
        event.preventDefault();
        let value;
        if (event.button === 0) {
          value = 1;
        } else if (event.button === 1) {
          value = 0;
          item.clockStage = 0;
        } else if (event.button === 2) {
          value = -1;
        }
        item.clockStage += value;
        if (item.clockStage <= 0) item.clockStage = 0;
        if (item.clockStage >= item.clockType + 1)
          item.clockStage = item.clockType;
        buttonItemClock.style.backgroundImage = `url('/images/clock-images/${item.clockType}x-clock/clock-stage-${item.clockStage}.png')`;
      });

      divItemDeleteHolder.addEventListener("click", (event) => {
        event.preventDefault();
        let updatedItems = character.items.filter((originalItem) => {
          if (originalItem.id !== item.id) {
            return originalItem;
          }
        });
        character.setItems(updatedItems);
        localStorage.setItem("character", JSON.stringify(character));
        location.reload();
      });
      //#endregion
    }

    //#endregion
    //#region load modules
        for (let index = 0; index < 6; index++) {
            let moduleContainer = (index%2) === 0 ? document.querySelector(".leftModuleSection") : document.querySelector(".rightModuleSection");
            let moduleSide = (index%2) === 0 ? "leftBasedItem" : "rightBasedItem" ;
            if(character.shipModules[index]){
                //#region create HTML
                    const shipModule = character.shipModules[index];
                    // Create a div with class 'shipModule' and id 'rightBasedItem'
                    const shipModuleContainer = document.createElement('div');
                    shipModuleContainer.classList.add('shipModule');
                    shipModuleContainer.id = moduleSide;

                    // Create the deleteButtonHolder div
                    const divModuleDeleteHolder = document.createElement("div");
                    divModuleDeleteHolder.className = "moduleDeleteHolder";
                    divModuleDeleteHolder.oncontextmenu = () => {
                        return false;
                    };

                    // Create the container div for clock
                    const moduleClockContainer = document.createElement('div');
                    moduleClockContainer.classList.add('moduleClockContainer');

                    // Create the div for clock border
                    const moduleClockBorder = document.createElement('div');
                    moduleClockBorder.classList.add('moduleClockBorder');

                    // Create the button with id 'data-moduleClock'
                    const moduleClockButton = document.createElement('button');
                    moduleClockButton.id = 'data-moduleClock';
                    moduleClockButton.oncontextmenu = () => {
                        return false;
                    };
                    moduleClockButton.style.backgroundImage = `url('/images/clock-images/${shipModule.clockType}x-clock/clock-stage-${shipModule.clockStage}.png')`;


                    // Append the clock border and button to the clock container
                    moduleClockContainer.appendChild(moduleClockBorder);
                    moduleClockContainer.appendChild(moduleClockButton);

                    // Create the div for data holder
                    const moduleDataHolder = document.createElement('div');
                    moduleDataHolder.classList.add('moduleDataHolder');

                    // Create the paragraph for module name with id 'data-moduleName'
                    const moduleName = document.createElement('p');
                    moduleName.id = 'data-moduleName';
                    moduleName.textContent = shipModule.name;  // Set dynamically if needed

                    // Create the paragraph for module tags with id 'data-moduleTags'
                    const moduleTags = document.createElement('p');
                    moduleTags.id = 'data-moduleTags';
                    moduleTags.textContent = shipModule.tag;  // Set dynamically if needed

                    // Append the module name and tags to the data holder
                    moduleDataHolder.appendChild(moduleName);
                    moduleDataHolder.appendChild(moduleTags);

                    // Append all the elements to the shipModule
                    shipModuleContainer.appendChild(divModuleDeleteHolder);
                    shipModuleContainer.appendChild(moduleClockContainer);
                    shipModuleContainer.appendChild(moduleDataHolder);

                    // Finally, append the shipModule to the body or another container element in your HTML
                    moduleContainer.appendChild(shipModuleContainer);  // Or use any specific container
                //#endregion
                //#region add Event Listeners 
                    moduleClockButton.addEventListener("mousedown", (event) => {
                        event.preventDefault();
                        let value;
                        if (event.button === 0) {
                          value = 1;
                        } else if (event.button === 1) {
                          value = 0;
                          shipModule.clockStage = 0;
                        } else if (event.button === 2) {
                          value = -1;
                        }
                        shipModule.clockStage += value;
                        if (shipModule.clockStage <= 0) shipModule.clockStage = 0;
                        if (shipModule.clockStage >= shipModule.clockType + 1)
                            shipModule.clockStage = shipModule.clockType;
                        moduleClockButton.style.backgroundImage = `url('/images/clock-images/${shipModule.clockType}x-clock/clock-stage-${shipModule.clockStage}.png')`;
                    });
                    divModuleDeleteHolder.addEventListener("click",(event)=>{
                        event.preventDefault();
                        let updatedModules = character.shipModules.filter((originalModule) => {
                            if (originalModule.id !== shipModule.id) {
                                return originalModule;
                            }
                        });
                        character.setModules(updatedModules);
                        localStorage.setItem("character", JSON.stringify(character));
                        location.reload();
                    });

                //#endregion
            }else{
                // Create a div with class 'shipModule' and id 'leftBasedItem'
                const shipModule = document.createElement('div');
                shipModule.classList.add('shipModule');
                shipModule.id = moduleSide;

                 // Create the deleteButtonHolder div
                 const divModuleDeleteHolder = document.createElement("div");
                 divModuleDeleteHolder.style.width = "60px";
                 divModuleDeleteHolder.style.height = "25px";
                 divModuleDeleteHolder.style.margin = "auto -1.275rem"
                 divModuleDeleteHolder.oncontextmenu = () => {
                     return false;
                 };
                // Create the container div for clock
                const moduleClockContainer = document.createElement('div');
                moduleClockContainer.classList.add('moduleClockContainer');

                // Create the div for clock border
                const moduleClockBorder = document.createElement('div');
                moduleClockBorder.classList.add('moduleClockBorder');

                // Create the button with id 'data-moduleClock'
                const moduleClockButton = document.createElement('button');
                moduleClockButton.id = 'data-moduleClock';
                moduleClockButton.oncontextmenu = () => {
                    return false;
                };
                moduleClockButton.addEventListener("click",(event)=>{
                    event.preventDefault();
                    document.querySelector(".modalArea").style.display = "unset";
                    let newModuleID = 1;
                    if(character.shipModules[character.shipModules.length -1 ]){
                        newModuleID = character.shipModules[character.shipModules.length -1 ].id +1;
                    }
                    createModalContent("module",(name, tag, clockType)=>{
                        character.setModules([
                            ...character.shipModules,
                            {
                                id : newModuleID,
                                name,
                                tag,
                                clockType,
                                clockStage : 0
                            }
                        ]);
                        localStorage.setItem("character", JSON.stringify(character));
                    });
                });

                // Append the clock border and button to the clock container
                moduleClockContainer.appendChild(moduleClockBorder);
                moduleClockContainer.appendChild(moduleClockButton);

                // Create the div for data holder
                const moduleDataHolder = document.createElement('div');
                moduleDataHolder.classList.add('moduleDataHolder');

                // Create the paragraph for empty module with id 'emptyModule'
                const emptyModule = document.createElement('p');
                emptyModule.id = 'emptyModule';
                emptyModule.textContent = 'Empty Module';  // You can set the module text dynamically

                // Append the empty module to the data holder
                moduleDataHolder.appendChild(emptyModule);

                // Append all the elements to the shipModule
                shipModule.appendChild(divModuleDeleteHolder);
                shipModule.appendChild(moduleClockContainer);
                shipModule.appendChild(moduleDataHolder);

                // Finally, append the shipModule to the body or another container element in your HTML
                moduleContainer.appendChild(shipModule);  // Or use any specific container

            }
        }
    //#endregion
    //#region load cargo
        for (let index = 0; index < character.shipCargos.length; index++) {
            let shipCargo = character.shipCargos[index];
            let cargoContainer = (index%2) === 0 ? document.querySelector("#leftCargoContainer") : document.querySelector("#rightCargoContainer");
            let cargoSide = (index%2) === 0 ? "leftBasedItem" : "rightBasedItem";
            //#region create HTML
                const divCargoModule = document.createElement("div");
                divCargoModule.className = "cargoModule";
                divCargoModule.id = cargoSide;

                // Create the deleteButtonHolder div
                const divCargoDeleteHolder = document.createElement("div");
                divCargoDeleteHolder.className = "cargoDeleteHolder";
                divCargoDeleteHolder.oncontextmenu = () => {
                    return false;
                };
                // Create the itemClockContainer div
                const divCargoClockContainer = document.createElement("div");
                divCargoClockContainer.className = "cargoClockContainer";

                // Create the button
                const buttonCargoClock = document.createElement("button");
                buttonCargoClock.id = "data-cargoClock";
                buttonCargoClock.oncontextmenu = () => {
                    return false;
                };
                buttonCargoClock.style.backgroundImage = `url('/images/clock-images/${shipCargo.clockType}x-clock/clock-stage-${shipCargo.clockStage}.png')`;

                // Append the clockBorder and button to itemClockContainer
                divCargoClockContainer.appendChild(buttonCargoClock);

                // Create the itemDataHolder div
                const divCargoDataHolder = document.createElement("div");
                divCargoDataHolder.className = "cargoDataHolder";

                // Create the itemName p element
                const pCargoName = document.createElement("p");
                pCargoName.id = "data-cargoName";
                pCargoName.textContent = shipCargo.name;

                // Create the itemTags p element
                const pCargoTags = document.createElement("p");
                pCargoTags.id = "data-cargoTags";
                pCargoTags.textContent = shipCargo.tag;

                // Append the p elements to itemDataHolder
                divCargoDataHolder.appendChild(pCargoName);
                divCargoDataHolder.appendChild(pCargoTags);

                // Append itemClockContainer and itemDataHolder to inventoryItem div
                divCargoModule.appendChild(divCargoDeleteHolder);
                divCargoModule.appendChild(divCargoClockContainer);
                divCargoModule.appendChild(divCargoDataHolder);

                cargoContainer.appendChild(divCargoModule);
            //#endregion
            //#region add Event Listeners
                buttonCargoClock.addEventListener("mousedown",(event)=>{
                    event.preventDefault();
                        let value;
                        if (event.button === 0) {
                          value = 1;
                        } else if (event.button === 1) {
                          value = 0;
                          shipCargo.clockStage = 0;
                        } else if (event.button === 2) {
                          value = -1;
                        }
                        shipCargo.clockStage += value;
                        if (shipCargo.clockStage <= 0) shipCargo.clockStage = 0;
                        if (shipCargo.clockStage >= shipCargo.clockType + 1)
                            shipCargo.clockStage = shipCargo.clockType;
                        buttonCargoClock.style.backgroundImage = `url('/images/clock-images/${shipCargo.clockType}x-clock/clock-stage-${shipCargo.clockStage}.png')`;
                });
                divCargoDeleteHolder.addEventListener("click",(event)=>{
                    event.preventDefault();
                    let updatedCargos = character.shipCargos.filter((originalCargo) => {
                        if (originalCargo.id !== shipCargo.id) {
                            return originalCargo;
                        }
                    });
                    character.setCargos(updatedCargos);
                    localStorage.setItem("character", JSON.stringify(character));
                    location.reload();
                });
            //#endregion
        }
    //#endregion
    //#endregion
    return character;
  } else {
    alert("Create a character first");
  }
}
const character = await loadData();

//#region handleEvents
//#region Inventory
//#region Credits
const creditButton = document.querySelector("#data-creditImage");
const characterCredit = document.querySelector("#data-characterCredit");
creditButton.addEventListener(`mousedown`, (event) => {
  event.preventDefault();
  let value = 1;
  if (event.button === 0) {
    value = 1;
  } else if (event.button === 1) {
    value = 0;
    character.setCredit(0);
  } else if (event.button === 2) {
    value = -1;
  }
  if (event.ctrlKey) value *= 10;
  let finalCredit = character.credit + value;
  if (finalCredit <= 0) finalCredit = 0;
  characterCredit.textContent = finalCredit;
  character.setCredit(finalCredit);
});
//#endregion
//#region Items
const addItemButton = document.querySelector("#inventoryAddItemButton");
addItemButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".modalArea").style.display = "unset";
  createModalContent("item", (name, tag, clockType) => {
    character.setItems([
      ...character.items,
      {
        id: 0,
        name,
        tag,
        clockType,
        clockStage: 0,
      },
    ]);
    localStorage.setItem("character", JSON.stringify(character));
  });
});

const reloadInventoryButton = document.querySelector("#inventoryReloadItemButton");
if(character.items[0]){
  reloadInventoryButton.style.display = "block";
  reloadInventoryButton.addEventListener("click", (event) => {
      event.preventDefault();
      character.items.forEach((item) => {
        item.clockStage = 0;
      });
      localStorage.setItem("character", JSON.stringify(character));
      location.reload();
  });
}
//#endregion
//#endregion
//#region stats
  const statNames = document.querySelectorAll("#statName");
  statNames.forEach((statName) => {
    statName.addEventListener("mousemove", (event) => {
      infoMessage.style.display = "block";
      infoMessage.style.left = event.pageX + "px";
      infoMessage.style.top = event.pageY + "px";
      infoMessage.textContent = statName.getAttribute("data-description");
    });
    statName.addEventListener("mouseout", (event) => {
      infoMessage.style.display = "none";
    });
  });

  const directAttributes = document.querySelectorAll(".directAttribute > p");
  directAttributes.forEach((directAttribute)=>{
    directAttribute.addEventListener("mousemove", (event) => {
      infoMessage.style.display = "block";
      infoMessage.style.width = "4.25vw";
      infoMessage.style.left = event.pageX + "px";
      infoMessage.style.top = event.pageY + "px";
      infoMessage.textContent = directAttribute.getAttribute("data-description");
    });
    directAttribute.addEventListener("mouseout", (event) => {
      infoMessage.style.display = "none";
      infoMessage.style.width = "20vw";
    });
  });
  const adaptiveAttributes = document.querySelectorAll(".adaptiveAttribute > p");
  adaptiveAttributes.forEach((adaptiveAttribute)=>{
    adaptiveAttribute.addEventListener("mousemove", (event) => {
      infoMessage.style.display = "block";
      infoMessage.style.width = "4.5vw";
      infoMessage.style.left = event.pageX + "px";
      infoMessage.style.top = event.pageY + "px";
      infoMessage.textContent = adaptiveAttribute.getAttribute("data-description");
    });
    adaptiveAttribute.addEventListener("mouseout", (event) => {
      infoMessage.style.display = "none";
      infoMessage.style.width = "20vw";
    });
  });
//#endregion
//#region Moxie
const decrMoxieButtons = document.querySelectorAll("#moxeiDecreseButton");
const moxie = document.querySelector("#data-characterMoxie");
const refreshMoxie = document.querySelector("#moxeiRefreshButton");
for (const button of decrMoxieButtons) {
  button.addEventListener("mousedown", (event) => {
    event.preventDefault();
    let value = character.moxie - 1;
    if (value <= 0) value = 0;
    moxie.textContent = value;
    character.setMoxie(value);
  });
  button.addEventListener('mousemove',(event)=>{
    infoMessage.style.display = 'block';
    infoMessage.style.left = event.pageX + 'px';
    infoMessage.style.top = event.pageY + 'px';
    infoMessage.textContent = button.getAttribute("data-description");
  });
  button.addEventListener('mouseout',(event)=>{
      infoMessage.style.display = 'none';
  });
}
refreshMoxie.addEventListener("mousedown", (event) => {
  event.preventDefault();
  moxie.textContent = 3;
  character.setMoxie(3);
});
refreshMoxie.addEventListener('mousemove',(event)=>{
  infoMessage.style.display = 'block';
  infoMessage.style.left = event.pageX + 'px';
  infoMessage.style.top = event.pageY + 'px';
  infoMessage.textContent = refreshMoxie.getAttribute("data-description");
});
refreshMoxie.addEventListener('mouseout',(event)=>{
    infoMessage.style.display = 'none';
});
//#endregion
//#region Heat
const heatImg = document.querySelector(`#data-heatImage`);
heatImg.addEventListener(`mousedown`, (event) => {
  let value = 0;
  if (event.button === 0) {
    value = character.heat + 1;
    if (value >= 9) {
      value = 8;
    }
  } else if (event.button === 1) {
    event.preventDefault();
    value = 0;
  } else if (event.button === 2) {
    event.preventDefault();
    value = character.heat - 1;
    if (value <= 0) {
      value = 0;
    }
  }
  heatImg.src = `/images/heat-images/heat-stage-${value}.png`;
  character.setHeat(value);
  console.log(character.heat);
});
//#endregion
//#region Notes
const characterConditions = document.querySelector("#data-characterConditions");
const characterLogs = document.querySelector("#data-characterLogs");
characterConditions.addEventListener("input", (event) => {
  character.setConditions(event.target.value);
});
characterLogs.addEventListener("input", (event) => {
  character.setLogs(event.target.value);
});
//#endregion
//#region Save Character
window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    localStorage.setItem("character", JSON.stringify(character));
    alert("Character Saved");
  }
});
//#endregion
//#region Modal
function createModalContent(title, callback) {
  // Create the fieldset
  const modalArea = document.querySelector(".modalArea");
  const fieldset = document.createElement("fieldset");
  fieldset.className = "modalContent";

  // Create the legend and title
  const legend = document.createElement("legend");
  legend.className = "modalTitle";
  const h1Title = document.createElement("h1");
  h1Title.id = "data-modalTitle";
  h1Title.textContent = `New ${title}`.toUpperCase();
  legend.appendChild(h1Title);
  fieldset.appendChild(legend);

  // Create the form
  const form = document.createElement("form");

  // Create the modal section holder (name and tags)
  const sectionHolder = document.createElement("div");
  sectionHolder.className = "modalSectionHolder";

  const nameHolder = document.createElement("div");
  nameHolder.className = "modalSubHolder";
  const h3Name = document.createElement("h3");
  h3Name.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "modalInput";
  nameInput.id = "data-modalName";
  nameInput.required = true;
  nameHolder.appendChild(h3Name);
  nameHolder.appendChild(nameInput);

  const tagHolder = document.createElement("div");
  tagHolder.className = "modalSubHolder";
  const h3Tags = document.createElement("h3");
  h3Tags.textContent = "Tags";
  const tagInput = document.createElement("input");
  tagInput.type = "text";
  tagInput.className = "modalInput";
  tagInput.id = "data-modalTag";
  tagInput.required = true;
  tagHolder.appendChild(h3Tags);
  tagHolder.appendChild(tagInput);

  sectionHolder.appendChild(nameHolder);
  sectionHolder.appendChild(tagHolder);

  // Add section holder to form
  form.appendChild(sectionHolder);

  // Create the radio button holder
  const radioSectionHolder = document.createElement("div");
  radioSectionHolder.className = "modalSectionHolder";
  radioSectionHolder.id = "modelRadioButtonHolder";

  const h1ClockType = document.createElement("h1");
  h1ClockType.textContent = "Clock Type";
  radioSectionHolder.appendChild(h1ClockType);

  const radioButtonSection = document.createElement("div");
  radioButtonSection.className = "modalSectionHolder";

  // Array of clock options
  const clockOptions = [
    {
      id: "radioButton1x",
      value: "1",
      imgUrl: "/images/clock-images/1x-clock/clock-stage-0.png",
    },
    {
      id: "radioButton2x",
      value: "2",
      imgUrl: "/images/clock-images/2x-clock/clock-stage-0.png",
    },
    {
      id: "radioButton4x",
      value: "4",
      imgUrl: "/images/clock-images/4x-clock/clock-stage-0.png",
    },
    {
      id: "radioButton6x",
      value: "6",
      imgUrl: "/images/clock-images/6x-clock/clock-stage-0.png",
    },
    {
      id: "radioButton8x",
      value: "8",
      imgUrl: "/images/clock-images/8x-clock/clock-stage-0.png",
    },
  ];

  // Create radio buttons and labels
  clockOptions.forEach((option) => {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.value = option.value;
    radioButton.name = "itemClockType";
    radioButton.id = option.id;
    radioButton.required = true;

    const label = document.createElement("label");
    label.className = "modalRadioButtonImage";
    label.setAttribute("for", option.id);
    label.style.backgroundImage = `url('${option.imgUrl}')`;

    radioButtonSection.appendChild(radioButton);
    radioButtonSection.appendChild(label);
  });

  radioSectionHolder.appendChild(radioButtonSection);

  // Add radio button holder to form
  form.appendChild(radioSectionHolder);

  // Create the button holder and submit button
  const buttonsHolder = document.createElement("div");
  buttonsHolder.className = "modalButtonsHolder";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.id = "data-modelButton";
  addButton.className = "transmission-button";
  addButton.oncontextmenu = () => {
    return false;
  };
  addButton.textContent = `Add ${title}`;
  addButton.addEventListener("click", (event) => {
    if (
      nameInput.value &&
      tagInput.value &&
      Number(
        document.querySelector('input[name="itemClockType"]:checked').value
      )
    ) {
      callback(
        nameInput.value,
        tagInput.value,
        Number(
          document.querySelector('input[name="itemClockType"]:checked').value
        )
      );
    }
  });

  buttonsHolder.appendChild(addButton);

  // Add buttons holder to form
  form.appendChild(buttonsHolder);

  // Add form to fieldset
  fieldset.appendChild(form);

  // Append the generated modal content to a specific element in your DOM
  modalArea.appendChild(fieldset);
}
//#endregion
//#region ship
    //#region modules
    const reloadModuleButton = document.querySelector("#reloadModuleButton");
    if (character.shipModules[0]) {
      reloadModuleButton.style.display = "block";
      reloadModuleButton.addEventListener("click", (event) => {
        event.preventDefault();
        character.shipModules.forEach((shipModule) => {
          shipModule.clockStage = 0;
        });
        localStorage.setItem("character", JSON.stringify(character));
        location.reload();
      });
    }
    //#endregion
    //#region cargo
    const addCargoButton = document.querySelector("#addCargoButton");
    addCargoButton.addEventListener("click",(event)=>{
        event.preventDefault();
        document.querySelector(".modalArea").style.display = "unset";
        let newCargoId = 1;
        if(character.shipCargos[character.shipCargos.length -1 ]){
            newCargoId = character.shipCargos[character.shipCargos.length -1 ].id +1;
        };
        createModalContent("cargo",(name,tag,clockType)=>{
            character.setCargos([
                ...character.shipCargos,
                {
                  id: newCargoId,
                  name,
                  tag,
                  clockType,
                  clockStage: 0,
                },
              ]);
              localStorage.setItem("character", JSON.stringify(character));
        });
    })
    //#endregion
//#endregion
//#endregion
