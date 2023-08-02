import {
    Position,
    TreasureMap,
    getContentAtPosition,
    isSamePos,
} from "./treasureMap";

export function getPathToTreasure(
    grid: TreasureMap
): { success: true; path: Position[] } | { success: false; errorMsg: string } {
    const path: Position[] = [];
    let currentPos = { x: 0, y: 0 };

    //don't get stuck in possible cycles.
    while (path.length <= 25) {
        path.push(currentPos);

        const nextPos = getContentAtPosition(currentPos, grid);
        if (isSamePos(nextPos, currentPos)) {
            return { success: true, path };
        }
        currentPos = nextPos;
    }
    return { success: false, errorMsg: "no path found" };
}
