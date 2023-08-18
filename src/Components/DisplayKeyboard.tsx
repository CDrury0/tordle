import { ReactElement } from "react"
import DisplayKey from "./DisplayKey"

interface DisplayKeyboardProps {
    addLetterFunc: (input: string) => void
    removeLetterFunc: () => void
    submitFunc: () => void
}

const DisplayKeyboard: React.FC<DisplayKeyboardProps> = ({ addLetterFunc, removeLetterFunc, submitFunc }) => {
    const topRow = mapCharsToRow("QWERTYUIOP", addLetterFunc);
    const midRow = mapCharsToRow("ASDFGHJKL", addLetterFunc);
    const botRow = mapCharsToRow("ZXCVBNM", addLetterFunc);
    return (
        <div className="DisplayKeyboard">
            <div className="KeyboardRow">
                {topRow}
            </div>
            <div className="KeyboardRow">
                {midRow}
            </div>
            <div className="KeyboardRow">
                <DisplayKey
                    value="ENTER"
                    action={submitFunc}
                    id="Enter"
                />
                {botRow}
                <DisplayKey
                    value="←"
                    action={removeLetterFunc}
                />
            </div>
        </div>
    );
}

const mapCharsToRow = (chars: string, action: (input: string) => void) => {
    return chars.split("").map((val, index): ReactElement => {
        return (
            <DisplayKey
            value={val}
            key={index}
            action={action}
            />
        );
    });
}

export default DisplayKeyboard;
