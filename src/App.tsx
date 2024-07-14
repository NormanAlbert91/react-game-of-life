import './App.css'
import {useState} from "react";
import GameLoop from './GameLoop';

function App() {

    const [rows, setRows] = useState<number>(70);
    const [cols, setCols] = useState<number>(125);
    const [maxFps, setMaxFps] = useState<number>(10);
    const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRows(Number(e.target.value));
    };

    const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCols(Number(e.target.value));
    };

    const handleMaxFpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxFps(Number(e.target.value));
    };

    return (
        <div>
            <label>
                Rows:
                <input type="number" value={rows} onChange={handleRowsChange} />
            </label>
            <label>
                Cols:
                <input type="number" value={cols} onChange={handleColsChange} />
            </label>
            <label>
                Max FPS:
                <input type="number" value={maxFps} onChange={handleMaxFpsChange} />
            </label>
            <div>
                <GameLoop rows={rows} cols={cols} maxFps={maxFps} />
            </div>
        </div>
    );
}

export default App;
