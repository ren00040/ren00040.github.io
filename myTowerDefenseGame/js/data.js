/*
 * @Date: 2021-10-07 00:32:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-09 23:49:48
 * @FilePath: /myTowerDefenseGame/js/data.js
 */

// game base data
const game = {
    gems : 0,
    stage : "001"
}

const stageData = {
    gold : 100
}

// Configure where the tower can be placed
const settlementPosition = [
    [100,200],
    [200,300],
    [300,400]
];

const towerUpgradeGold = [
    ["archer", 50, 100, 200],
    ["warrior", 80, 170, 350]
];

const towerCount = [];