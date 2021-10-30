/*
 * @Date: 2021-10-14 23:12:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-30 00:55:41
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
    let enemy = new Enemy("fox",10,enemyImg.src,100,pathway[0],0,0);
    enemies.push(enemy);
}

// Call the draw enemies fuction per frame
window.requestAnimationFrame(drawAllEnemies);



// Draw all enemies
function drawAllEnemies() {
    let enemyLoop = 0; // enemy's animation loop
    let enemiesAmount = 1;
    let enemiesSpace = 0; // control the space between enemies
    let destroy = false;

    // call a fuction with a delay time
    var intervalDrawEnemies = setInterval(function(){
        // clear the whole enemyCanvas
        enemyCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);

        /* 
         * Use enemyStepOffset() to get the every step offset
         * Use enemyMove() to draw the enemy's current position
        */

        if(enemiesSpace >= 5 && !destroy) { 
            if (enemiesAmount < stageData.enemiesAmount) {
                enemiesAmount++;
            }
            enemiesSpace = 0;
        }

        // Draw each enemy
        for (let index = 0; index < enemiesAmount; index++) {
            let offset;
            let stepsAngle;
            let totalSteps;
            let step;
            
            // console.log("index: "+index+" waypointIndex: "+enemies[index].waypointIndex);
            if (enemies[index].waypointIndex < pathway.length -1) {
                offset = enemyStepOffset(index,enemies[index].position,pathway[enemies[index].waypointIndex+1]);
                // degrees turn to radians
                stepsAngle = degreesToRadians(offset[3]);
                totalSteps = getTotalSteps(index,pathway[enemies[index].waypointIndex],pathway[enemies[index].waypointIndex+1]);
            } else {
                // push out the first enemy in the array
                enemies.shift();
                enemiesAmount--;
                // console.log("destroy! Amount:"+enemiesAmount);
                destroy = true;
                mapShake();
                console.log("shake");
                return;
            }

            step = enemies[index].step;
            
            // draw enemy animation
            if(enemies[index].step < totalSteps-1) {
                enemyMove(index,enemies[index].position,enemyLoop,stepsAngle,step,enemies[index].healPoint);
                enemies[index].step++;
            }
            // turn to the next waypoint and draw the first step of the new waypoint
            else {
                // turn to the next waypoint
                enemies[index].waypointIndex++;

                if (enemies[index].waypointIndex < pathway.length -1) {
                    enemies[index].step = 1;
                    // draw the first step of the new waypoint
                    offset = enemyStepOffset(index,enemies[index].position,pathway[enemies[index].waypointIndex+1]);
                    stepsAngle = degreesToRadians(offset[3]);
                    enemyMove(index,enemies[index].position,enemyLoop,stepsAngle,step,enemies[index].healPoint);
                }else {
                    // console.log("Destroy the enemy! ");
                }
            }
                        
            // update the enemy's current position
            let offsetX = offset[0];
            let offsetY = offset[1];
            let currentPosX = enemies[index].position[0];
            let currentPosY = enemies[index].position[1];
            currentPosX += offsetX;
            currentPosY += offsetY;
            enemies[index].position = [currentPosX, currentPosY];
        }

        // set the sprite's animation place
        // enemyLoop(frome 0 to 3) means the one of the sprite's frames
        enemyLoop++;
        if(enemyLoop >= 4) {
            enemyLoop=0;
        }

        enemiesSpace++;

    },100);
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
function enemyMove(enemyIndex,enemyPos,loop,angle,step,healPoint) {
    // radians turn to degrees
    angle = radiansToDegrees(angle);
    let direction;

    // use difference sprite's part according to angle
    if (angle>=45 && angle<=135)    { direction = 0; } // direction down
    if (angle>-45 && angle<45)      { direction = 1; } // direction right
    if (angle>=-135 && angle<=-45)  { direction = 2; } // direction up
    if (angle<-135 || angle>135)    { direction = 3; } // direction left

    // draw the enemy sprite's frame
    drawEnemyFrame(loop,direction,enemyPos[0],enemyPos[1],healPoint);
}

// draw an enemy sprite's frame
function drawEnemyFrame(frameX, frameY, canvasX, canvasY,healPoint) {
    let red = (100-healPoint)*255/100;
    let green = (healPoint/100)*255;
    let color = `rgb(${red},${green},0)`;
    let currentHp = 100;
    enemyCTX.fillStyle = color;
    enemyCTX.drawImage(enemyImg,
                        frameX * enemyWidth, frameY * enemyHeight, enemyWidth, enemyHeight,
                        canvasX-(enemyWidth/2), canvasY-enemyHeight/2, enemyWidth, enemyHeight);
    // draw the enemy's HP
    enemyCTX.fillRect(canvasX-3,canvasY-10,10*healPoint/currentHp,2);
}

// Calculate how many steps it takes to go to next waypoint
function getTotalSteps(index, waypoint, nextwaypoint) {
    let x = waypoint[0] - nextwaypoint[0];
    let y = waypoint[1] - nextwaypoint[1];
    let length = Math.sqrt((x*x)+(y*y));
    return Math.ceil(length/enemies[index].speed);
}