import './App.css';
import React, { memo, useState, useCallback } from 'react';

interface GameFieldProps {
    array: boolean[][];
    toggleCell: (row: number, col: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const GameField: React.FC<GameFieldProps> = ({ array, toggleCell }) => {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const handleMouseDown = useCallback((row: number, col: number) => {
        setIsMouseDown(true);
        toggleCell(row, col);
    }, [toggleCell]);

    const handleMouseUp = useCallback(() => {
        setIsMouseDown(false);
    }, []);

    const handleMouseEnter = useCallback((row: number, col: number) => {
        if (isMouseDown) {
            toggleCell(row, col);
        }
    }, [isMouseDown, toggleCell]);

    return (
        <div onMouseUp={handleMouseUp}>
            {array.map((row, rowIndex) => (
                <div key={rowIndex} className="game-field-row">
                    {row.map((item, colIndex) => (
                        <MemoizedButton
                            key={colIndex}
                            row={rowIndex}
                            col={colIndex}
                            item={item}
                            onMouseDown={handleMouseDown}
                            onMouseEnter={handleMouseEnter}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

interface ButtonProps {
    row: number;
    col: number;
    item: boolean;
    onMouseDown: (row: number, col: number) => void;
    onMouseEnter: (row: number, col: number) => void;
}

const Button: React.FC<ButtonProps> = ({ row, col, item, onMouseDown, onMouseEnter }) => {
    const handleMouseDown = () => onMouseDown(row, col);
    const handleMouseEnter = () => onMouseEnter(row, col);

    return (
        <button
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            className={`cell ${item ? 'alive' : 'dead'}`}
        />
    );
};

// eslint-disable-next-line react-refresh/only-export-components
const MemoizedButton = memo(Button);

// eslint-disable-next-line react-refresh/only-export-components
export default memo(GameField);