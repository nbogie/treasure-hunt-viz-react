import { motion } from "framer-motion";
import { Position, positionToString } from "../core/treasureMap";
import { calcClassesForPosition } from "./calcClassesForPosition";
import { calcLayoutId } from "./layoutId";

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
            <Highlighter {...{ position, currentStepPos, nextStepPos }} />
        </div>
    );
}

function Highlighter({
    position,
    currentStepPos,
    nextStepPos,
}: {
    position: Position;
    currentStepPos: Position | undefined;
    nextStepPos: Position | undefined;
}) {
    const layoutId = calcLayoutId(position, currentStepPos, nextStepPos);
    if (!layoutId) {
        return null;
    }
    return (
        <motion.div
            layout={true}
            layoutId={layoutId}
            className={"highlighter " + layoutId}
            transition={{
                delay: { current: 0, next: 0.3, default: 0 }[
                    layoutId ?? "default"
                ],
                duration: { current: 0.5, next: 0.9, default: 0 }[
                    layoutId ?? "default"
                ],
            }}
        ></motion.div>
    );
}
