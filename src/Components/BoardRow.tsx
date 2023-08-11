import {GetNumDummy} from './Board';

interface BoardRowProps {
    wordLength: number
}

const BoardRow: React.FC<BoardRowProps> = ({ wordLength }) => {
    const dummy = GetNumDummy(wordLength);
    return (
        <div className="BoardRow">
            
        </div>
    );
}

export default BoardRow;