/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-28 11:37:05
 * @FilePath: /myTowerDefenseGame/js/enemy.js
 */

// Enemy's Class
class Enemy {
    constructor(
        name,
        speed,
        url,
        healPoint,
        position,
        waypointIndex,
        step
    ){
        this.name = name;
        this.speed = speed;
        this.url = url;
        this.healPoint = healPoint;
        this.position = position;
        this.waypointIndex = waypointIndex;
        this.step = step;
    }
}

// create the enemy path way
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
let enemyWidth = 32;
let enemyHeight = 32;

// prepare all enemies
for (let index = 0; index < stageData.enemiesAmount; index++) {
    let enemy = new Enemy("fox",20,enemyImg.src,100,pathway[0],0,0);
    enemies.push(enemy);
}

// Call the draw enemies fuction per frame
window.requestAnimationFrame(drawAllEnemies);

let enemyLoop = 0; // enemy's animation loop
let enemiesAmount = 0;

// Draw all enemies
function drawAllEnemies() {
    // call a fuction with a delay time
    var intervalDrawEnemies = setInterval(function(){
        // clear the whole enemyCanvas
        enemyCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);

        /* 
         * Draw an enemy per 1s
         * Use setTimeout to increase one enemy every 1.5 second untill the quantity reaches stageData.enemiesAmount
         * Use enemyStepOffset() to get the every step offset
         * Use enemyMove() to draw the enemy's current position
        */
        if(enemiesAmount < stageData.enemiesAmount){
            let enemyIntervals = 1500; // Time between each enemy
            window.setTimeout(enemiesAmount++,enemyIntervals);
        }

        // Draw each enemy
        for (let index = 0; index < enemiesAmount; index++) {
            let offset = enemyStepOffset(index,enemies[index].position,pathway[enemies[index].waypointIndex+1]);
            let stepsAngle = degrees_to_radians(offset[3]);

            let totalSteps = getTotalSteps(index,pathway[enemies[index].waypointIndex],pathway[enemies[index].waypointIndex+1]);
            let step = enemies[index].step;
            
            // draw enemy animation
            if(enemies[index].step < totalSteps-1) {
                enemyMove(index,enemies[index].position,enemyLoop,stepsAngle,step);
                enemies[index].step++;
            }else {
                enemies[index].waypointIndex++;
                enemies[index].step = 1;

                offset = enemyStepOffset(index,enemies[index].position,pathway[enemies[index].waypointIndex+1]);
                stepsAngle = degrees_to_radians(offset[3]);
                totalSteps = getTotalSteps(index,pathway[enemies[index].waypointIndex],pathway[enemies[index].waypointIndex+1]);
                enemyMove(index,enemies[index].position,enemyLoop,stepsAngle,step);
            }
            
            console.log("index:"+index+"; totalSteps:"+totalSteps+"; step:"+step+"; position:"+enemies[index].position);
            
            let offsetX = offset[0];
            let offsetY = offset[1];
            let currentPosX = enemies[index].position[0];
            let currentPosY = enemies[index].position[1];
            currentPosX += offsetX;
            currentPosY += offsetY;
            
            enemies[index].position = [currentPosX, currentPosY];
        }

        // set the sprite's animation place
        enemyLoop++;
        if(enemyLoop >= 4) {
            enemyLoop=0;
        }

    },500);
}

// get the every step offset
function enemyStepOffset(index,currentPoint,nextPoint){
    let x = nextPoint[0] - currentPoint[0];
    let y = nextPoint[1] - currentPoint[1];
    let length = Math.sqrt((x*x)+(y*y));
    let step = Math.round(length/enemies[index].speed);

    // get the angle between waypoint and the horizontal
    let angle =  Math.atan2(y,x)*180/Math.PI;

    return [x / step ,y / step, step, angle];
}

// draw the enemy's current position
function enemyMove(enemyIndex,enemyPos,loop,angle,step) {
    drawEnemyFrame(loop,0,enemyPos[0],enemyPos[1]);
}

function drawEnemyFrame(frameX, frameY, canvasX, canvasY) {
    enemyCTX.drawImage(enemyImg,
                        frameX * enemyWidth, frameY * enemyHeight, enemyWidth, enemyHeight,
                        canvasX, canvasY, enemyWidth, enemyHeight);
}

// Calculate how many steps it takes to go to next waypoint
function getTotalSteps(index, waypoint, nextwaypoint) {
    let x = waypoint[0] - nextwaypoint[0];
    let y = waypoint[1] - nextwaypoint[1];
    let length = Math.sqrt((x*x)+(y*y));
    return Math.ceil(length/enemies[index].speed);
}
