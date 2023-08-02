export type TreasureMap = Position[][];
export function positionToString(pos: Position): string {
    return [pos.y, pos.x].map((n) => (n + 1).toString()).join("");
}
export type Position = { x: number; y: number };
export function numToPosition(n: number): Position {
    const [y, x] = n
        .toString()
        .split("")
        .map((v) => parseInt(v, 10) - 1);
    return { x, y };
}
export function getContentAtPosition(
    { x, y }: Position,
    tmap: TreasureMap
): Position {
    const row = tmap[y];
    const cell = row[x];
    return cell;
}

export function isSamePos(a: Position, b: Position) {
    if (!a || !b) {
        throw new Error(
            "given undefined position: " + JSON.stringify({ a, b })
        );
    }
    return a.x === b.x && a.y === b.y;
}
