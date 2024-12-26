//import { builder } from "./start/builder";
import { harvester } from "./start/harvester";
import { upgrader } from "./start/upgrader";
export const loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
    console.log(Game.time)
    for(const name in Game.creeps){
        const creep = Game.creeps[name]
        if(creep.memory.role==='harvester'){
            const cp = new harvester(creep)
            cp.run()
        }
        if(creep.memory.role==='upgrader'){
            const cp = new upgrader(creep)
            cp.run()
        }
    }
};
