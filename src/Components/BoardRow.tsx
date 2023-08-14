import {getNumDummy} from './Board';
import BoardCell from './BoardCell';

interface BoardRowProps {
    wordLength: number
    val: number
    key: number
    guesses: string[]
}

const BoardRow: React.FC<BoardRowProps> = ({ wordLength, val, guesses }) => {
    const dummy = getNumDummy(wordLength);
    return (
        <div className="BoardRow">
            {dummy.map((value, index) => {
                return <BoardCell
                    val={value}
                    key={index}
                    row={val}
                    guesses={guesses}
                />
            })}
        </div>
    );
}

export default BoardRow;
