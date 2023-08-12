import React, { Dispatch, SetStateAction } from 'react';
import BoardRow from './BoardRow';

interface BoardProps {
    numGuesses: number
}

const Board: React.FC<BoardProps> = ({ numGuesses }) => {
    const dummy = GetNumDummy(numGuesses);
    return (
        <div className="Board">
            {dummy.map((val, index) => {
                //make word length variable?
                return <BoardRow
                    wordLength={5}
                    val={val}
                    index={index}
                />
            })}
        </div>
    );
}

export const GetNumDummy = (num: number) : number[] => {
    const dummy = [];
    for (let i = 0; i < num; i++){
        dummy.push(i);
    }
    return dummy;
}

export default Board;
