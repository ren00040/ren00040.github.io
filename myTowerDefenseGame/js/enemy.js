/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-17 23:21:50
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

let enemyImg = new Image();
enemyImg.src = "./resource/enemies/fox.png";
enemyImg.onload = function () {
    drawEnemies();
}

// draw enemies
let enemyWidth = 32;
let enemyHeight = 32;
function drawEnemies() {
    console.log("draw enemies");
    window.requestAnimationFrame(animationStep);

}

function drawEnemyFrame(frameX, frameY, canvasX, canvasY) {
    battleCTX.drawImage(enemyImg,
                        frameX * enemyWidth, frameY * enemyHeight, enemyWidth, enemyHeight,
                        canvasX, canvasY, enemyWidth, enemyHeight);

}

/* 
 * Draw a sprite animation
 * Reference: Animating Sprite Sheets With JavaScript (Martin Himmel)
 * Link: https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
 */
const walkLoop = [0,1,0,2];
let currentLoopIndex = 0;
let frameCount = 0;

function animationStep() {
    frameCount++;
    if(frameCount<15) {
        window.requestAnimationFrame(animationStep);
        return;
    }

    frameCount = 0;
    
    // refresh the canvas
    battleCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);
    drawEnemyFrame(walkLoop[currentLoopIndex++],0,0,0);
    if(currentLoopIndex >= walkLoop.length) {
        currentLoopIndex = 0;
    }

    // update the sprite's animation
    window.requestAnimationFrame(animationStep);
}