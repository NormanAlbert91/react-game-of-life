import './App.css';
import {useState} from "react";

interface GameFieldProps {
    array: boolean[][];
    toggleCell: (row: number, col: number) => void;
}

const GameField: React.FC<GameFieldProps> = ({ array, toggleCell }) => {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const handleMouseDown = (row: number, col: number) => {
        setIsMouseDown(true);
        toggleCell(row, col);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isMouseDown) {
            toggleCell(row, col);
        }
    };

    return (
        <div onMouseUp={handleMouseUp}>
            {array.map((row, rowIndex) => (
                <div key={rowIndex} className="game-field-row">
                    {row.map((item, colIndex) => (
                        <button
                            key={colIndex}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            className={`cell ${item ? 'alive' : 'dead'}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameField;