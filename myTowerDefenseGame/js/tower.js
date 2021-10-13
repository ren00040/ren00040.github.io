/*
 * @Date: 2021-10-06 23:05:22
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-12 23:28:34
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
            SettleTower(flag[key])
        }
    );
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
