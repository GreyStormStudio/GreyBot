export function E43N17room() {
    //const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.room === "E43N17").length;
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.room === "E43N17").length;
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.room === "E43N17").length;
    const carriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier' && creep.memory.room === "E43N17").length;
    const miner0 = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner0' && creep.memory.room === "E43N17").length;
    const miner1 = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner1' && creep.memory.room === "E43N17").length;
    const manager = _.filter(Game.creeps, (creep) => creep.memory.role === 'manager' && creep.memory.room === "E43N17").length;

    /*if (harvesters === 0) {
        Game.spawns["Spawn1"]._spawnCreep("harvester", "Worker", "4", "E43N17")
    }
    else */if (miner0 === 0) {
        Game.spawns["Spawn1"]._spawnCreep("miner0", "Miner", "4", "E43N17")
    }
    else if (miner1 === 0) {
        Game.spawns["Spawn1"]._spawnCreep("miner1", "Miner", "4", "E43N17")
    }
    else if (carriers === 0) {
        Game.spawns["Spawn1"]._spawnCreep("carrier", "Manager", "4", "E43N17")
    }
    else if (manager === 0) {
        Game.spawns["Spawn1"]._spawnCreep("manager", "Manager", "4", "E43N17")
    }
    else if (upgraders < 2) {
        Game.spawns["Spawn1"]._spawnCreep("upgrader", "Worker", "4", "E43N17")
    }
    else if (builders < 1) {
        Game.spawns["Spawn1"]._spawnCreep("builder", "Worker", "4", "E43N17")
    }

    const enemy = Game.rooms["E43N17"].find(FIND_HOSTILE_CREEPS)
    if (enemy.length > 0) {
        const towers = Game.rooms["E43N17"].find(FIND_MY_STRUCTURES, {
            filter: structure => structure.structureType === STRUCTURE_TOWER
        })
        for (const tower of towers) {
            (tower as StructureTower).attack(enemy[0])
        }
    }
    else {
        const filter = (structure: AnyStructure) => (structure.hits + 800 < structure.hitsMax) && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART;
        const damaged_Buildings = Game.rooms["E43N17"].find(FIND_STRUCTURES, { filter })
        const target = damaged_Buildings.sort((a, b) => a.hits - b.hits)[0]
        if (damaged_Buildings.length > 0) {
            const towers = Game.rooms["E43N17"].find(FIND_MY_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_TOWER
            })
            for (const tower of towers) {
                if ((tower as StructureTower).store[RESOURCE_ENERGY] > 500) {

                    (tower as StructureTower).repair(target)
                }
            }
        }
    }
}
