import { btype } from "@/constant";
export default class SpawnFunctions extends StructureSpawn {
    _spawnCreep(role: string, type: "Worker" | "Miner" | "Manager" | "Ex-Miner", size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8", room: string) {
        const Bodyzip = btype[type][size]
        const Body: any = []
        for (const part in Bodyzip) {
            const count = Bodyzip[part];
            for (let i = 0; i < count; i++) {
                Body.push((part as BodyPartConstant))
            }
        }
        this.spawnCreep(Body, role + Game.time, { memory: { role: role, working: false, room: room }, directions: [BOTTOM] })
    }
}

