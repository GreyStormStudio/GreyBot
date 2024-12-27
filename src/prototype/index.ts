import { assignPrototype } from "./base"
import CreepFunctions from "./creep"
import SpawnFunctions from "./spawn"

assignPrototype(Creep, CreepFunctions)
assignPrototype(StructureSpawn, SpawnFunctions)
