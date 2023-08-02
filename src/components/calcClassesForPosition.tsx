import { Position, isSamePos } from "../core/treasureMap";

interface SolutionContext {
    currentStepPos: Position | undefined;
    nextStepPos: Position | undefined;
    treasurePos: Position | undefined;
    visitedPositions: Position[];
}

export function calcClassesForPosition(
    position: Position,
    {
        currentStepPos,
        nextStepPos,
        treasurePos,
        visitedPositions,
    }: SolutionContext
): string {
    const classes: string[] = [];

    if (currentStepPos && isSamePos(currentStepPos, position)) {
        classes.push("currentStep");
    }

    if (nextStepPos && isSamePos(nextStepPos, position)) {
        classes.push("nextStep");
    }

    if (treasurePos && isSamePos(treasurePos, position)) {
        classes.push("treasure");
    }
    if (visitedPositions.some((p) => isSamePos(p, position))) {
        classes.push("visited");
    }
    return classes.join(" ");
}
