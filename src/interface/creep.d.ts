interface CreepMemory {
    role: string;
    working: boolean;
    targetId?: Id<AnyStructure | Source | AnyCreep>;
}