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
interface BodyType {
    [key: string]: {
        [part: string]: {
            [type: string]: number
        }
    };
}
export const btype: BodyType = {
    "Worker": {
        "S": { "work": 1, "carry": 1, "move": 2 },
        "M": { "work": 2, "carry": 2, "move": 4 },
        "L": { "work": 5, "carry": 5, "move": 10 },
        "X": { "work": 7, "carry": 7, "move": 14 },
        "T": { "work": 10, "carry": 1, "move": 10 },
    },
    "Carrier": {
        "S": { "work": 1, "carry": 1, "move": 2 },
        "M": { "carry": 4, "move": 4 },
        "L": { "carry": 10, "move": 10 },
        "X": { "carry": 14, "move": 14 },
        "T": { "carry": 20, "move": 20 },
    }
}
