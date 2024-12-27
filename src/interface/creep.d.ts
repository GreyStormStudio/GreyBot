
interface CreepMemory {
    role: string;
    working: boolean;
    targetId?: Id<AnyStructure | Source | AnyCreep>;
}
interface Creep {
    _moveTo(target: RoomObject | [number, number], color?: string): void;
    _harvest(source: Source): void;
    _upgradeController(): void;
    _build(target?: ConstructionSite | null): void;
    _transfer(target?: Structure): void;
    _repair(target?: AnyStructure, isRepairWallAndRampart?: boolean): void;
}
