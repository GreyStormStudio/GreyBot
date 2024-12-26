import { colors } from "@/constant";

export class SuperCreep {
    public name: string
    public creep: Creep;
    public memory: CreepMemory;

    constructor(creep: Creep) {
        this.creep = creep;
        this.name = creep.name
        this.memory = creep.memory
        if (this.memory.working === undefined) {
            this.memory.working = false;
        }
    }

    //移动
    public moveTo(target: RoomObject | [number, number], color: string): void {
        if (Array.isArray(target)) {
            // 如果target是数组，则将其视为坐标
            this.creep.moveTo(target[0], target[1], { visualizePathStyle: { stroke: color, opacity: 1 } });
        } else {
            // 如果target是RoomObject，直接移动到目标
            this.creep.moveTo(target, { visualizePathStyle: { stroke: color, opacity: 1 } });
        }
        this.creep.say("🧑‍🦽", true);
    }

    //采集能量
    public harvest(source: Source) {
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
            this.moveTo(source, colors.yellow)
        }
        else {
            this.creep.say("⛏️", true)
        }
    }

    //升级控制器
    public upgradeController() {
        const roomControler = this.creep.room.controller!
        if (this.creep.upgradeController(roomControler) === ERR_NOT_IN_RANGE) {
            this.moveTo(roomControler, colors.green)
        }
        else {
            this.creep.say("⚙️", true)
        }
    }

    //建造
    public build(target?: ConstructionSite | null): void {
        if (!target) {
            target = this.creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        }
        if (target) {
            if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
                this.moveTo(target, colors.blue);
            } else {
                this.creep.say("⚒️", true);
            }
        }
        else {//建完了就紫砂
            this.creep.say("💀", true)
            this.creep.suicide()
        }
    }

    //搬运
    public transfer(target?: Structure) {
        if (!target) {//没有指定目标就存到storage里
            target = this.creep.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } })[0]
        }
        if (!this.creep.pos.isNearTo(target)) {
            this.moveTo(target, colors.green)
        }
        else {
            for (const resourceType in this.creep.store) {
                this.creep.transfer(target, resourceType as ResourceConstant)
                this.creep.say("📦", true)
            }
        }

    }

    //维修
    public repair(target?: AnyStructure, isRepairWallAndRampart: boolean = false): void {
        const filter = (structure: AnyStructure) => {
            if (isRepairWallAndRampart) {
                return structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART;
            }
            return structure.hits < structure.hitsMax;
        };
        if (!target) {
            const targets = this.creep.room.find(FIND_STRUCTURES, { filter });
            if (targets.length > 0) {
                targets.sort((a, b) => a.hits - b.hits);
                target = targets[0];
            }
        }
        if (target) {
            if (this.creep.repair(target) === ERR_NOT_IN_RANGE) {
                this.moveTo(target, colors.gray);
            } else {
                this.creep.say("🔧", true);
            }
        }
        else {
            this.creep.say("💤", true)
        }
    }

    public getRole(): string {
        return this.memory.role;
    }
}
