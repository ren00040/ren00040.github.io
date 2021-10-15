/*
 * @Date: 2021-10-10 23:32:35
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-14 14:22:03
 * @FilePath: /myTowerDefenseGame/js/method.js
 */

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