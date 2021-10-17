/*
 * @Date: 2021-10-06 23:05:22
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-16 23:45:13
 * @FilePath: /myTowerDefenseGame/js/tower.js
 */

class Tower {
    constructor(
        name,
        type,
        range,
        minDamage,
        maxDamage,
        level,
        img,
    ){
        this.name = name;
        this.type = type;
        this.range = range;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.level = level;
        this.img = img;
    }
}

// Create a flag img and container
const flag = [];
const flagContainer = document.createElement("div");
flagContainer.setAttribute("id","flag-Container");

document.querySelector("body").append(flagContainer);

// draw the flags use the positon from data.js --> settlementPostion
for (const [key , value] of settlementPosition.entries()) {
    flag[key] = new Image();
    flag[key].setAttribute("id","flag"+key);
    flag[key].setAttribute("class","flag");

    // Set the parameter "placeable" to determine whether the tower can be placed
    flag[key].dataset.placeable = true;
    flag[key].dataset.isHighlight = false;

    // Style the flag
    flag[key].style.position = "absolute";
    flag[key].src = "./resource/settlement.png";

    // use positionFix() to set the flag's position
    flag[key].style.left = positionFix(value[0], value[1])[0] + "px";
    flag[key].style.top = positionFix(value[0], value[1])[1] + "px";

    // draw the flag
    flagContainer.append(flag[key]);

    flag[key].addEventListener(
        "click",
        function(){
            settleTower(flag[key])
        }
    );
}

function drawTower(theFlag,towerType) {
    // fix the tower's position base on the flag
    // issue fixed https://app.gitbook.com/s/-MR93ctAFfSCsQwng6wL/js/operator
    let fixY = Number(theFlag.style.top.replace('px','')) + Number(40);
    let positionX = theFlag.style.left;
    let positionY = fixY + "px";

    // set the tower's default attack type 
    let attackType;
    let range;

    // set all the parameters based on the tower type
    switch(towerType) {
        case "archer":
            attackType = "single";
            range = 80;
            break;
        case "warior":
            attackType = "aoe";
            range = 40;
            break;
    }

    // create a tower by html
    const newTower = new Tower(towerType, attackType, range, 3, 5, 1, new Image());
    const newTowerContent = `
        <img src = "./resource/${towerType}/${towerType}1.png">
        <div>${newTower.name}</div>
    `;
    
    /* 
     * initial the tower style
     * put the tower in the center of the map
     */
    const towerElement = document.createElement("div");
    towerElement.classList.add("tower",towerType);
    towerElement.style.position = "absolute";
    towerElement.style.top = positionY;
    towerElement.style.left = positionX;
    
    // click the tower
    towerElement.addEventListener(
        "click",
        function(){
            towerUpgrade(this);
        }
    );
    
    // draw the tower
    towerElement.innerHTML = newTowerContent;
    document.querySelector("body").append(towerElement);

    drawTowerRange(newTower, positionX, positionY);
}

// Draw the tower's range
function drawTowerRange(newTower, positionX, positionY) {

    // change the positon to numbers
    let offestX = positionX.replace("px","");
    offestX = Number(offestX);
    let offestY = positionY.replace("px","")
    offestY = Number(offestY);

    // coordinate conversion: change the position to the canvas coordination
    // fix the circle center
    let x = positionFixBack(offestX,offestY)[0] + 18;
    let y = positionFixBack(offestX,offestY)[1] + 14;
    
    // set battleMap alpha
    battleCTX.globalAlpha = 0.5;

    // draw the tower range
    battleCTX.beginPath();
    battleCTX.arc(x, y, newTower.range, 0, 2 * Math.PI);
    battleCTX.stroke();

    console.log(x, y);
}

/*
 * If the gold enough to upgrade shows the upgrade icon
 */
function towerUpgrade(elemnet) {
    if(elemnet.classList.contains("archer")){
        if(stageData.gold >= towerUpgradeGold[1][1]) {
            stageData.gold -= towerUpgradeGold[1][1];
        }
    }   
}