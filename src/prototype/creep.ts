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
    _withdraw(resType: ResourceConstant = RESOURCE_ENERGY, target?: Structure): void {
        if (!target) {
            target = this.room.storage!
        }
        if (!this.pos.isNearTo(target)) {
            this._moveTo(target, colors.orange);
        } else {
            this.withdraw(target, resType);
            this.say("🛄", true)
        }
    }
    _repair(target?: AnyStructure) {
        const filter = (structure: AnyStructure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL;
        if (!target) {
            const targets = this.room.find(FIND_STRUCTURES, { filter });
            target = targets.length > 0 ? targets.sort((a, b) => a.hits - b.hits)[0] : undefined;
        }
        if (target && this.repair(target) === ERR_NOT_IN_RANGE) this._moveTo(target, colors.gray);
        else if (target) this.say("🔧", true);
        else this.say("💤", true);
    }
    runfilter(filterRole: string): void {
        const constructionSite = this.room.find(FIND_CONSTRUCTION_SITES);
        const filter = (structure: AnyStructure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL;
        const damaged_Buildings = this.room.find(FIND_STRUCTURES, { filter })
        switch (filterRole) {
            case "builder":
                if (damaged_Buildings.length > 0) {
                    const target = damaged_Buildings.sort((a, b) => a.hits - b.hits)[0]
                    this._repair(target)
                    break;
                }
                this._upgradeController();
                break;
            case "repairer":
                if (constructionSite.length > 0) {
                    this._build(constructionSite[0])
                }
                this._upgradeController()
        }
    }
    run() {
        if (this.store.getFreeCapacity() === 0 && this.memory.working === true) {
            this.memory.working = false
        }
        if (this.store.getUsedCapacity() === 0 && this.memory.working === false) {
            this.memory.working = true
        }
        if (this.memory.role.endsWith("harvester")) {
            if (this.memory.working) {
                const container = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500
                    }
                })
                if (container.length > 0) {
                    this._withdraw(RESOURCE_ENERGY, container[0])
                }
                else {
                    this.say("💤", true)
                }
            }
            else {
                const Storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (Storage) {
                    this._transfer(Storage)
                }

            }
        }
        if (this.memory.role.endsWith("miner0")) {
            if (!this.pos.isEqualTo(Game.flags["miner0"])) {
                this._moveTo(Game.flags["miner0"], colors.yellow)
            }
            else {
                this._harvest(this.room.find(FIND_SOURCES)[0])
            }

        }
        if (this.memory.role.endsWith("miner1")) {
            if (!this.pos.isEqualTo(Game.flags["miner1"])) {
                this._moveTo(Game.flags["miner1"], colors.yellow)
            }
            else {
                this._harvest(this.room.find(FIND_SOURCES)[1])
            }
        }
        if (this.memory.role.endsWith("carrier")) {
            if (this.memory.working) {
                const container = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500
                    }
                })
                container.sort((a, b) => (b as StructureContainer).store.getUsedCapacity(RESOURCE_ENERGY) - (a as StructureContainer).store.getUsedCapacity(RESOURCE_ENERGY));
                if (container.length > 0) {
                    this._withdraw(RESOURCE_ENERGY, container[0])
                }
                else {
                    this.moveTo(Game.flags["Sleep2"])
                    this.say("💤", true)
                }
            }
            else {
                this._transfer()
            }
        }
        if (this.memory.role.endsWith("manager")) {
            if (this.memory.working) {
                this._withdraw()
            }
            else {
                const Storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 || (structure.structureType === STRUCTURE_TOWER) && structure.store.getFreeCapacity()! > 200;
                    }
                });
                if (Storage) {
                    this._transfer(Storage)
                }
                else {
                    this.moveTo(Game.flags["Sleep1"])
                    this.say("💤", true)
                }
            }
        }
        if (this.memory.role.endsWith("upgrader")) {
            if (this.memory.working) {
                this._withdraw()
            }
            else {
                this._upgradeController()
            }
        }
        if (this.memory.role.endsWith("builder")) {
            if (this.memory.working) {
                this._withdraw()
            }
            else {
                const target = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                if (target) {
                    this._build(target)
                }
                else {
                    this.runfilter("builder")
                }
            }
        }
        if (this.memory.role.endsWith("repairer")) {
            if (this.memory.working) {
                this._withdraw()
            }
            else {
                const filter = (structure: AnyStructure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_CONTAINER;
                const damaged_Buildings = this.room.find(FIND_STRUCTURES, { filter })
                if (damaged_Buildings.length > 0) {
                    const target = damaged_Buildings.sort((a, b) => a.hits - b.hits)[0]
                    this._repair(target)
                }
                else {
                    this.runfilter("repairer")
                }
            }
        }
        if (this.ticksToLive! < this.body.length * 3 && !this.memory.role.startsWith("_")) {
            this.memory.role = "_" + this.memory.role
        }
    }
}


