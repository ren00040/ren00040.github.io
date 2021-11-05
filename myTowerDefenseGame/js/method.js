/*
 * @Date: 2021-10-10 23:32:35
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-11-05 00:32:51
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

// get distance between two points
function getDistance(start,end) {
    let x = Math.abs(start[0]-end[0]);
    let y = Math.abs(start[1]-end[1]);
    return Math.sqrt(x*x+y*y);
}

// change px to num
function pxToNum(px) {
    return Number(px.replace('px',''));
}

// Calculate linear interpolation between two points
function pSub(startPoint,targetPoint) {
    return [targetPoint[0]-startPoint[0],targetPoint[1]-startPoint[1]];
  }
  