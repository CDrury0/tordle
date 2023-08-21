import { LetterStatusContext } from "../App"
import { useContext } from "react"

interface DisplayKeyProps {
    id?: string
    value: string
    key?: number
    action: (() => void) | ((input: string) => void)
}

const DisplayKey: React.FC<DisplayKeyProps> = ({ id, value, action }) => {
    const letterStatus = useContext(LetterStatusContext);
    const classList = "DisplayKey " + getBackgroundClass(value, letterStatus);
    return (
        <button className={classList} id={id} onClick={() => action(value)}>
            {value}
        </button>
    );
}

const getBackgroundClass = (letter: string, letterStatus: [string, string, string]): string => {
    if (letterStatus[1].includes(letter)) {
        return "bgGreen";
    }
    if (letterStatus[0].includes(letter)) {
        return "bgYellow";
    }
    if (letterStatus[2].includes(letter)) {
        return "bgGray";
    }
    return "";
}

export default DisplayKey;
