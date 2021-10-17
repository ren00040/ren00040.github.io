/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-15 13:42:13
 * @FilePath: /myTowerDefenseGame/js/enemy.js
 */

// Enemy's Class
class Enemy {
    constructor(
        name,
        speed,
        url,
        healPoint,
    ){
        this.name = name;
        this.speed = speed;
        this.url = url;
        this.healPoint = healPoint;
    }
}


// creat the enemy path way
function createPathway(){
    const enemyPath = document.createElement("div");
    enemyPath.setAttribute("id","enemy-path");
    enemyPath.setAttribute("class","enemy-path");
    
    document.querySelector("body").append(enemyPath);
    
    // draw the path
    const waypoint = [];
    for(const [key, position] of pathway.entries()){
    
        let postionX = position[0];
        let postionY = position[1];
    
        waypoint[key] = document.createElement("div");
        waypoint[key].innerText = key;
    
        waypoint[key].setAttribute("id","way-point");
        waypoint[key].setAttribute("class","way-point");
    
        waypoint[key].style.position = "absolute";
        waypoint[key].style.color = "red";
        waypoint[key].style.left = positionFix(postionX, postionY)[0] + "px";
        waypoint[key].style.top = positionFix(postionX, postionY)[1] + "px";
    
        enemyPath.append(waypoint[key]);
    }
}

// draw the path way
createPathway();


const enemiesContainer = document.createElement("div");
enemiesContainer.setAttribute("id","enemies");
enemiesContainer.setAttribute("class","enemies");
document.querySelector("body").append(enemiesContainer);

function createEnemies() {
    const enemyDiv = document.createElement("div");
    enemyDiv.setAttribute("id","enemy");
    enemyDiv.setAttribute("class","enemy");

    const enemy = new Enemy("death",5,"./resource/enemies/death_scythe.png",100);
    
    const enemyContent = `
        <img src = "${enemy.url}">
    `;

    // enemy height and width
    const height = 33;
    const width = 20;
    let arr = [1,2,3,0]; // 0-up; 1-down 2-left 3-right

    enemiesContainer.append(enemyDiv);
    enemyDiv.innerHTML = enemyContent;

    // enemyDiv.style.backgroundPositionY = ar
}

createEnemies();

function enemyMove() {
    createEnemies();
}