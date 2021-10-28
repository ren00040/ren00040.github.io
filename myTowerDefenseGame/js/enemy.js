/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-27 22:41:54
 * @FilePath: /myTowerDefenseGame/js/enemy.js
 */

// Enemy's Class
class Enemy {
    constructor(
        name,
        speed,
        url,
        healPoint,
        position
    ){
        this.name = name;
        this.speed = speed;
        this.url = url;
        this.healPoint = healPoint;
        this.position = position;
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

// Create enemies
const enemies = []; // create a array to put all enemies
const enemyImg = new Image(); 
enemyImg.src = "./resource/enemies/fox.png";
let enemiesPosition = []; //stroe all enemies' position
let enemyWidth = 32;
let enemyHeight = 32;
let pathwayIndex = 0;
let waypoint = pathway[pathwayIndex];
let nextWaypoint = pathway[pathwayIndex+1];

for (let index = 0; index < stageData.enemiesAmount; index++) {
    let enemy = new Enemy("fox",20,enemyImg.src,100,waypoint);
    enemiesPosition[index] = pathway[0];
    enemies.push(enemy);
}

//
window.requestAnimationFrame(drawEnemies);

let enemyLoop = 0; // enemy's animation loop
let enemyQuantity = 0; // enemies quantity 

let enemyAnimationStep = 0;

// Draw enemies
function drawEnemies() {
    var intervalDrawEnemies = setInterval(function(){
        enemyCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);

        waypoint = pathway[pathwayIndex];
        nextWaypoint = pathway[pathwayIndex+1];

        if(enemyQuantity >= stageData.enemiesAmount) {
            enemyQuantity = stageData.enemiesAmount - 1;
        }

        for(let enemyIndex = 0; enemyIndex <= enemyQuantity; enemyIndex++) {
            
            // get the offset, stepLength and angle for every step
            let offset = enemyStepOffset(enemyIndex,waypoint,nextWaypoint);
            console.log(offset);

            let currentPosX = waypoint[0] + offset[0]* enemyAnimationStep;
            let currentPosY = waypoint[1] + offset[1]* enemyAnimationStep;
            let currentPos = [];
            let totalSteps = offset[2];
            let stepsAngle = degrees_to_radians(offset[3]);

            currentPos[enemyIndex] = [currentPosX,currentPosY];

            // make enemy walking
            if (enemyAnimationStep <= totalSteps) {
                enemyWalk(enemyIndex,enemyLoop,currentPos[enemyIndex],stepsAngle);
            }else{
                pathwayIndex++;
                enemyAnimationStep = -1;
            }
        }

        enemyAnimationStep++;
        enemyQuantity++;
        enemyLoop++;
        
        if(enemyLoop >= 4) {
            enemyLoop=0;
        }

    },500);
}

function enemyStepOffset(index,currentPoint,nextPoint){
    let x = nextPoint[0] - currentPoint[0];
    let y = nextPoint[1] - currentPoint[1];
    let length = Math.sqrt((x*x)+(y*y));
    let step = Math.ceil(length/enemies[index].speed);

    // get the angle between waypoint and the horizontal
    let angle =  Math.atan2(y,x)*180/Math.PI;

    return [x * enemies[index].speed / length ,y * enemies[index].speed / length, step, angle];
}

function enemyWalk(enemyIndex,loop,currentPos,angle) {
    for (let index = 0; index <= enemyIndex; index++) {
        drawEnemyFrame(loop,0,currentPos[0]-index*32*Math.cos(angle),currentPos[1]-index*32*Math.sin(angle));
    }

}

function drawEnemyFrame(frameX, frameY, canvasX, canvasY) {
    enemyCTX.drawImage(enemyImg,
                        frameX * enemyWidth, frameY * enemyHeight, enemyWidth, enemyHeight,
                        canvasX, canvasY, enemyWidth, enemyHeight);

}