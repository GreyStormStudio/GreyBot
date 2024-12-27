import { colors } from "@/constant";
export default class CreepFunctions extends Creep {
    _moveTo(target: RoomObject | [number, number], color?: string) {
        if (Array.isArray(target)) {
            this.moveTo(target[0], target[1], { visualizePathStyle: { stroke: color, opacity: 1 } });
        } else {
            this.moveTo(target, { visualizePathStyle: { stroke: color, opacity: 1 } });
        }
        this.say("🚗", true);
    }
    _harvest(source: Source) {
        if (this.harvest(source) === ERR_NOT_IN_RANGE) this._moveTo(source, colors.yellow);
        else this.say("⛏️", true);
    }
    _upgradeController() {
        const { controller } = this.room;
        if (!controller) return;
        if (this.upgradeController(controller) === ERR_NOT_IN_RANGE) this._moveTo(controller, colors.green);
        else this.say("⚙️", true);
    }
    _build(target: ConstructionSite | null = null) {
        if (!target) target = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        if (target && this.build(target) === ERR_NOT_IN_RANGE) this._moveTo(target, colors.blue);
        else if (target) this.say("⚒️", true);
    }
    _transfer(target?: Structure) {
        if (!target) {
            target = this.room.storage!
        }
        if (!this.pos.isNearTo(target)) {
            this._moveTo(target, colors.red);
        } else {
            for (const resourceType in this.store) {
                this.transfer(target, resourceType as ResourceConstant);
                this.say("📦", true);
            }
        }
    }
    _repair(target?: AnyStructure, isRepairWallAndRampart: boolean = false) {
        const filter = (structure: AnyStructure) => structure.hits < structure.hitsMax && (!isRepairWallAndRampart || (structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART));
        if (!target) {
            const targets = this.room.find(FIND_STRUCTURES, { filter });
            target = targets.length > 0 ? targets.sort((a, b) => a.hits - b.hits)[0] : undefined;
        }
        if (target && this.repair(target) === ERR_NOT_IN_RANGE) this._moveTo(target, colors.gray);
        else if (target) this.say("🔧", true);
        else this.say("💤", true);
    }
    run() {
        if (this.memory.role.endsWith("harvester")) {
            if (this.memory.working) {
                const sources = this.room.find(FIND_SOURCES)
                let aim = sources[0]
                this._harvest(aim)
            }
            else {
                const Storage = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (Storage.length > 0) {
                    this._transfer(Storage[0])
                }
                else {
                    const target = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                    if (target) {
                        this._build(target)
                    }
                    else {
                        this._upgradeController()
                    }

                }

            }
            if (this.store.getFreeCapacity() === 0 && this.memory.working === true) {
                this.memory.working = false
            }
            if (this.store.getUsedCapacity() === 0 && this.memory.working === false) {
                this.memory.working = true
            }
        }
        if (this.memory.role.endsWith("upgrader")) {
            if (this.memory.working) {
                const sources = this.room.find(FIND_SOURCES)
                let aim = sources[1]
                this._harvest(aim)
            }
            else {
                this._upgradeController()
            }
            if (this.store.getFreeCapacity() === 0 && this.memory.working === true) {
                this.memory.working = false
            }
            if (this.store.getUsedCapacity() === 0 && this.memory.working === false) {
                this.memory.working = true
            }
        }
        if (this.memory.role.endsWith("builder")) {
            if (this.memory.working) {
                const sources = this.room.find(FIND_SOURCES)
                let aim = sources[1]
                this._harvest(aim)
            }
            else {
                this._build()
            }
            if (this.store.getFreeCapacity() === 0 && this.memory.working === true) {
                this.memory.working = false
            }
            if (this.store.getUsedCapacity() === 0 && this.memory.working === false) {
                this.memory.working = true
            }
        }
        if (this.ticksToLive! < 50 && !this.memory.role.startsWith("_")) {
            this.memory.role = "_" + this.memory.role
        }
    }
}


