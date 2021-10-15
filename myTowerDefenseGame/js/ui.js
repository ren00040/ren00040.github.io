/*
 * @Date: 2021-10-09 23:51:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-14 23:30:50
 * @FilePath: /myTowerDefenseGame/js/ui.js
 */

const flags = document.querySelectorAll(".flag");

// Create towerSelectPanel
const towerSelectPanel = document.createElement("div");
towerSelectPanel.setAttribute("id","tower-select-panel");
towerSelectPanel.setAttribute("class","tower-select-panel");
towerSelectPanel.style.position = "absolute";

const towerSelectPanelContent = `
    <button><img src = "./resource/archer/archer1.png"></button>
    <button><img src = "./resource/warior/warior1.png"></button>
`;

towerSelectPanel.innerHTML = towerSelectPanelContent;

// set panel postion
const towerSelectPanelPosition = [500, 50];

towerSelectPanel.style.left = positionFix(towerSelectPanelPosition[0], towerSelectPanelPosition[1])[0]+"px";
towerSelectPanel.style.top = positionFix(towerSelectPanelPosition[0], towerSelectPanelPosition[1])[1]+"px";

// Draw the towerSelectPanel
document.querySelector("body").append(towerSelectPanel);

// tower select buttion event 
const towerSelectBTN = towerSelectPanel.querySelectorAll("button");

/* 
 * tower type (key): 0-archer, 1-warior
 */
let towerType;
for (const [key , btnValue] of towerSelectBTN.entries()) {
    btnValue.value = false;
    btnValue.setAttribute("class","towerType"+key);
    btnValue.style.background = "grey";
    btnValue.onclick = function() {
        // Change the cursor to the selected tower 
        switch(key){
            case 0:
            document.querySelector("body").style.cursor = "url(./resource/archer/archer1.png) 32 32,pointer";
            towerType = "archer";
            break;

            case 1:
            document.querySelector("body").style.cursor = "url(./resource/warior/warior1.png) 32 32,pointer";
            towerType = "warior";
            break;
        }
        SelectTower(btnValue);
    }
}

// Click button to select a tower to settle
function SelectTower(btn) {
    if(btn.value == "false") {
        // unSelect all buttons
        towerSelectBTN.forEach(element => {
            element.value = false;
            element.style.background = "grey";
        });
    
        // select this button
        btn.value = true;
        btn.style.background = "red";
        // TODO highlight the places which can be settled    
        HightlightFlag();
    }else {
        towerSelectBTN.forEach(element => {
            element.value = false;
            element.style.background = "grey";
        });
        DisHighlightFlag();
    }
}

function unselectTower() {
    for (const [key , btnValue] of towerSelectBTN.entries()) {
        btnValue.value = false;
        btnValue.style.background = "grey";
    }
    // dishightlight when player cancels the select BTN
    DisHighlightFlag();
}

function HightlightFlag() {
    flags.forEach(flag => {
        if(flag.dataset.placeable === "true"){
            flag.src = "./resource/settlement-highlight.png";
            flag.dataset.isHighlight = true;
        }
    });
}

/* 
 * if cancel the tower select button Dis-Highlight all flags 
 * change the img and set isHightlight to "false"
*/
function DisHighlightFlag() {
    flags.forEach(flag => {
        if(flag.dataset.placeable === "true"){
            flag.src = "./resource/settlement.png";
            flag.dataset.isHighlight = false;
        }
    });
    // Change the cursor to default 
    document.querySelector("body").style.cursor = "default";
}

/* 
 * Settle a Tower
 * If settle a tower then turn off "placeable" 
*/
function SettleTower(flag) {    
    if(flag.dataset.placeable == "true" && flag.dataset.isHighlight == "true") {                
        // remove the flag
        flag.remove();

        // unselect the tower select panel
        unselectTower();
        
        DrawTower(flag,towerType);

        flag.dataset.placeable = false;
        // Change the cursor to default 
        document.querySelector("body").style.cursor = "default";
    }else{
        console.log("can't settle!");
    }

}

// Gold and Gems panel
const playerPanel = document.createElement("div");
playerPanel.setAttribute("id","player-panel");
playerPanel.setAttribute("class","player-panel");

document.querySelector("body").append(playerPanel);
const playerPanelContent = `
    <div>Gems: ${game.gems}</div>
    <div class = "gold">Gold: ${stageData.gold}</div>
`;
playerPanel.innerHTML = playerPanelContent;