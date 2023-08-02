import { useMemo, useState } from "react";
import { display } from "../core/display";
import { numsForFirstExample } from "../core/examples";
import { makeTreasureMapFromNumbers } from "../core/parser";
import { getPathToTreasure } from "../core/solver";
import { Position, TreasureMap, positionToString } from "../core/treasureMap";
import "./App.css";
import { Cell } from "./Cell";
import { calcClassesForPosition } from "./calcClassesForPosition";

function App() {
    const tmap = useMemo(
        () => makeTreasureMapFromNumbers(numsForFirstExample),
        []
    );
    const [path, setPath] = useState<Position[]>([]);
    const [step, setStep] = useState(0);

    function handleNext() {
        setStep((p) => (p + 1) % path.length);
    }

    function handleSolve() {
        const map: TreasureMap = tmap;
        const result = getPathToTreasure(map);
        if (result.success) {
            setPath(result.path);
            setStep(0);
        } else {
            setPath([]);
            setStep(0);
        }
    }

    const currentStepPos = path[step];
    const nextStepPos = path[step + 1];
    const treasurePos: Position = path[path.length - 1];

    return (
        <main>
            <textarea
                value={display(tmap).join("\n")}
                cols={15}
                rows={6}
                readOnly
            ></textarea>
            <div className="treasureMap">
                {tmap.flatMap((row, rowIx) =>
                    row.map((c, colIx) => (
                        <Cell
                            key={colIx + "" + rowIx}
                            position={{ x: colIx, y: rowIx }}
                            content={c}
                            {...{
                                nextStepPos,
                                currentStepPos,
                                treasurePos,
                                visitedPositions: path.slice(0, step),
                            }}
                        />
                    ))
                )}
            </div>
            <div className="pathText">
                {path.map((c) => (
                    <span
                        key={positionToString(c)}
                        className={
                            "step " +
                            calcClassesForPosition(c, {
                                currentStepPos,
                                nextStepPos,
                                treasurePos,
                                visitedPositions: path.slice(0, step),
                            })
                        }
                    >
                        {positionToString(c)}
                    </span>
                ))}
            </div>
            <button onClick={handleSolve}>Solve</button>
            <button onClick={handleNext}>next</button>
        </main>
    );
}

export default App;
