import React from 'react';
import BoardRow from './BoardRow';

interface BoardProps {
    numGuesses: number
    wordLength: number
    guesses: string[]
}

const Board: React.FC<BoardProps> = ({ numGuesses, wordLength, guesses }) => {
    const dummy = getNumDummy(numGuesses);
    return (
        <div className="Board">
            {dummy.map((val, index) => {
                //make word length variable?
                return <BoardRow
                    wordLength={wordLength}
                    val={val}
                    key={index}
                    guesses={guesses}
                />
            })}
        </div>
    );
}

export const getNumDummy = (num: number) : number[] => {
    const dummy = [];
    for (let i = 0; i < num; i++){
        dummy.push(i);
    }
    return dummy;
}

export default Board;
