import { SuperCreep } from "@/MyCreep/myCreep";

export class upgrader extends SuperCreep {
    constructor(creep: Creep) {
        super(creep)
        this.memory.role = 'upgrader'
    }

    public run() {
        if (this.memory.working === false) {
            const source = this.creep.room.find(FIND_SOURCES)[0]
            this.harvest(source)
        }
        if (this.memory.working === true) {
            this.upgradeController()
        }
    }
}