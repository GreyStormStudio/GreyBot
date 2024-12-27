export const colors = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    yellow: "#ffff00",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    black: "#000000",
    white: "#ffffff",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#9b30ff",
    lime: "#00ff00",
    silver: "#c0c0c0",
    gray: "#808080",
    maroon: "#800000",
    olive: "#808000",
    navy: "#000080",
    teal: "#008080"
};
export const btype = {
    "Worker": {
        "S": { WORK: 1, CARRY: 1, MOVE: 2 },
        "M": { WORK: 2, CARRY: 2, MOVE: 4 },
        "L": { WORK: 5, CARRY: 5, MOVE: 10 },
        "X": { WORK: 7, CARRY: 7, MOVE: 14 },
        "T": { WORK: 10, CARRY: 1, MOVE: 10 },
    },
    "Carrier": {
        "S": { WORK: 1, CARRY: 1, MOVE: 2 },
        "M": { CARRY: 4, MOVE: 4 },
        "L": { CARRY: 10, MOVE: 10 },
        "X": { CARRY: 14, MOVE: 14 },
        "T": { CARRY: 20, MOVE: 20 },
    }
}
