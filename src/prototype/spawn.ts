import { btype } from "@/constant";
export default class SpawnFunctions extends StructureSpawn {
    _spawnCreep(role: string, type: "Worker" | "Carrier", size: "S" | "M" | "L" | "X" | "T") {
        const Bodyzip = btype[type][size]
    }
}

