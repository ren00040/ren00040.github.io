/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-26 11:29:35
 * @FilePath: /myTowerDefenseGame/js/enemy copy.js
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

function drawEnemy() {
    let enemyImgTemp = new Image();
    enemyImgTemp.src = "./resource/enemies/fox.png";
    let enemy = new Enemy("fox", 10, enemyImgTemp.src, 100)
    
    enemyImgTemp.onload = function () {
        drawEnemyAninmation();
    }
    
    // draw enemies
    let enemyWidth = 32;
    let enemyHeight = 32;
    function drawEnemyAninmation() {
        window.requestAnimationFrame(enemyAnimationStep);
    }
    
    function drawEnemyFrame(frameX, frameY, canvasX, canvasY) {
        enemyCTX.drawImage(enemyImgTemp,
                            frameX * enemyWidth, frameY * enemyHeight, enemyWidth, enemyHeight,
                            canvasX, canvasY, enemyWidth, enemyHeight);
    
    }
    
    /* 
     * Draw a sprite animation
     * Reference: Animating Sprite Sheets With JavaScript (Martin Himmel)
     * Link: https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
     * Use setInterval to loop animation
     */
    const walkLoop = [0,1,0,2];
    let currentLoopIndex = 0;
    
    let pathwayIndex = 0;
    let stepIndex = 0;
    
    function enemyAnimationStep() {
        let waypoint = pathway[pathwayIndex];
        let nextWaypoint = pathway[pathwayIndex+1];
        
        var intervalEnemyAnimation = setInterval(function(){
            waypoint = pathway[pathwayIndex];
            nextWaypoint = pathway[pathwayIndex+1];
            // refresh the canvas
            enemyCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);
            // get the step distance 
            let offset =  getOffset(waypoint,nextWaypoint);
            let currentPosX = waypoint[0] + offset[0]* stepIndex;
            let currentPosY = waypoint[1] + offset[1]* stepIndex;
        
            stepIndex++;
        
            let angle = offset[3];
            let step = offset[2];
            let direction;
        
            if (angle>=45 && angle<=135)    { direction = 0; } // direction down
            if (angle>-45 && angle<45)      { direction = 1; } // direction right
            if (angle>=-135 && angle<=-45)  { direction = 2; } // direction up
            if (angle<-135 || angle>135)    { direction = 3; } // direction left
        
            
            drawEnemyFrame(walkLoop[currentLoopIndex++],direction,currentPosX-enemyWidth/2,currentPosY-enemyHeight/2);
            if(currentLoopIndex >= walkLoop.length) {
                currentLoopIndex = 0;
            }
        
            // When enemy arrivals the way point, go to the next
            if(stepIndex >= step) {
                pathwayIndex++;
                stepIndex =0;
            }
        
            // enemy arrivals the end point
            if(pathwayIndex >= pathway.length - 1) {
                console.log("Destory the enemy");
                clearInterval(intervalEnemyAnimation); //Stop setInterval
            }
            
        },200)
    
    }
    
    //  get the step distance, the step num needed, the angle between waypoint and the horizontal
    function getOffset(waypoint, nextWaypoint) {
        let x = nextWaypoint[0] - waypoint[0];
        let y = nextWaypoint[1] - waypoint[1];
        let length = Math.sqrt(x*x +y*y);
        let step = Math.ceil(length/enemy.speed);
    
        // get the angle between waypoint and the horizontal
        let angle =  Math.atan2(y,x)*180/Math.PI;
    
        return [x * enemy.speed / length ,y * enemy.speed / length, step, angle];
    }
}

// var intervalDrawEnemies = setInterval(drawEnemy,200);

drawEnemy();