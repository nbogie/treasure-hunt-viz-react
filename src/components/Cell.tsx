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

    const layoutId = calcLayoutId(position, currentStepPos, nextStepPos);
    return (
        <motion.div
            className={"cell " + classes}
            layout={layoutId !== undefined}
            layoutId={layoutId}
            transition={{
                delay: { current: 0, next: 0.3, default: 0 }[
                    layoutId ?? "default"
                ],
                duration: { current: 0.5, next: 0.9, default: 0 }[
                    layoutId ?? "default"
                ],
            }}
        >
            {positionToString(content)}
            <div className="posAnnotation">
                {position.y + 1}
                {position.x + 1}
            </div>
        </motion.div>
    );
}
