import { SuperCreep } from "@/MyCreep/myCreep";

export class harvester extends SuperCreep {
    constructor(creep: Creep) {
        super(creep)
        this.memory.role = 'harvester'
    }
    public run() {
        if (this.memory.working === false) {
            const source = this.creep.room.find(FIND_SOURCES)[1]
            this.harvest(source)
            if (this.creep.store.getFreeCapacity() === 0) {
                this.memory.working = true
            }
        }
        if (this.memory.working === true) {
            if (this.creep.room.energyAvailable === this.creep.room.energyCapacityAvailable) {
                this.upgradeController()
            }
            else {
                this.transfer(this.creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION
                    }
                })[0])
            }
            if (this.creep.store.getUsedCapacity() === 0) {
                this.memory.working = false
            }
        }
    }
}