import { useContext } from "react"
import { WordContext } from "../App"

interface BoardCellProps {
    val: number
    key: number
    row: number
    guesses: string[]
}

const BoardCell: React.FC<BoardCellProps> = ({ val, row, guesses }) => {
    const charHeld = getGuessChar(guesses, row, val);
    const currentWord = useContext(WordContext)!;
    let classList = "BoardCell ";
    if (guesses?.length - 1 > row) {
        classList += getBackgroundClass(currentWord, charHeld, val);
    }
    return (
        <div className={classList}>
            {charHeld}
        </div>
    );
}

const getBackgroundClass = (word: string, charHeld: string, col: number): string => {
    if (word[col] === charHeld) {
        return "bgGreen";
    }
    if (word.includes(charHeld)) {
        return "bgYellow";
    }
    return "bgGray";
}

const getGuessChar = (guesses: string[], row: number, col: number): string => {
    try {
        return guesses[row][col];
    }
    catch (error) {
        return " ";
    }
}

export default BoardCell;
