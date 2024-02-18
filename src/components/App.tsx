import { LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import {
    example1Grid,
    example2Grid,
    example3Grid,
    example4Grid,
} from "../core/examples";
import { parseMapFromText } from "../core/parser";
import { getPathToTreasure } from "../core/solver";
import { Position, TreasureMap, positionToString } from "../core/treasureMap";
import "./App.css";
import { Cell } from "./Cell";
import { calcClassesForPosition } from "./calcClassesForPosition";
import { calcLayoutId } from "./layoutId";

function App() {
    const [treasureMapText, setTreasureMapText] = useState(example1Grid.trim());

    const treasureMap = useMemo(
        () => parseMapFromText(treasureMapText),
        [treasureMapText]
    );
    const [path, setPath] = useState<Position[]>([]);
    const [step, setStep] = useState(0);
    const [error, setError] = useState<string | null>(null);

    function handleLoadExampleClicked(n: 1 | 2 | 3 | 4) {
        const lookup = {
            1: example1Grid,
            2: example2Grid,
            3: example3Grid,
            4: example4Grid,
        };
        const text = lookup[n];
        setTreasureMapText(text.trim());
    }

    function handleNextStepClicked() {
        setStep((p) => (p + 1) % path.length);
    }

    function handleSolveClicked() {
        const map: TreasureMap = treasureMap;
        const result = getPathToTreasure(map);
        if (result.success) {
            setPath(result.path);
            setStep(0);
            setError(null);
        } else {
            setPath([]);
            setStep(0);
            setError(result.errorMsg);
        }
    }

    const currentStepPos = path[step];
    const nextStepPos = path[step + 1];
    const treasurePos: Position = path[path.length - 1];

    return (
        <main>
            <textarea
                className="treasureMapText"
                value={treasureMapText}
                cols={15}
                rows={6}
                onChange={(e) => setTreasureMapText(e.target.value)}
            ></textarea>

            <div className="treasureMap">
                <LayoutGroup>
                    {treasureMap.flatMap((row, rowIx) =>
                        row.map((c, colIx) => {
                            const position = { x: colIx, y: rowIx };

                            const layoutId = calcLayoutId(
                                position,
                                currentStepPos,
                                nextStepPos
                            );

                            return (
                                <Cell
                                    key={
                                        layoutId ? layoutId : colIx + "" + rowIx
                                    }
                                    position={position}
                                    content={c}
                                    {...{
                                        nextStepPos,
                                        currentStepPos,
                                        treasurePos,
                                        visitedPositions: path.slice(0, step),
                                    }}
                                />
                            );
                        })
                    )}
                </LayoutGroup>
            </div>
            {error && <div className="error">Error: {error}</div>}
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
            <div>
                <button onClick={handleSolveClicked}>Solve</button>
                <button onClick={handleNextStepClicked}>next</button>
            </div>
            <div className="examplesControls">
                {([1, 2, 3, 4] as (1 | 2 | 3 | 4)[]).map((n) => (
                    <button key={n} onClick={() => handleLoadExampleClicked(n)}>
                        example {n}
                    </button>
                ))}
            </div>
        </main>
    );
}

export default App;
