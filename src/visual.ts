export function visual(room: Room) {
    const energyAvailable = room.energyAvailable
    const energyCapacityAvailable = room.energyCapacityAvailable
    const progressTotal = room.controller?.progressTotal
    const progress = room.controller?.progress
    const storageUsedCapacity = room.storage?.store.getUsedCapacity()
    const storageCapacity = room.storage?.store.getCapacity()
    const text1 = `能量:${energyAvailable}/${energyCapacityAvailable}`
    const text2 = `升级进度:${progress}/${progressTotal}`
    const text3 = `Storage状态:${storageUsedCapacity}/${storageCapacity}`
    room.visual.text(text1, 22, 24)
    room.visual.text(text2, 22, 25)
    room.visual.text(text3, 22, 26)
}