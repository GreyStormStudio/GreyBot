import { SuperCreep } from "@/MyCreep/myCreep";

export class builder extends SuperCreep {
    constructor(creep: Creep) {
        super(creep)
        this.memory.role = 'builder'
    }
    public run() {
        if (this.memory.working === false) {
            const source = this.creep.room.find(FIND_SOURCES)[1]
            this.harvest(source)
        }
        if (this.memory.working === true) {
            this.build()
        }
    }
}