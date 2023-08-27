import { ReactElement } from "react"
import DisplayKey from "./DisplayKey"

interface DisplayKeyboardProps {
    addLetterFunc: (input: string) => void
    removeLetterFunc: () => void
    submitFunc: () => void
    allowInput: boolean
}

const DisplayKeyboard: React.FC<DisplayKeyboardProps> = ({ addLetterFunc, removeLetterFunc, submitFunc, allowInput }) => {
    const emptyFunc = () => { };
    const topRow = mapCharsToRow("QWERTYUIOP", addLetterFunc, allowInput, emptyFunc);
    const midRow = mapCharsToRow("ASDFGHJKL", addLetterFunc, allowInput, emptyFunc);
    const botRow = mapCharsToRow("ZXCVBNM", addLetterFunc, allowInput, emptyFunc);
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
                    action={allowInput ? submitFunc : emptyFunc}
                    id="Enter"
                />
                {botRow}
                <DisplayKey
                    value="←"
                    action={allowInput ? removeLetterFunc : emptyFunc}
                />
            </div>
        </div>
    );
}

const mapCharsToRow = (chars: string, action: (input: string) => void, allowInput: boolean, emptyFunc: () => void) => {
    return chars.split("").map((val, index): ReactElement => {
        return (
            <DisplayKey
            value={val}
            key={index}
            action={allowInput ? action : emptyFunc}
            />
        );
    });
}

export default DisplayKeyboard;
