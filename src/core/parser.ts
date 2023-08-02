import { TreasureMap, numToPosition } from "./treasureMap";

export function makeTreasureMapFromNumbers(numbers: number[]): TreasureMap {
    const gridOfNumbers: number[][] = makeGrid(numbers, 5);
    const gridOfPositions: TreasureMap = gridOfNumbers.map((row) =>
        row.map(numToPosition)
    );
    return gridOfPositions;
}

export function makeGrid<T>(arr: T[], rowWidth: number): T[][] {
    const cells: T[] = [...arr];
    const rows: T[][] = [[]];

    let rowIx = 0;
    let colIx = 0;

    while (cells.length > 0) {
        const c = cells.shift();
        if (!c) {
            return rows;
        }
        rows[rowIx].push(c);
        colIx++;
        if (colIx >= rowWidth) {
            colIx = 0;
            rowIx++;
            rows.push([]);
        }
    }
    return rows;
}
