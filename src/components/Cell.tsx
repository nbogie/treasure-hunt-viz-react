import { Position, positionToString } from "../core/treasureMap";
import { calcClassesForPosition } from "./calcClassesForPosition";

interface CellProps {
    position: Position;
    currentStepPos: Position | undefined;
    nextStepPos: Position | undefined;
    treasurePos: Position | undefined;
    visitedPositions: Position[];
    content: Position;
}
export function Cell({
    position,
    currentStepPos,
    nextStepPos,
    content,
    treasurePos,
    visitedPositions,
}: CellProps) {
    const classes = calcClassesForPosition(position, {
        currentStepPos,
        nextStepPos,
        treasurePos,
        visitedPositions,
    });
    return (
        <div className={"cell " + classes}>
            {positionToString(content)}
            <div className="posAnnotation">
                {position.y + 1}
                {position.x + 1}
            </div>
        </div>
    );
}
