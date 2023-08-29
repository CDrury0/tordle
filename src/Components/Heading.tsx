import { LengthValues, MIN_LENGTH, MAX_LENGTH } from "../App";

interface HeadingProps {
    newWordFunc: () => void,
    setWordLength: (value: LengthValues) => void, 
    wordLength: LengthValues
}

const Heading: React.FC<HeadingProps> = ({ newWordFunc, setWordLength, wordLength }) => {
    return (
        <div className="Heading">
            <div id="leftHead">
                <div>
                    <button onClick={newWordFunc}>
                        New Word
                    </button>
                    <br />
                    <div id="lengthControls">
                        <button onClick={wordLength === MIN_LENGTH ? () => {} : () => {setWordLength(wordLength - 1 as LengthValues)}}>-</button>
                        Length: {wordLength}
                        <button onClick={wordLength === MAX_LENGTH ? () => {} : () => {setWordLength(wordLength + 1 as LengthValues)}}>+</button>
                    </div>
                </div>
            </div>
            <div>
                <h1>Tordle</h1>
            </div>
            <div id="rightHead">
                <h4><a href='https://github.com/cdrury0' rel='noreferrer' target='_blank'>My GitHub</a></h4>
            </div>
        </div>
    );
}

export default Heading;
