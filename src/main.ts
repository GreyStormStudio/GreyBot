import "./prototype/index"
import { E43N17room } from "./rooms/E43N17"
import { visual } from "./visual";
export const loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
        console.log("Pixel + 1")
    }
    E43N17room()
    const enemy = Game.rooms["E43N17"].find(FIND_HOSTILE_CREEPS)
    if (enemy.length > 0) {
        const towers = Game.rooms["E43N17"].find(FIND_MY_STRUCTURES, {
            filter: structure => structure.structureType === STRUCTURE_TOWER
        })
        for (const tower of towers) {
            (tower as StructureTower).attack(enemy[0])
        }
    }
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]
        creep.run()
    }
    visual(Game.rooms["E43N17"])
    if (Game.time % 20) return
    if (!Memory.stats) Memory.stats = {}
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    Memory.stats.cpu = Game.cpu.getUsed()
    Memory.stats.bucket = Game.cpu.bucket

};
