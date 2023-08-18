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
        <></>
    );
}

const mapCharsToRow = (chars: string, action: (input: string) => void) => {
    return chars.split("").map((val, index) => {
        <div className="KeyboardRow">
            <DisplayKey
                value={val}
                index={index}
                action={action}
            />
        </div>
    });
}

export default DisplayKeyboard;
