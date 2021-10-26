/*
 * @Date: 2021-10-07 00:32:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-10-26 00:40:32
 * @FilePath: /myTowerDefenseGame/js/data.js
 */

// game base data
const game = {
    gems : 0,
    stage : "001",
}

const stageData = {
    gold : 100, // Initial gold
    wave : 5,   // Number of enemies waves
    enemiesAmount : 3, // Amount of all enemies
    life: 10 //player's life
}

// Configure where the tower can be placed
const settlementPosition = [
    [120,200],
    [200,300],
    [300,400]
];

// Configure the enemy path way
const pathway = [
    [325,0],
    [323,180],
    [280,220],
    [240,240],
    [170,290],
    [170,370],
    [220,410],
    [380,410],
    [480,430],
    [600,350],
    [750,350],
];

// the gold needed to upgrade 
const towerUpgradeGold = [
    ["archer", 50, 100, 200],
    ["warior", 80, 170, 350]
];
