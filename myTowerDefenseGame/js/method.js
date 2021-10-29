/*
 * @Date: 2021-10-10 23:32:35
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-28 13:12:52
 * @FilePath: /myTowerDefenseGame/js/method.js
 */

var pi = Math.PI;

// Convert the browser coordinates to the canvs coordinates
function positionFix(x,y) {
    let offset= [innerWidth/2,innerHeight/2];

    offset[0] = offset[0] - 350 + x;
    offset[1] = offset[1] - 300 + y;

    return offset;
}


function positionFixBack(x,y) {
    let offset= [innerWidth/2,innerHeight/2];

    offset[0] = 350 + x - offset[0];
    offset[1] = 300 + y - offset[1];

    return offset;
}

// degrees to radians
function degreesToRadians(degrees)
{
  return degrees * (pi/180);
}

// radians to degrees
function radiansToDegrees(radians) {
    return radians*180/pi;
}