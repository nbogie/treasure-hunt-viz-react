import { Position, isSamePos } from "../core/treasureMap";

export function calcLayoutId(
    position: Position,
    currentStepPos: Position | undefined,
    nextStepPos: Position | undefined
) {
    return currentStepPos && isSamePos(position, currentStepPos)
        ? "current"
        : nextStepPos && isSamePos(position, nextStepPos)
        ? "next"
        : undefined;
}
