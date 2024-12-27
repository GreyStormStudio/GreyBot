import { colors } from "@/constant";
export default class CreepFunctions extends Creep {
    _moveTo(target: RoomObject | [number, number], color?: string) {
        if (Array.isArray(target)) {
            this.moveTo(target[0], target[1], { visualizePathStyle: { stroke: color, opacity: 1 } });
        } else {
            this.moveTo(target, { visualizePathStyle: { stroke: color, opacity: 1 } });
        }
        this.say("🧑‍🦽", true);
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
        else {
            this.say("💀", true);
            this.suicide();
        }
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
}


