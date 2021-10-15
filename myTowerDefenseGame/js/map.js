/*
 * @Date: 2021-10-07 00:20:13
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-14 22:33:42
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

