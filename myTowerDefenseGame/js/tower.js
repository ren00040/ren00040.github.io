/*
 * @Date: 2021-10-06 23:05:22
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-09 23:47:34
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

// Initialize the tower map canvas
const towerCanvas = document.querySelector("#canvas02");
const towerCTX = towerCanvas.getContext("2d");

// set the size of towerCanvas
towerCanvas.width = 700;
towerCanvas.height = 600;

// set tower's font
towerCTX.font = "bold 12px serif";
towerCTX.fillStyle = "red";


function drawFlags() {
    // Create a flage img container
    const settlementFlag = [];
    
    // uns entries returen a new array iterator obj which contains the key/value pairs for each index in settlementPosition
    for (const [key , value] of settlementPosition.entries()) {
    
        settlementFlag[key] = new Image();
        settlementFlag[key].src = "./resource/settlement.png";
    
        settlementFlag[key].onload = function() {
            towerCTX.drawImage(settlementFlag[key], value[0], value[1]);
        }
    }
}


// Draw a tower by name and position x/y 
function drawTower(name,x,y) {
    // create a tower and set the parameter
    const tower = new Tower(name, "single", 40, 3, 5, 1, new Image());
    tower.img.src = "./resource/"+name+"/"+name+"1.png";
    
    // draw the tower's sprite
    tower.img.onload = function() {
        towerCTX.drawImage(tower.img, x, y);
    }
    
    // draw the tower's name
    towerCTX.fillText(tower.name, x+2, y+32);
}


// test create a tower by html
const testTower = new Tower("archer", "single", 40, 3, 5, 1, new Image());
const testTowerContent = `
    <img src = "./resource/archer/archer1.png">
    <div>${testTower.name}</div>
`;

/* 
 * initial the tower style
 * put the tower in the center of the map
 */
const towerElement = document.createElement("div");
towerElement.classList.add("tower","archer");
towerElement.style.position = "absolute";
towerElement.style.top = "50%";
towerElement.style.left = "50%";

// draw the tower
towerElement.innerHTML = testTowerContent;

// click the tower
towerElement.addEventListener(
    "click",
    function(){
        Upgrade(this);
    }
);

document.querySelector("body").append(towerElement);

/*
 * If the gold enough to upgrade shows the upgrade icon
 */
function Upgrade(elemnet) {
    if(elemnet.classList.contains("archer")){
        if(stageData.gold >= towerUpgradeGold[1][1]) {
            console.log("upgrade archer");
        }
    }
}