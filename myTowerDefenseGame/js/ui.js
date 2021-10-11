/*
 * @Date: 2021-10-09 23:51:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-10 22:02:56
 * @FilePath: /myTowerDefenseGame/js/ui.js
 */

// Convert the browser coordinates to the canvs coordinates
function positionFix(x,y) {
    let offset= [innerWidth/2,innerHeight/2];

    offset[0] = offset[0] - 350 + x;
    offset[1] = offset[1] - 300 + y;

    return offset;
}

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
towerSelectBTN.forEach(element => {
    element.value = false;

    element.onclick = function() {
        SettleTower(element);
        // TODO highlight the places which can be settled
        
    }
});

// Click button to select a tower to settle
function SettleTower(btn) {
    if(btn.value) {
        // unSelect all buttons
        towerSelectBTN.forEach(element => {
            element.value = false;
            element.style.background = "green";
        })

        // select this button
        btn.value = true;
        btn.style.background = "red";
    }    
}