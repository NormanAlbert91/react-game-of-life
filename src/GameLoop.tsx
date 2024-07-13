import React, {useEffect, useRef, useState} from 'react';
import GameField from './GameField';

const GameLoop: React.FC<{ rows: number; cols: number; maxFps: number }> = ({rows, cols, maxFps}) => {
    const [array, setArray] = useState<boolean[][]>(
        Array.from({length: rows}, () =>
            Array.from({length: cols}, () => false)
        )
    );
    const [fps, setFps] = useState<number>(0);
    const runningRef = useRef<boolean>(false);
    const frameCount = useRef<number>(0);
    const lastFrameTime = useRef<number>(performance.now());
    const lastFpsUpdateTime = useRef<number>(performance.now());
    const fpsInterval = useRef<number>(1000 / maxFps);


    useEffect(() => {
        fpsInterval.current = 1000 / maxFps;
    }, [maxFps]);

    useEffect(() => {
        setArray(
            Array.from({length: rows}, () =>
                Array.from({length: cols}, () => false)
            )
        );
    }, [rows, cols]);

    const toggleCell = (row: number, col: number) => {
        const newArray = array.map((r, rowIndex) =>
            r.map((item, colIndex) =>
                rowIndex === row && colIndex === col
                    ? !item
                    : item
            )
        );
        setArray(newArray);
    };

    const getNextGeneration = (currentArray: boolean[][]): boolean[][] => {
        return currentArray.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const neighbors = getLivingNeighbors(currentArray, rowIndex, colIndex);
                if (cell && (neighbors < 2 || neighbors > 3)) return false;
                if (!cell && neighbors === 3) return true;
                return cell;
            })
        );
    };

    const getLivingNeighbors = (array: boolean[][], row: number, col: number): number => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        return directions.reduce((acc, [dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && array[newRow][newCol]) {
                return acc + 1;
            }
            return acc;
        }, 0);
    };

    const startGame = () => {
        runningRef.current = true;
        runGame();
    };

    const stopGame = () => {
        runningRef.current = false;
    };

    const runGame = () => {
        if (!runningRef.current) return;

        const now = performance.now();
        const elapsed = now - lastFrameTime.current;

        if (elapsed >= fpsInterval.current) {
            frameCount.current += 1;
            lastFrameTime.current = now - (elapsed % fpsInterval.current);

            if (now - lastFpsUpdateTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastFpsUpdateTime.current = now;
            }

            setArray(prevArray => getNextGeneration(prevArray));
        }

        requestAnimationFrame(runGame);
    };

    return (
        <div>
            <button onClick={startGame}>Start</button>
            <button onClick={stopGame}>Stop</button>
            <p>FPS: {fps}</p>
            <GameField array={array} toggleCell={toggleCell}/>
        </div>
    );
};

export default GameLoop;