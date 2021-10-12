/*
 * @Date: 2021-10-07 00:20:13
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-10 23:01:34
 * @FilePath: /myTowerDefenseGame/js/map.js
 */

/*
 * Initialize the battle map canvas
 * Get CTX(battle map) and set canvas's width and height
 */
const battleCanvas = document.querySelector("#canvas01");
// get CTX(battle map)
var battleMapCTX = battleCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object

battleCanvas.width = 700;
battleCanvas.height = 600;

// Draw the battle map as a background
function drawBattleMap() {
    const mapSprite = new Image();
    mapSprite.src = "./resource/stage" + game.stage + ".png";
    
    mapSprite.onload = function() {
        battleMapCTX.drawImage(mapSprite, 0, 0, battleCanvas.width, battleCanvas.height);
    }
}
