import { display } from "./display";
import { numsForFirstExample } from "./examples";
import { generateTreasureMap } from "./generator";
import { makeTreasureMapFromNumbers } from "./parser";
import { getPathToTreasure } from "./solver";
import { TreasureMap, positionToString } from "./treasureMap";

function attemptToSolve(nums: number[]) {
    const gridOfPositions = makeTreasureMapFromNumbers(nums);
    console.log("parsedGrid", JSON.stringify(gridOfPositions, null, 2));
    attemptToSolveGrid(gridOfPositions);
}

function attemptToSolveGrid(gridOfPositions: TreasureMap): boolean {
    const result = getPathToTreasure(gridOfPositions);
    if (result.success) {
        console.log(
            "Solved in ",
            result.path.length + " step(s)",
            JSON.stringify(result.path.map(positionToString), null, 2)
        );
        return true;
    } else {
        console.error(result.errorMsg);
        return false;
    }
}

function runCommandLineDemo() {
    attemptToSolve(numsForFirstExample);

    const generated: TreasureMap = generateTreasureMap(5);
    const stringOutput = display(generated);
    console.log("generated", stringOutput);
    attemptToSolveGrid(generated);
}

runCommandLineDemo();
