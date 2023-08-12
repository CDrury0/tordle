import {GetNumDummy} from './Board';
import BoardCell from './BoardCell';

interface BoardRowProps {
    wordLength: number
    val: number
    index: number
}

const BoardRow: React.FC<BoardRowProps> = ({ wordLength, val, index }) => {
    const dummy = GetNumDummy(wordLength);
    return (
        <div className="BoardRow">
            {dummy.map((val, index) => {
                return <BoardCell/>
            })}
        </div>
    );
}

export default BoardRow;
