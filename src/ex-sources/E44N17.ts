export function ExMiner() {
    const E44N17ExMiner = _.filter(Game.creeps, (creep) => creep.memory.role === '_1harvesterEX' && creep.memory.room === "E43N17").length;
    if (E44N17ExMiner < 1) {
        Game.spawns["Spawn1"]._spawnCreep("_1harvesterEX", "Ex-Miner", "3", "E43N17")
    }
}
