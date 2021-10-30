/*
 * @Date: 2021-10-07 00:20:13
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-30 00:50:48
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



/*
 * shake the mapCanvas when an enemy arrived the base
 * reference from https://stackoverflow.com/questions/28023696/html-canvas-animation-which-incorporates-a-shaking-effect/28025113
 */
function startShake() {
    shakeStartTime=Date.now();
}

var shakeDuration = 200;
var shakeStartTime = -1;

function preShake() {
  if (shakeStartTime ==-1) return;
  var dt = Date.now()-shakeStartTime;
  if (dt>shakeDuration) {
      shakeStartTime = -1; 
      return;
  }
  var easingCoef = dt / shakeDuration;
  var easing = Math.pow(easingCoef-1,3) +1;
  mapCTX.save();  
  var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
  var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
  mapCTX.translate(dx, dy);  
}

function postShake() {
  if (shakeStartTime ==-1) return;
  mapCTX.restore();
}

function drawThings() {  
    const mapSprite = new Image();
    mapSprite.src = "./resource/stage" + game.stage + ".png";
    mapCTX.drawImage(mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);

}

function animate() {
  // keep animation alive
  requestAnimationFrame(animate);
  // erase
  mapCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);
  //
  preShake();
  //
  mapCTX.clearRect(0,0,mapCanvas.width,mapCanvas.height);
  drawThings();
  postShake();
}

function mapShake() {
    startShake();
    animate();
    console.log("shake end");
}
