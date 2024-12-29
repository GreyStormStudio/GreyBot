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
/**
 * 1:300
 * 2:300+5*50 = 750
 * 3:300+10*50 = 800
 * 4:300+20*50 = 1300
 * 5:300+30*50 = 1800
 * 6:300+40*50  = 2300
 * 7:300*2+50*100 = 5600
 * 8:300*3+60*200 = 12900
 */
export const btype: BodyType = {
    "Worker": {
        "1": { "work": 1, "carry": 1, "move": 2 },
        "2": { "work": 2, "carry": 2, "move": 4 },
        "3": { "work": 3, "carry": 3, "move": 6 },
        "4": { "work": 6, "carry": 6, "move": 6 },
        "5": { "work": 10, "carry": 1, "move": 10 },
        "6": {},
        "7": {},
        "8": {}
    },
    "Manager": {
        "1": { "work": 1, "carry": 1, "move": 2 },
        "2": { "work": 2, "carry": 2, "move": 4 },
        "3": { "work": 3, "carry": 3, "move": 6 },
        "4": { "carry": 12, "move": 12 },
        "5": { "carry": 20, "move": 20 },
        "6": {},
        "7": {},
        "8": {}
    },
    "Miner": {
        "1": { "work": 2, "move": 2 },
        "2": {},
        "3": {},
        "4": { "work": 8, "move": 4 },
        "5": {},
        "6": {},
        "7": {},
        "8": {}
    }
}
