import { ExMiner } from "@/ex-sources/E44N17";
export function E43N17room() {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.room === "E43N17").length;
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.room === "E43N17").length;
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.room === "E43N17").length;
    const repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer' && creep.memory.room === "E43N17").length;
    const carriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier' && creep.memory.room === "E43N17").length;
    const miner0 = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner0' && creep.memory.room === "E43N17").length;
    const miner1 = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner1' && creep.memory.room === "E43N17").length;
    const manager = _.filter(Game.creeps, (creep) => creep.memory.role === 'manager' && creep.memory.room === "E43N17").length;
    const attackers = _.filter(Game.creeps, (creep) => creep.memory.role === 'attacker' && creep.memory.room === "E43N17").length;
    if (Game.rooms["E43N17"].energyAvailable < 1000 && manager === 0 && harvesters === 0) {
        Game.spawns["Spawn1"]._spawnCreep("harvester", "Manager", "1", "E43N17")
    }
    else if (miner0 === 0) {
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
    else if (upgraders === 0) {
        Game.spawns["Spawn1"]._spawnCreep("upgrader", "Worker", "5", "E43N17")
    }
    else if (builders === 0) {
        Game.spawns["Spawn1"]._spawnCreep("builder", "Worker", "5", "E43N17")
    }
    else if (repairers === 0) {
        Game.spawns["Spawn1"]._spawnCreep("repairer", "Worker", "5", "E43N17")
    }
    else if (attackers < 2) {
        Game.spawns["Spawn1"].spawnCreep([ATTACK, ATTACK, MOVE, MOVE], "ATK" + Game.time, { memory: { role: "attacker", working: true, room: "E43N17" } })
    }
    //ExMiner()
    const enemy = Game.rooms["E43N17"].find(FIND_HOSTILE_CREEPS)
    if (enemy.length > 0) {
        const towers = Game.rooms["E43N17"].find(FIND_MY_STRUCTURES, {
            filter: structure => structure.structureType === STRUCTURE_TOWER
        })
        for (const tower of towers) {
            (tower as StructureTower).attack(enemy[0])
        }
    }
}
