
interface BoardCellProps {
    val: number
    key: number
    row: number
    guesses: string[]
}

const BoardCell: React.FC<BoardCellProps> = ({ val, row, guesses }) => {
    return (
        <div className="BoardCell">
            {getGuessChar(guesses, row, val)}
        </div>
    );
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
