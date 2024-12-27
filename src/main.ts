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
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    if (harvesters < 2) {
        Game.spawns["Spawn1"]._spawnCreep("harvester", "Worker", "S")
    }
    else if (upgraders < 4) {
        Game.spawns["Spawn1"]._spawnCreep("upgrader", "Worker", "S")
    }
    else if (builders < 2) {
        Game.spawns["Spawn1"]._spawnCreep("builder", "Worker", "S")
    }
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]
        creep.run()
    }
};
