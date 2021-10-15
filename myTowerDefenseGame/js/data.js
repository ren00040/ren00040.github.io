/*
 * @Date: 2021-10-07 00:32:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-14 23:11:31
 * @FilePath: /myTowerDefenseGame/js/data.js
 */

// game base data
const game = {
    gems : 0,
    stage : "001",
}

const stageData = {
    gold : 100
}

// Configure where the tower can be placed
const settlementPosition = [
    [120,200],
    [200,300],
    [300,400]
];

// Configure the enemy path way
const pathway = [
    [100,30],
    [200,350],
    [250,500]
];

// the gold needed to upgrade 
const towerUpgradeGold = [
    ["archer", 50, 100, 200],
    ["warrior", 80, 170, 350]
];

// const towerCount = [];