import { pick, shuffle } from "./utils";
import { Position, TreasureMap } from "./treasureMap";

type Cell = null | Position;

export function generateTreasureMap(size: number): TreasureMap {
    const rows: Cell[][] = [];
    const allPositions: Position[] = [];
    for (let rowIx = 0; rowIx < size; rowIx++) {
        const row: Cell[] = [];
        rows.push(row);

        for (let colIx = 0; colIx < size; colIx++) {
            row.push(null);
            allPositions.push({ x: colIx, y: rowIx });
        }
    }

    function isStartingPosition({ x, y }: Position): boolean {
        return x === 0 && y === 0;
    }

    let currentPosition: Position = { x: 0, y: 0 };

    const remainingPositionsToVisit = shuffle(
        allPositions.filter((p) => !isStartingPosition(p))
    );
    let numStepsRemaining = 15;
    while (remainingPositionsToVisit.length > 0 && numStepsRemaining > 0) {
        console.log({
            numStepsRemaining,
            numRemain: remainingPositionsToVisit.length,
        });
        numStepsRemaining--;
        const nextPos = remainingPositionsToVisit.pop()!;
        console.log({ currentPosition, nextPos });
        const { x, y } = currentPosition;
        rows[y][x] = { ...nextPos };
        currentPosition = { ...nextPos };
    }
    const { x, y } = currentPosition;
    rows[y][x] = { x, y };

    fillRestWithJunk(rows, remainingPositionsToVisit);
    return rows as TreasureMap;
}
/** Mutate given partially completed map by filling in with random position values, occasionally pointing a position at self for apparent treasure. */
function fillRestWithJunk(
    rows: Cell[][],
    remainingPositionsToVisit: Position[]
): void {
    const remaining = shuffle(remainingPositionsToVisit);
    for (const { x, y } of remaining) {
        if (Math.random() < 0.9) {
            rows[y][x] = { x: pick([0, 1, 2, 3, 4]), y: pick([0, 1, 2, 3, 4]) };
        } else {
            rows[y][x] = { x, y };
        }
    }
}
