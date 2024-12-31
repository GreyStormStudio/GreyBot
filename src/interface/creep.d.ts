
interface CreepMemory {
    role: string;
    working: boolean;
    room: string;
    targetId?: Id<AnyStructure | Source | AnyCreep>;
}
interface Creep {
    _moveTo(target: RoomObject | [number, number], color?: string): void;
    _harvest(source: Source): void;
    _upgradeController(): void;
    _build(target?: ConstructionSite | null): void;
    _transfer(target?: Structure): void;
    _withdraw(resType: ResourceConstant, target?: Structure): void;
    _repair(target?: AnyStructure, isRepairWallAndRampart?: boolean): void;
    _attack(room: Room, target?: AnyCreep | AnyOwnedStructure): void;
    _cliam(room: Room): void;
    _reserve(room: Room): void;
    _signController(room: Room, text: string): void;
    _heal(target?: AnyCreep): void;
    _pickup(target: Resource): void;
    _dismantle(target?: AnyOwnedStructure): void;
    runfilter(filterRole: string): void;
    run(): void;
}
