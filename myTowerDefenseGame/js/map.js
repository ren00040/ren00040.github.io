/*
 * @Date: 2021-10-07 00:20:13
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-20 22:21:49
 * @FilePath: /myTowerDefenseGame/js/map.js
 */

/*
 * Initialize the map canvas
 * Get CTX(map) and set canvas's width and height
 */
const mapCanvas = document.querySelector("#canvas01");
// get CTX(map)
var mapCTX = mapCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object

mapCanvas.width = 700;
mapCanvas.height = 600;

// Draw the map as a background
function drawBattleMap() {
    const mapSprite = new Image();
    mapSprite.src = "./resource/stage" + game.stage + ".png";
    
    mapSprite.onload = function() {
        mapCTX.drawImage(mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);
    }
}


/*
 * Initialize the battle canvas
 * Get CTX(battle canvas) and set canvas's width and height
 */
const battleCanvas = document.querySelector("#canvas02");
// get CTX(battle canvas)
var battleCTX = battleCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object

battleCanvas.width = 700;
battleCanvas.height = 600;

/*
 * Initialize the enemy canvas
 * Get CTX(enemy canvas) and set canvas's width and height
 */
const enemyCanvas = document.querySelector("#canvas03");
// get CTX(enemy canvas)
var enemyCTX = enemyCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object

enemyCanvas.width = 700;
enemyCanvas.height = 600;