import { TreasureMap, positionToString } from "./treasureMap";

export function display(tmap: TreasureMap): string[] {
    const strings = [];
    for (const row of tmap) {
        const line = [];
        for (const cell of row) {
            line.push(positionToString(cell));
        }
        strings.push(line.join(" "));
    }
    return strings;
}
