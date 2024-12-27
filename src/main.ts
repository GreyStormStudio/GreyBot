import "./prototype/index"
export const loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
        console.log("Pixel + 1")
    }
    Game.spawns["Main"]._spawnCreep("test", "Worker", "L")
};
