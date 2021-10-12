/*
 * @Date: 2021-10-09 23:51:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-11 23:39:51
 * @FilePath: /myTowerDefenseGame/js/ui.js
 */

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
for (const [key , btnValue] of towerSelectBTN.entries()) {
    btnValue.value = false;
    btnValue.setAttribute("class","towerType"+key);
    btnValue.onclick = function() {
        SelectTower(btnValue);
        // Change the cursor to the selected tower 
        switch(key){
            case 0:
            document.querySelector("body").style.cursor = "url(./resource/archer/archer1.png) 32 32,pointer";
            break;

            case 1:
            document.querySelector("body").style.cursor = "url(./resource/warior/warior1.png) 32 32,pointer";
            break;
        }
        // TODO highlight the places which can be settled    
        HightlightFlag();
    }
}

// Click button to select a tower to settle
function SelectTower(btn) {
    // unSelect all buttons
    towerSelectBTN.forEach(element => {
        element.value = false;
        element.style.background = "green";
    });

    // select this button
    btn.value = true;
    btn.style.background = "red";
}

function HightlightFlag() {
    console.log("HightlightFlag");
    const flags = document.querySelectorAll(".flag");
    flags.forEach(element => {
        element.src = "./resource/settlement-highlight.png";
    });
}