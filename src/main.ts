import "./prototype/index"
export const loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
        console.log("Pixel + 1")
    }
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    if (harvesters < 3) {
        Game.spawns["Spawn1"]._spawnCreep("harvester", "Worker", "M")
    }
    else if (upgraders < 4) {
        Game.spawns["Spawn1"]._spawnCreep("upgrader", "Worker", "M")
    }
    else if (builders < 2) {
        Game.spawns["Spawn1"]._spawnCreep("builder", "Worker", "M")
    }
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]
        creep.run()
    }

    if (Game.time % 20) return
    if (!Memory.stats) Memory.stats = {}
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    Memory.stats.cpu = Game.cpu.getUsed()
    Memory.stats.bucket = Game.cpu.bucket

};
