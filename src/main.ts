import { SpawnCreep } from "./Spawn/spawn";
module.exports.loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
        console.log("pixel+1")
    }
}